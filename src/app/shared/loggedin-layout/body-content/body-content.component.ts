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

              private toaster : ToastrService) {

                this.role = this.utils.getUserFromToken().userrole;
                console.log(this.role)
               }
 

  name : string;
  traceContact : Boolean = false;
  role : string = "CANDIDATE";
  ngOnInit(): void {
      console.log(this.utils.getUserFromToken());
      this.GetUserProfile();
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
                localStorage.removeItem('token');
                localStorage.clear();
                this.router.navigate(['/']);  
  } 

  GetUserProfile(){
    this.context.getWithToken('','UserProfile/GetUserProfile').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
     // this.role = d.responseObject.userRole;
      console.log(d.responseObject.userRole)
      if(d.responseObject.userProfile == null){
        
        this.router.navigate(['/access/user-profile'])

      }
      //this.categories = d.responseObject;
     
    });
   
      
  } 

}