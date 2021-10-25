import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';
//import { ToasterService } from 'src/app/shared/services/';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb : FormBuilder, 
    //private toaster : ToasterService,
    private context : ContextService,public utils : Utils) { }

  ngOnInit(): void {
      this.setUp();
  }

  machine : any= [];
  contractDetails : any = [];
  jobDetails :any =[];
  setUp(){
    // this.context.getWithToken(this.accountId,'/machine/getaccountmachine/').
    // subscribe( data => {
    //   let d = <any>data; 
    //   console.log(d)
    //   this.machine = d.data;
    //   // this.utils.StopSpinner();
    // });

    this.context.getWithToken('','Jobs/GetJobs?PageNum=0').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.jobDetails = d.responseObject.data;
     // this.utils.StopSpinner();
    });
  }




}
