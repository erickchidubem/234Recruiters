import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContextService } from 'src/app/shared/services/context.service';
import { Utils } from 'src/app/shared/services/utils';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_wv4mTG.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  constructor(private fb : FormBuilder, private context : ContextService,private toaster : ToastrService,
    public utils : Utils, private router : Router) { }

    submitted = false;

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }

  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({    
      email : ['', [Validators.required,Validators.email]],
    });
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      this.toaster.error("Enter Email Properly")
      return;
    }

  this.utils.StartSpinner();
  let formData = JSON.stringify(this.form.value);
  console.log(formData);
  this.context.postWithNoToken(formData, 'Account/SendPasswordReset').subscribe(
    data=>{
      this.utils.StopSpinner(); 
      let d = <any>data;
      if(d.responseCode =="00"){
        this.toaster.success(d.responseFriendlyMessage)
        this.form.reset();
        this.submitted = false;
      }else{
        this.toaster.error(d.responseFriendlyMessage)
      }
      console.log(data);
    },
    err => {
      this.utils.StopSpinner();
                            
      console.log('Error Message : '+err.message);
      console.log('Error : '+err.status);
      console.log (err.error)
      this.toaster.error(err.error.responseFriendlyMessage) 

      }
  );
  }

    get f(){return this.form.controls;}
}
