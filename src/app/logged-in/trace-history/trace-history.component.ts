import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import {Options} from '../../../../node_modules/select2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;


@Component({
  selector: 'app-trace-history',
  templateUrl: './trace-history.component.html',
  styleUrls: ['./trace-history.component.css']
})
export class TraceHistoryComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private toaster : ToastrService) { }
  
  public allEntitiesCopy: Array<Select2OptionData>;
  public allEntities: Array<Select2OptionData>;
  public entitiesLocation : Array<Select2OptionData>;
  public options: Options;
  form : FormGroup;

  public locationid : number;
  public entityid : number;
  
  ngOnInit(): void {
    
    this.generateForm();
    this.getAllTracedSummary();
    this.getAllEntities();
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  }

  public valueChanged(event: string) {
    console.log('value changed: ' + event);
  }

  public modelChanged(event: string) {
    console.log('model changed: ' + event);
  }


  entityLocations : any =[];
  getAllEntities(id="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getallentities/'+id).
      subscribe( data => {
        let d = <any>data;
        this.allEntitiesCopy = d.data;
        console.log(this.entityLocations)
        this.utils.StopSpinner();
      }); 
  }

  allTraceSummary : any =[];
  getAllTracedSummary(entityId="0",stateId="0",lgaId="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getalltraced/'+entityId+'/'+stateId+'/'+lgaId).
      subscribe( data => {
        let d = <any>data;
        this.allTraceSummary = d.data;
        console.log(this.allTraceSummary)
        this.utils.StopSpinner();
      }); 
  }

  generateForm(){
    this.form = this.fb.group({
      DateToTrace :["", [Validators.required]],
      entityId : ["", [Validators.required]],
      locationId: ["", [Validators.required]],
      contact_counts : ["", [Validators.required]]
    })
  }


  dt : any;
  PopulateData(c){
    this.dt = c;
    console.log(c)
  }

 buttonShow : boolean = false;
 openModal(){
   this.allEntities = this.allEntitiesCopy;
 }
 closeModal(){
   
   this.entitiesLocation = [];
   this.allEntities = [];
  this.form.patchValue({entityId:'',contact_counts:'',DateToTrace:'',locationId:''});
 }
  getLocationsFromEntities(thisvalue){
    
    this.buttonShow = false;
    console.log(thisvalue)
    console.log(this.allEntities)
    if(this.allEntities != null && thisvalue > 0){
          this.form.patchValue({entityId:thisvalue,contact_counts:'',DateToTrace:'',locationId:''});
          let md = <any> this.allEntities.filter(x=>x.id == thisvalue);
          console.log(md);
          this.entitiesLocation = md[0].location   
    }
    this.ShowButton();
  }

  selectLocation(thisvalue){
    
    this.buttonShow = false;
    console.log(thisvalue)
    this.form.patchValue({contact_counts:'',DateToTrace:'',locationId:thisvalue});
    this.ShowButton();
  }

  onDateSelect(event){
    
   // this.form.patchValue({DateToTrace:event.target.value})
    console.log("Date Select "+event.target.value)
    this.ShowButton();
  }

  buttonCountValue : number = 0;
  ShowButton(){

    let DateToTrace = this.form.get('DateToTrace').value;
    let entityId = this.form.get('entityId').value;
    let locationId = this.form.get('locationId').value;
    console.log("this is the date : "+DateToTrace)
    console.log("this is the entity id : "+entityId)
    console.log("this is the location id : "+locationId)
    if(DateToTrace != "" && entityId > 0 && locationId > 0){
                    this.utils.StartSpinner();
                    this.context.getWithToken(entityId+'/'+locationId+'/'+DateToTrace,'trace/getcontacttracecount/').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                                this.toaster.error(data.message)
                              // this.router.navigate(['access/view-location'])
                              }else{
                               
                               this.buttonCountValue = data.data;
                               this.form.patchValue({contact_counts : data.data})
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
      this.buttonShow = true;
    }else{
      this.buttonShow = false;
    }

  }


  submitted : Boolean = false;
  submit(){
   console.log(this.form.value)
   if(this.buttonCountValue < 1){
    this.toaster.error("no contact can be traced to this date for the selected entity and location")
    return;
   }
    this.submitted = true;
    if(this.form.invalid){return;}
   
    this.utils.StartSpinner();
  
    let formData = JSON.stringify(this.form.value);
    console.log(formData)
    this.context.postWithToken(formData,'trace/tracecontacts').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                                this.toaster.error(data.message)
                              }else{ 
                                
                                $('#custommodal').modal("hide");
                                this.form.reset();
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
 