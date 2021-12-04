import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiResponse, JobCategory, UserProfile } from "src/app/models/api-response";
import { ContextService } from "src/app/shared/services/context.service";
import { Utils } from "src/app/shared/services/utils";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  
  categories: JobCategory[] = [];
  states: string[] = [];
  jobDetails: any = [];
  userProfile: any;
  userRole: string = "";
  the_type: string = "";
  submitted: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utils: Utils,
    private context: ContextService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.setUp();
  }

  get f() {
    return this.form.controls;
  }

  setUp() {
    this.context.getWithToken("", "Jobs/GetJobsCategory").subscribe((data: ApiResponse<Array<JobCategory>>) => {
      this.categories = data.responseObject;
    });

    this.context.getWithToken("", "Jobs/GetStates").subscribe((data: ApiResponse<string[]>) => {
      this.states = data.responseObject;
    });

    this.context
      .getWithToken("", "UserProfile/GetUserProfile")
      .subscribe((data: ApiResponse<UserProfile>) => {
        this.userRole = data.responseObject.userRole;
        this.userProfile = data.responseObject.userProfile;
        if (this.userRole == "EMPLOYER") {
          this.the_type = "Our Company";
          this.form.patchValue({
            firstName: "Employer",
            lastName: "Employer",
            userId: this.utils.getUserFromToken().userid,
            isIndividual: false,
          });
        } else if (this.userRole == "CANDIDATE") {
          this.the_type = "Me";
          this.form.patchValue({
            companyName: "Candidate",
            userId: this.utils.getUserFromToken().userid,
            isIndividual: true,
          });
        }

        if (this.userProfile != null) {
          this.form.patchValue({
            firstName: this.userProfile.firstName,
            lastName: this.userProfile.lastName,
            companyName: this.userProfile.companyName,
            phone: this.userProfile.phone,
            email: this.userProfile.email,
            briefDescription: this.userProfile.briefDescription,
            primaryIndustry: this.userProfile.primaryIndustry,
            address: this.userProfile.address,
            website: this.userProfile.website,
            stateOfResidence: this.userProfile.stateOfResidence,
            doneNYSC: "" + this.userProfile.doneNYSC + "",
            higestQualification: this.userProfile.higestQualification,
          });
        }
      });
  }

  generateForm() {
    this.form = this.fb.group({
      userId: 0,
      roleName: [this.utils.getUserFromToken().userrole],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      middleName: [""],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      isIndividual: [],
      companyName: ["", [Validators.required]],
      briefDescription: ["", [Validators.required]],
      primaryIndustry: ["", [Validators.required]],
      address: [""],
      website: [""],
      stateOfResidence: [""],
      dateOfBirth: [""],
      yearOfGraduation: [""],
      doneNYSC: ["false"],
      higestQualification: [""],
    });
  }

  Submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.utils.StartSpinner();

    let formData = JSON.stringify(this.form.value);
    // console.log(formData);
    this.context
      .postWithToken(formData, "UserProfile/UpdateUserProfile")
      .subscribe(
        (response) => {
          this.utils.StopSpinner();
          let data = <any>response;
          // console.log(data);
          if (data.responseCode == "99") {
            this.toaster.error(data.responseFriendlyMessage);
          } else {
            this.submitted = false;
            this.form.reset();
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
