import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Utils } from "src/app/shared/services/utils";
import { ContextService } from "src/app/shared/services/context.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import { JwtHelperService } from "@auth0/angular-jwt";

declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  toggle: boolean = true;
  options: AnimationOptions = {
    path: "https://assets10.lottiefiles.com/packages/lf20_wv4mTG.json",
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  form: FormGroup;
  otpForm: FormGroup;

  otpPart: boolean = false;
  token: string;
  otp: string;
  otptime: string;
  otpTrials: number = 0;

  constructor(
    private fb: FormBuilder,
    public utils: Utils,
    private context: ContextService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  submitted: boolean = false;
  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }

  get f() {
    return this.form.controls;
  }
  get f1() {
    return this.otpForm.controls;
  }

  generateForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.otpForm = this.fb.group({
      otp: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  // addMenu() {
  //   console.log("add");
  //   $("#password-eye").addClass("show-password");
  //   document.getElementById("password").setAttribute("type", "text");
  //   this.toggle = false;
  // }

  // removeMenu() {
  //   console.log("remove");
  //   $("#password-eye").removeClass("show-password");
  //   document.getElementById("password").setAttribute("type", "password");
  //   this.toggle = true;
  // }

  // toggleBar() {
  //   if (this.toggle == false) {
  //     this.removeMenu();
  //   } else {
  //     this.addMenu();
  //   }
  // }

  expiretime = new Date().getTime();

  Login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);
    console.log(formData);
    this.context.postWithNoToken(formData, "Account/Login").subscribe(
      (response: Response) => {
        this.utils.StopSpinner();
        let data = <any>response;
        console.log(data);
        if (data.responseCode == "99") {
          this.toaster.error(data.responseFriendlyMessage);
        } else {
          this.submitted = false;
          localStorage.setItem("token", data.token);
          this.toaster.success("Successful login...");
          this.router.navigate(["access/"]);
        }
      },
      (err) => {
        this.utils.StopSpinner();
        console.log("Error Message : " + err.message);
        console.log("Error : " + err.status);
        console.log(err.error);
        this.toaster.error(err.error.responseFriendlyMessage);
      }
    );
  }

  resetBackToLogin() {
    this.otpPart = false;
    this.form.patchValue({ email: "", password: "" });
    this.form.reset();
    this.otpForm.reset();
    this.submitted = false;
  }

  validateOtp() {
    this.submitted = true;
    let value = this.otpForm.get("otp").value;
    var nowDate = new Date().getTime();

    console.log("current date time : " + nowDate);
    console.log("time to exipire : " + this.expiretime);
    if (this.otpTrials >= 5) {
      this.toaster.error(
        "You have entered more than 5 invalid OTP please try log in again to get a new OTP"
      );
      this.resetBackToLogin();
      return;
    }

    if (this.otp == value) {
      //let UserType = data.userType

      if (nowDate < this.expiretime) {
        this.resetBackToLogin();
        if (this.token.length > 0) {
          localStorage.setItem("token", this.token);
          this.toaster.success("Successful login...");
          this.router.navigate(["access/"]);
        } else {
          this.toaster.error("An error occured. Please try again later.");
        }
      } else {
        this.toaster.error(
          "This OTP has expired, please login again to request for a new OTP"
        );
        this.resetBackToLogin();
        return;
      }
    } else {
      this.otpTrials = this.otpTrials + 1;
      this.toaster.error("Invalid OTP Entered");
    }
  }
}
