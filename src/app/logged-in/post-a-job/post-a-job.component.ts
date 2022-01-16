import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Candidate } from "src/app/models/api-response";
import { ContextService } from "src/app/shared/services/context.service";
import { Utils } from "src/app/shared/services/utils";

@Component({
  selector: "app-post-a-job",
  templateUrl: "./post-a-job.component.html",
  styleUrls: ["./post-a-job.component.css"],
})
export class PostAJobComponent implements OnInit {
  userInfo: any;
  constructor(
    private fb: FormBuilder,
    private utils: Utils,
    private context: ContextService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  action: string = "Post";
  id = 0;
  ngOnInit(): void {
    this.userInfo = this.utils.getUserFromToken();
    if (this.userInfo.userrole != Candidate) {
      this.id = this.route.params["value"].id;
      if (this.id > 0) {
        this.action = "Edit";
      }
      this.generateForm();
      this.setUp();
    } else {
      this.router.navigateByUrl("/access");
    }
  }

  get f() {
    return this.form.controls;
  }

  categories: any = [];
  states: any = [];
  jobDetails: any = [];
  userProfile: any;
  userRole: string = "";
  the_type: string = "";
  setUp() {
    this.context.getWithToken("", "Jobs/GetJobsCategory").subscribe((data) => {
      let d = <any>data;
      // console.log(d)
      this.categories = d.responseObject;
    });

    this.context.getWithToken("", "Jobs/GetStates").subscribe((data) => {
      let d = <any>data;
      // console.log(d)
      this.states = d.responseObject;
    });

    this.context
      .getWithToken("", "UserProfile/GetUserProfile")
      .subscribe((data) => {
        let d = <any>data;
        // console.log(d)
        this.userRole = d.responseObject.userRole;
        this.userProfile = d.responseObject.userProfile;
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

  form: FormGroup;
  generateForm() {
    this.form = this.fb.group({
      id: 0,
      jobCategoryId: ["", [Validators.required]], //
      jobTitle: ["", [Validators.required]], //
      jobDescription: ["", [Validators.required]], //
      jobLocation: ["", [Validators.required]], //
      startAcceptingEntryDate: ["", [Validators.required]], //
      expiryDate: ["", [Validators.required]], //
      salaryRangeFrom: ["", [Validators.required]], //
      salaryRangeTo: ["", [Validators.required]], //
      jobType: ["", [Validators.required]], //
      urgency: ["", [Validators.required]], //
      hoursPerWeek: ["", [Validators.required]],
      skillsAndExperience: ["", [Validators.required]], //
      keyResponsibility: ["", [Validators.required]], //
      shouldApplyHere: ["true"],
      applicationLink: [""],
    });
  }

  submitted: boolean = false;
  Submit() {
    this.submitted = true;
    let formData = JSON.stringify(this.form.value);
    // console.log(formData)
    if (this.form.invalid) {
      return;
    }

    this.utils.StartSpinner();

    this.context
      .postWithToken(formData, "Jobs/AddEditJobDescription")
      .subscribe(
        (response) => {
          this.utils.StopSpinner();
          let data = <any>response;
          // console.log(data)
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
          // console.log('Error Message : '+err.message);
          // console.log('Error : '+err.status);
          // console.log (err.error)
          this.toaster.error(err.error.responseFriendlyMessage);
        }
      );
  }
}
