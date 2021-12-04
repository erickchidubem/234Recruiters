import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ContextService } from "src/app/shared/services/context.service";
import { Utils } from "src/app/shared/services/utils";
//import { ToasterService } from 'src/app/shared/services/';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,

    private router: Router,
    private context: ContextService,
    public utils: Utils
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.setUp();
  }

  form: FormGroup;
  generateForm() {
    this.form = this.fb.group({
      keyword: [""],
      location: ["-all-"],
      category: ["-all-"],
    });
  }

  submit() {
    let formData = <any>JSON.stringify(this.form.value);
    // console.log(formData);
    //job-search/:keyword/:location/:category
    let keyword = this.getEmptyValue(this.form.get("keyword").value);
    let location = this.getEmptyValue(this.form.get("location").value);
    let category = this.getEmptyValue(this.form.get("category").value);
    // console.log(keyword);
    this.router.navigate([
      "/home/job-search/" + keyword + "/" + location + "/" + category,
    ]);
  }

  getEmptyValue(value) {
    if (value == "") {
      return "-all-";
    } else {
      return value;
    }
  }

  categories: any = [];
  states: any = [];
  jobDetails: any = [];
  setUp() {
    this.context.getWithToken("", "Jobs/GetJobsCategory").subscribe((data) => {
      let d = <any>data;
      // console.log(d);
      this.categories = d.responseObject;
    });

    this.context.getWithToken("", "Jobs/GetStates").subscribe((data) => {
      let d = <any>data;
      // console.log(d);
      this.states = d.responseObject;
    });

    this.context
      .getWithToken("", "Jobs/GetJobs?PageNum=0")
      .subscribe((data) => {
        let d = <any>data;
        // console.log(d);
        this.jobDetails = d.responseObject.data;
      });
  }
}
