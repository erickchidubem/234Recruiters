import { Component, OnInit } from "@angular/core";
import { Utils } from "../../services/utils";
import { ContextService } from "../../services/context.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiResponse, Candidate, UserInfo, UserProfile, Employer } from "src/app/models/api-response";

@Component({
  selector: "app-body-content",
  templateUrl: "./body-content.component.html",
  styleUrls: ["./body-content.component.css"],
})
export class BodyContentComponent implements OnInit {
  Employer: string = Employer;
  userInfo: UserInfo;
  name: string;
  traceContact: Boolean = false;
  role: string = Candidate;
  mobileMenu = true;

  constructor(
    private utils: Utils,
    private context: ContextService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) {
      this.mobileMenu = false;
    }
    this.userInfo = this.utils.getUserFromToken();
    this.role = this.userInfo.userrole;
    // console.log(this.role);
    this.GetUserProfile();
    if (this.userInfo.userType == 2) {
      this.name = this.userInfo.entityName;
      this.traceContact = false;
    } else {
      this.name = this.userInfo.firstName + " " + this.userInfo.lastName;
      this.traceContact = true;
    }

    // console.log(this.traceContact);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  GetUserProfile() {
    this.context
      .getWithToken("", "UserProfile/GetUserProfile")
      .subscribe((data: ApiResponse<UserProfile>) => {
        if (data.responseObject.userProfile == null) {
          this.router.navigate(["/access/user-profile"]);
        }
      });
  }
}
