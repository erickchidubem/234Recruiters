import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/services/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public utils : Utils) { }

  viewEntityDashboard : boolean = false;
  ngOnInit(): void {
    if(this.utils.getUserFromToken().userType == 2){
     this.viewEntityDashboard = true;

  }else{
      this.viewEntityDashboard = false;
  }
  }

}
