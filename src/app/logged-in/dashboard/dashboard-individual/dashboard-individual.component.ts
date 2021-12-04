import { Component, OnInit } from "@angular/core";
import { Utils } from "src/app/shared/services/utils";
import { ContextService } from "src/app/shared/services/context.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-dashboard-individual",
  templateUrl: "./dashboard-individual.component.html",
  styleUrls: ["./dashboard-individual.component.css"],
})
export class DashboardIndividualComponent implements OnInit {
  userName: string = "";
  constructor(
    private utils: Utils,
    private context: ContextService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.userName = this.utils.getUserFromToken().fullname;
  }

  recentApplications: any = [];
  getAllTracedSummary(entityId = "0", stateId = "0") {
    this.utils.StartSpinner();
    this.context
      .getWithToken("", "trace/getdashboardinfo/" + entityId + "/" + stateId)
      .subscribe((data) => {
        let d = <any>data;
        this.recentApplications = d.data;
        // console.log(this.recentApplications);
        this.utils.StopSpinner();
      });
  }
}
