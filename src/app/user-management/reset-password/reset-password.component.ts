import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordStrengthValidator } from 'src/app/shared/services/password-strength';
import { MustMatch } from 'src/app/shared/services/password-match.validator';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
declare var $ : any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_wv4mTG.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  form : FormGroup;
  submitted : boolean = false;
  grant_access : boolean = false;
  email_address = "";
  constructor(public utils : Utils, private router : Router,private toaster : ToastrService, private route: ActivatedRoute,
     private context : ContextService, private fb : FormBuilder ) { }

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
    let id = this.route.params['value'].id;
    let date = this.route.params['value'].date;
    let date2 = this.route.params['value'].date2;
    let datediff = this.route.params['value'].datediff;
    this.confirmURL(id,date,date2,datediff);
  }

  generateForm(){
    this.form = this.fb.group({
        id : ['',[Validators.required]],
        password : ["", [Validators.required,PasswordStrengthValidator]], 
        password2 : ["", [Validators.required]],

    }, {validator: MustMatch('password', 'password2')});
   
  }


  confirmURL(id, date,date2,datediff){
  //  this.utils.StartSpinner();
  //http://localhost:4200/#/public-user/password-reset/356a192b7913b04c54574d18c28d46e6395428ab/1551310625/1551311649/128351137a9c47206c4507dcf2e6fbeeca3a9079
  //http://localhost:4200/#/password-reset/356a192b7913b04c54574d18c28d46e6395428ab/1551310625/1551311649/128351137a9c47206c4507dcf2e6fbeeca3a9079
   this.context.getWithNoToken(id+"/"+date+"/"+date2+"/"+datediff,'account/confirmpasswordreset/').
    subscribe( data => {
      let d = <any>data;

      if(d.error == false){
        this.grant_access = true;
        this.email_address = d.data.email;
        this.form.patchValue({
          id : d.data.id
        })

      }else{
        this.toaster.error("Invalid Reset Password URL");
      }
      
      console.log(d)
      
    // this.utils.StopSpinner();
    }); 
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

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

  this.utils.StartSpinner();
  let formData = JSON.stringify(this.form.value);
  console.log(formData);
  this.context.postWithNoToken(formData, 'user/passwordreset').subscribe(
    data=>{
      this.utils.StopSpinner();
      let d = <any>data;
      if(d.error == false){
        this.toaster.success(d.message);  
        this.toaster.success("Please Login with your new password") ;
        localStorage.removeItem('token'); 
        this.router.navigate(['/']);
     }
      console.log(data);
    },
    err => {
      this.utils.StopSpinner();
      if(err.status == 422){
        this.toaster.error(err.error.message);
      }
      console.log('Error Message : '+err.message);
      console.log('Error : '+err.status);
      console.log( err.error);   

      }
  );
  }

get f(){return this.form.controls;}

}
