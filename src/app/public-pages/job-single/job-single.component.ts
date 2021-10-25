import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent implements OnInit {

  constructor(private fb : FormBuilder, 
    //private toaster : ToasterService,
    private router : Router, private route: ActivatedRoute,
    private context : ContextService,public utils : Utils) { }

  id: any;
  ngOnInit(): void {
    
    this.id = this.route.params['value'].id;
    this.setUp();
  }

  jobDetails :any =[];
  setUp(){
    // this.context.getWithToken(this.accountId,'/machine/getaccountmachine/').
    // subscribe( data => {
    //   let d = <any>data; 
    //   console.log(d)
    //   this.machine = d.data;
    //   // this.utils.StopSpinner();
    // });

    this.context.getWithToken(this.id,'Jobs/GetSingleJob?Id=').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.jobDetails = d.responseObject;
     // this.utils.StopSpinner();
    });
  }

}
