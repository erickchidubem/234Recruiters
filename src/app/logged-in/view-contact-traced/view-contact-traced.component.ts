import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-view-contact-traced',
  templateUrl: './view-contact-traced.component.html',
  styleUrls: ['./view-contact-traced.component.css']
})
export class ViewContactTracedComponent implements OnInit {
  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private route: ActivatedRoute,
    private toaster : ToastrService) {

     }

   compName : string="";
  ngOnInit(): void {
    let id = this.route.params['value'].id;
    this.compName = this.route.params['value'].companyname;
    this.getStateLga();
    this.getAllMyEntities(id);
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

  dt : any;
  qrCodeValue : any="item";
  PopulateData(c){
    this.dt = c;
    this.qrCodeValue = c.identitysignature
    console.log(c)
    console.log(this.qrCodeValue)
  }


  entityLocations : any =[];
  getAllMyEntities(id){
    this.utils.StartSpinner();
      this.context.getWithToken('','location/getTracedContactsUsingTraceId/'+id).
      subscribe( data => {
        let d = <any>data;
        this.entityLocations = d.data;
        console.log(this.entityLocations)
        this.utils.StopSpinner();
      }); 
  }

}