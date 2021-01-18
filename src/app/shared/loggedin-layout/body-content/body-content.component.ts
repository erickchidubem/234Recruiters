import { Component, OnInit } from '@angular/core';
import { Utils } from '../../services/utils';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css']
})
export class BodyContentComponent implements OnInit {

  constructor(private utils : Utils, private context : ContextService, private router : Router,
              private toaster : ToastrService) { }
 

  name : string;
  traceContact : Boolean = false;
  ngOnInit(): void {
      console.log(this.utils.getUserFromToken());

      if(this.utils.getUserFromToken().userType == 2){
          this.name = this.utils.getUserFromToken().entityName;
          this.traceContact = false;

      }else{
          this.name = this.utils.getUserFromToken().firstName + " "+this.utils.getUserFromToken().lastName;
          this.traceContact = true;
      } 

      console.log(this.traceContact)
  }

  logout(){
    // this.context.postWithToken('','account/logout').
    //     subscribe((response:Response)=>{ 
    //            let data = <any>response;
    //           console.log(data)
                localStorage.removeItem('token');
                localStorage.clear();
                this.router.navigate(['/']);

        // },
        // err => {
        //             this.utils.StopSpinner();                              
        //             console.log('Error Message : '+err.message);
        //             console.log('Error : '+err.status);
        //             console.log (err.error)
        //             this.toaster.error("Error")
                   
        // })
      
  } 

}