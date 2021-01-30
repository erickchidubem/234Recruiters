import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-view-all-locations-count',
  templateUrl: './view-all-locations-count.component.html',
  styleUrls: ['./view-all-locations-count.component.css']
})
export class ViewAllLocationsCountComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private toaster : ToastrService) {

     }

  ngOnInit(): void {
    this.getStateLga();
    this.getAllTableList();
  }

  lgastates : any;
  lgas : any = [];
  getStateLga(){
    this.utils.StartSpinner();
      this.context.getWithToken('','account/getallusertype').
      subscribe( data => {
        let d = <any>data;
        this.lgastates = d.data;
        console.log(this.lgastates)
        this.utils.StopSpinner();
      }); 
  }

  dt : any;
  qrCodeValue : any="item";
  PopulateData(c){
    this.dt = c;
    this.qrCodeValue = c.identitysignature
    console.log(c)
    console.log(this.qrCodeValue)
  }


  entityLocations : any =[];
  getAllTableList(id="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','location/getlocationcountexposed/'+id).
      subscribe( data => {
        let d = <any>data;
        this.entityLocations = d.data;
        console.log(this.entityLocations)
        this.utils.StopSpinner();
      }); 
  }
}
