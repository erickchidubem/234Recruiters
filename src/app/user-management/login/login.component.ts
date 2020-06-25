import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

declare var $ : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_wv4mTG.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  form : FormGroup;
  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private toaster : ToastrService, private router : Router,
    ) { }

  submitted : boolean = false;
  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }

  get f(){return this.form.controls;}
  

  generateForm(){
    this.form = this.fb.group({
      email : ["", [Validators.required,Validators.email]],
      password : ["", [Validators.required]], 
    });
  }
  

  toggle : boolean = false;
  addMenu(){
    console.log('add')
    $("#password-eye").addClass("show-password");
    document.getElementById("password").setAttribute("type", "text");
    this.toggle= false;
}

removeMenu(){
   console.log('remove')
    $("#password-eye").removeClass("show-password"); 
    document.getElementById("password").setAttribute("type", "password");
    this.toggle = true;  
}

toggleBar(){
  if(this.toggle == false){
    this.removeMenu();
  }else{
    this.addMenu();
  }
  
}
  

  Login(){

    this.submitted = true;
    if(this.form.invalid){return;}
 
    this.utils.StartSpinner();
  
    let formData = JSON.stringify(this.form.value);
    this.context.postWithNoToken(formData,'user/internaluserlogin').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                               
                                this.toaster.error(data.message)
                              
                              }else{
                                this.router.navigate(['access/dashboard'])
                                localStorage.setItem('token',data.user.token);
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

 