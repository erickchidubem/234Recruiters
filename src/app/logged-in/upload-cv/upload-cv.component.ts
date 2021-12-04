import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserInfo } from "src/app/models/api-response";
import { ContextService } from "src/app/shared/services/context.service";
import { Utils } from "src/app/shared/services/utils";

@Component({
  selector: "app-upload-cv",
  templateUrl: "./upload-cv.component.html",
  styleUrls: ["./upload-cv.component.css"],
})
export class UploadCvComponent implements OnInit {
  cvForm: FormGroup;
  userInfo: UserInfo;
  submitted: boolean = false;
  constructor(
    private utils: Utils,
    private context: ContextService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.utils.getUserFromToken();
    this.cvFormInit(this.userInfo.userid);
  }

  handleFileInput(event) {
    // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cvForm.get("fileSource").patchValue(file);
    }
  }

  cvFormInit(userId: string) {
    this.cvForm = new FormGroup({
      Id: new FormControl(0, []),
      userId: new FormControl(userId, [Validators.required]),
      NamedCV: new FormControl("", [Validators.required]),
      file: new FormControl("", []),
      fileSource: new FormControl("", [Validators.required]),
    });
  }

  Submit() {
    this.submitted = true;
    if (this.cvForm.invalid) {
      return;
    }

    this.utils.StartSpinner();

    let formValue = this.cvForm.value;
    let formData = new FormData();

    for (const key in formValue) {
      if (Object.prototype.hasOwnProperty.call(formValue, key)) {
        formData.append(key, formValue[key]);        
      }
    }

    this.context.postWithToken2(formData, "UserProfile/UploadCV", null).subscribe(
      (response) => {
        this.utils.StopSpinner();
        let data = <any>response;
        // console.log(data);
        if (data.responseCode == "99") {
          this.toaster.error(data.responseFriendlyMessage);
        } else {
          this.submitted = false;
          this.cvForm.reset();
          this.toaster.success(data.responseFriendlyMessage);
          this.router.navigate(["access/"]);
        }
      },
      (err) => {
        this.utils.StopSpinner();
        // console.log("Error Message : " + err.message);
        // console.log("Error : " + err.status);
        // console.log(err.error);
        this.toaster.error(err.error.responseFriendlyMessage);
      }
    );
  }
}
