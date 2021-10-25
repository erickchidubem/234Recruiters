import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public utils : Utils) { }

  viewCandidateDashboard : boolean = false;
  viewAdminDashboard : boolean = false;
  ngOnInit(): void {
    console.log(this.utils.getUserFromToken().userrole)
    if(this.utils.getUserFromToken().userrole == "EMPLOYER"){
     this.viewAdminDashboard = true;

  }else if(this.utils.getUserFromToken().userrole == "CANDIDATE"){
      this.viewCandidateDashboard = true;
  }
  }

}
