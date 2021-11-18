import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {

  constructor(private fb : FormBuilder, 
    private route: ActivatedRoute,
    private router : Router,
    private context : ContextService,public utils : Utils) { }

  ngOnInit(): void {
    this.theKeyWord = this.displayEmpty(this.route.params['value'].keyword);
    this.theLocation = this.route.params['value'].location;
    this.theCategory = this.route.params['value'].category;
    this.generateForm();
    this.setUp();
    this.getJobDataOnline(0,this.route.params['value'].keyword,this.theLocation,this.theCategory);
  }

  form : FormGroup;
  theKeyWord : string ="";
  theLocation : string = "";
  theCategory : string = "";
  generateForm(){
    this.form = this.fb.group({    
      keyword : [this.theKeyWord],
      location : [this.theLocation],
      category : [this.theCategory]
    });
  }

  displayEmpty(value){
    if(value == "-all-"){
      return "";
    }else{
      return value;
    }
  }

  submit(){
      
      let formData = <any>JSON.stringify(this.form.value);
      console.log(formData);
    //job-search/:keyword/:location/:category
      let keyword = this.getEmptyValue(this.form.get('keyword').value);
      let location = this.getEmptyValue(this.form.get('location').value);
      let category = this.getEmptyValue(this.form.get('category').value);
      console.log(keyword)
      this.getJobDataOnline(0,keyword,location,category);
      //this.router.navigate(['/home/job-search/'+keyword+'/'+location+'/'+category])

  }

  getJobDataOnline(PageNum, keyword, location, category){
    this.utils.StartSpinner();
    this.context.getWithToken('','Jobs/GetJobs?PageNum='+PageNum+'&keyword='+keyword+'&location='+location+'&category='+category).
    subscribe( data => {
      this.utils.StopSpinner();
      let d = <any>data; 
      console.log(d)
      this.jobDetails = d.responseObject.data;
    });
   // this.utils.StopSpinner();
  }
 
  getEmptyValue(value){ 
    if(value == ""){
      return "-all-"
    }else{
      return value;
    }
  }


  categories : any= [];
  states : any = [];
  jobDetails :any =[];
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

    // this.context.getWithToken('','Jobs/GetJobs?PageNum=0').
    // subscribe( data => {
    //   let d = <any>data; 
    //   console.log(d)
    //   this.jobDetails = d.responseObject.data;
    // });
  }

}
