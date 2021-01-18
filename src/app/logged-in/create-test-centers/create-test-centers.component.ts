import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-create-test-centers',
  templateUrl: './create-test-centers.component.html',
  styleUrls: ['./create-test-centers.component.css']
})
export class CreateTestCentersComponent implements OnInit {
  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private router : Router, private toaster : ToastrService) { }

  ngOnInit(): void {
      this.generateForm();
      
      this.getStateLga();
  }

  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      location_name : ["", [Validators.required]],
      entityId : this.utils.getUserFromToken().Id,
      stateId : ["", [Validators.required]],
      lgaId : ["", [Validators.required]],
      address_id : [""],
      place_id : ["", [Validators.required]],
      address_component : ["", [Validators.required]],
      address_name : ["", [Validators.required]],
      formatted_address : ["", [Validators.required]],
      address_url : ["", [Validators.required]],
      myaddress : ["", Validators.required]

    });
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
          address_component : JSON.stringify(address.address_components).toString(),
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
    this.context.postWithToken(formData,'location/createtestcenters').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                                this.toaster.error(data.message)
                                this.router.navigate(['access/view-location'])
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

 