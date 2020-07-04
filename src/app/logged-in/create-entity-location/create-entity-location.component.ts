import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'cluster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-entity-location',
  templateUrl: './create-entity-location.component.html',
  styleUrls: ['./create-entity-location.component.css']
})
export class CreateEntityLocationComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
              private toaster : ToastrService) { }

  ngOnInit(): void {
      this.generateForm();
  }

  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      location_name : ["", [Validators.required]],
      entityId : this.utils.getUserFromToken().Id,
      stateId : ["", [Validators.required]],
      lgaId : ["", [Validators.required]],
      address_id : ["", [Validators.required]],
      place_id : ["", [Validators.required]],
      address_component : ["", [Validators.required]],
      address_name : ["", [Validators.required]],
      formatted_address : ["", [Validators.required]],
      address_url : ["", [Validators.required]],
      myaddress : ["", Validators.required]

    });
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
    if(this.form.invalid){return;}
 
    this.utils.StartSpinner();
  
    let formData = JSON.stringify(this.form.value);
    console.log(formData)
    this.context.postWithToken(formData,'location/createlocation').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                                this.toaster.error(data.message)
                              }else{
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
