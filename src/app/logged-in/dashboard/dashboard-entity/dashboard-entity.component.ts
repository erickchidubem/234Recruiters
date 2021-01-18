import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormBuilder } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-entity',
  templateUrl: './dashboard-entity.component.html',
  styleUrls: ['./dashboard-entity.component.css']
})
export class DashboardEntityComponent implements OnInit {

  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private toaster : ToastrService) { }

  ngOnInit(): void {
    this.getAllTracedSummary(this.utils.getUserFromToken().Id,"0");
    this.getMostContactTraced(this.utils.getUserFromToken().Id,"0");
    this.getMostExposedLocation(this.utils.getUserFromToken().Id,"0");
  }


  
  allTraceSummary : any =[];
  getAllTracedSummary(entityId="0",stateId="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getdashboardinfo/'+entityId+'/'+stateId).
      subscribe( data => {
        let d = <any>data;
        this.allTraceSummary = d.data;
        console.log(this.allTraceSummary)
        this.utils.StopSpinner();
      }); 
  }


  mostContactTraced : any =[];
  getMostContactTraced(entityId="0",stateId="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getdashboardmostcontacttraced/'+entityId+'/'+stateId).
      subscribe( data => {
        let d = <any>data;
        this.mostContactTraced = d.data;
        console.log(this.mostContactTraced)
        this.utils.StopSpinner();
      }); 
  } 

  mostExposedLocation : any =[];
  getMostExposedLocation(entityId="0",stateId="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getdashboardmostexposedlocation/'+entityId+'/'+stateId).
      subscribe( data => {
        let d = <any>data;
        this.mostExposedLocation = d.data;
        console.log(this.mostExposedLocation)
        this.utils.StopSpinner();
      }); 
  }

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75,2,22,100,0,11,45], label: 'Visitations' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October','November', 'December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
