import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-view-individual-users',
  templateUrl: './view-individual-users.component.html',
  styleUrls: ['./view-individual-users.component.css']
})
export class ViewIndividualUsersComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private toaster : ToastrService) {

     }

  ngOnInit(): void {
    this.getStateLga();
    this.getAllMyEntities();
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
  getAllMyEntities(id="1"){
    this.utils.StartSpinner();
      this.context.getWithToken('','account/getalluser/'+id).
      subscribe( data => {
        let d = <any>data;
        this.entityLocations = d.data;
        console.log(this.entityLocations)
        this.utils.StopSpinner();
      }); 
  }
}