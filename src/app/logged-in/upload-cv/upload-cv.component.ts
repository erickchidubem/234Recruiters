import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

 
  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private router : Router, private toaster : ToastrService) { }

  
  ngOnInit(): void {
    this.generateForm();
    this.setUp();
  }

  handleFileInput(event) {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
}
fileToUpload: File | null = null;


  get f() {return this.form.controls;}

  categories : any= [];
  states : any = [];
  jobDetails :any =[];
  userProfile : any;
  userRole : string = "";
  the_type : string = "";
  setUp(){
    this.context.getWithToken('','Jobs/GetJobsCategory').
      subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.categories = d.responseObject;
    });

    this.context.getWithToken('','Jobs/GetStates').
      subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.states = d.responseObject;  
    });

    this.context.getWithToken('','UserProfile/GetUserProfile').
       subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.userRole = d.responseObject.userRole;
      this.userProfile = d.responseObject.userProfile;
      if(this.userRole == "EMPLOYER"){
        this.the_type = "Our Company";
        this.form.patchValue({
          firstName:"Employer", lastName:"Employer",
          userId : this.utils.getUserFromToken().userid,
          isIndividual : false
        })
      }else if (this.userRole =="CANDIDATE"){
        this.the_type = "Me";
        this.form.patchValue({
          companyName : "Candidate",
          userId : this.utils.getUserFromToken().userid,
          isIndividual : true
        })
      }

      if(this.userProfile != null){
        this.form.patchValue({
          firstName : this.userProfile.firstName,
          lastName : this.userProfile.lastName,
          companyName : this.userProfile.companyName,
          phone : this.userProfile.phone,
          email : this.userProfile.email,
          briefDescription : this.userProfile.briefDescription,
          primaryIndustry : this.userProfile.primaryIndustry,
          address : this.userProfile.address,
          website : this.userProfile.website,
          stateOfResidence : this.userProfile.stateOfResidence,
          doneNYSC : ""+this.userProfile.doneNYSC+"",
          higestQualification : this.userProfile.higestQualification
        })
      }
      
    });
  }


  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      Id:0,
      userId : 0,
      NamedCV : ['',[Validators.required]],
      file:  ['',[Validators.required]],
      fileSource: []
    });
  }


  submitted : boolean = false;
  Submit(){
  
    this.submitted = true;
    if(this.form.invalid){return;}
 
    this.utils.StartSpinner();

    
    //const formData = new FormData();
   // formData.append('namedCV',this.form.get('NamedCV').value);
   // formData.append('file', this.form.get('fileSource').value);
    

   
    let formData = this.form.value;
    let nData = new FormData();
    
    nData.append('fileSource', this.form.get('fileSource').value);
    //nData.append('namedCV',this.form.get('NamedCV').value)
    //console.log(this.form.get('fileSource').value)
    console.log(nData)
    nData.forEach(x=>console.log(x));
    
    this.context.postWithToken2(nData,'UserProfile/UploadCV',).
                    subscribe((response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.responseCode =="99"){
                                this.toaster.error(data.responseFriendlyMessage)
                              }else{
                                this.submitted = false;
                                this.form.reset();
                                this.toaster.success(data.responseFriendlyMessage);
                                this.router.navigate(['access/'])                                
                              }                        
                    },
                    err => {
                          this.utils.StopSpinner();                              
                          console.log('Error Message : '+err.message);
                          console.log('Error : '+err.status);
                          console.log (err.error)
                          this.toaster.error(err.error.responseFriendlyMessage)
                                  
                    }
                  );               
       }

}
