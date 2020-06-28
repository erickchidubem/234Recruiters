import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordStrengthValidator } from 'src/app/shared/services/password-strength';
import { MustMatch } from 'src/app/shared/services/password-match.validator';
declare var $ : any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_wv4mTG.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private toaster : ToastrService, private router : Router) { }

    form : FormGroup;
    submitted : boolean = false;
    ngOnInit() {
      this.submitted = false;
      this.generateForm();
    }
  
    get f(){return this.form.controls;}
    
  
    generateForm(){
      this.form = this.fb.group({
        entityname : ["", [Validators.required]],
        email : ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password : ["", [Validators.required,PasswordStrengthValidator]], 
        password2 : ["", [Validators.required]],
      }, {validator: MustMatch('password', 'password2')});
    }


  


    toggle1 : boolean = false;
    toggle2 : boolean = false;
    addMenu(value){
    
      if(value == 1){
          $("#password-eye-1").addClass("show-password");
          document.getElementById("password").setAttribute("type", "text");
          this.toggle1= false;
     }else{
          $("#password-eye-2").addClass("show-password");
          document.getElementById("password-2").setAttribute("type", "text");
          this.toggle2= false;
     }
     
  }
  
  removeMenu(value){
    if(value == 1){
          $("#password-eye-1").removeClass("show-password"); 
          document.getElementById("password").setAttribute("type", "password");
          this.toggle1 = true;
    }else{
          $("#password-eye").removeClass("show-password"); 
          document.getElementById("password-2").setAttribute("type", "password");
          this.toggle2 = true;
    }  
  }
  
  toggleBar(value){

    if(value == 1){
          if(this.toggle1 == false){
            this.removeMenu(value);
          }else{
            this.addMenu(value);
          }
    }else{
          if(this.toggle2 == false){
            this.removeMenu(value);
          }else{
            this.addMenu(value);
          }
    }
    
    
  }
    
  
    Register(){
  
      this.submitted = true;
      if(this.form.invalid){return;}
   
      this.utils.StartSpinner();
    
      let formData = JSON.stringify(this.form.value);
      console.log(formData)
      this.context.postWithNoToken(formData,'account/registerentity').
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
  
  }
