import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private router : Router, private toaster : ToastrService) { }

  ngOnInit(): void {
      this.generateForm();
      
      this.getStateLga();
  }

  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      firstName : ["", [Validators.required]],
      lastName : ["",[Validators.required]],
      email : ["",[Validators.required]],
      phone : ["",[Validators.required]],
      userType : ["",[Validators.required]],
      stateId : ["",[Validators.required]],
      password : ["Result@123"]
    });
  }

selectState : boolean=false;
 selectUserType(value){
      if(value > 6){
        this.form.patchValue({stateId:""})
        this.selectState=true;
       // document.getElementById("stateId").setAttribute("disabled", "true");      
      }else{
        this.form.patchValue({stateId:0})
        this.selectState = false;
       // document.getElementById("stateId").setAttribute("disabled", "false");
      }
 
 }


  lgastates : any;
  lgas : any = [];
  getStateLga(){
    this.utils.StartSpinner();
      this.context.getWithToken('','location/getstatelga').
      subscribe( data => {
        let d = <any>data;
        this.lgastates = d.data;
        console.log(this.lgastates)
        this.utils.StopSpinner();
      }); 
  }

 

  getsubCategory(thisvalue){
    console.log(thisvalue)
    console.log(this.lgastates)
    if(this.lgastates != null){
          this.form.patchValue({lgaId:''});
          let md = <any> this.lgastates.filter(x=>x.id == thisvalue);
          this.lgas = md[0].lga   
    }
  }
   

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    
  public handleAddressChange(address: any) {
        // Do some stuff
       console.log(address)

        this.form.patchValue({
          address_id : address.id,
          place_id : address.place_id,
          address_component : JSON.stringify(address.address_components),
          address_name : address.name,
          formatted_address : address.formatted_address,
          address_url: address.url
        })
        console.log(this.form.value)
  }


  submitted : Boolean = false;
  submit(){
  
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.invalid){return;}
 
    this.utils.StartSpinner();
  
    let formData = JSON.stringify(this.form.value);
    console.log(formData)
    this.context.postWithToken(formData,'account/registeradmin').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                                this.toaster.error(data.message)
                              //  this.router.navigate(['access/view-location'])
                              }else{
                                this.form.reset();
                                this.generateForm();
                                this.submitted = false;
                                this.toaster.success(data.message);
                              }
                                 
                    },
                    err => {
                                this.utils.StopSpinner();                              
                                console.log('Error Message : '+err.message);
                                console.log('Error : '+err.status);
                                console.log (err.error)
                                this.toaster.error("Error")
                               
                    }
                  );               
       }


      get f() {return this.form.controls;}




}