import { Component, OnInit } from "@angular/core";
import { Candidate, Employer } from "src/app/models/api-response";
import { Utils } from "src/app/shared/services/utils";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  viewCandidateDashboard: boolean = false;
  viewAdminDashboard: boolean = false;
  constructor(private utils: Utils) {}  
  ngOnInit(): void {
    // console.log(this.utils.getUserFromToken().userrole);
    if (this.utils.getUserFromToken().userrole == Employer) {
      this.viewAdminDashboard = true;
    } else if (this.utils.getUserFromToken().userrole == Candidate) {
      this.viewCandidateDashboard = true;
    }
  }
}
