import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/services/utils';
import { ContextService } from 'src/app/shared/services/context.service';
import { ToastrService } from 'ngx-toastr';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-entity-exposed-locations',
  templateUrl: './entity-exposed-locations.component.html',
  styleUrls: ['./entity-exposed-locations.component.css']
})
export class EntityExposedLocationsComponent implements OnInit {
  constructor(private fb : FormBuilder, private utils : Utils, private context : ContextService,
    private toaster : ToastrService) { }
  
 
  
  ngOnInit(): void {

    this.getAllTracedSummary(this.utils.getUserFromToken().Id);
  }

  

  allTraceSummary : any =[];
  getAllTracedSummary(entityId="0",stateId="0",lgaId="0"){
    this.utils.StartSpinner();
      this.context.getWithToken('','trace/getalltraced/'+entityId+'/'+stateId+'/'+lgaId).
      subscribe( data => {
        let d = <any>data;
        this.allTraceSummary = d.data;
        console.log(this.allTraceSummary)
        this.utils.StopSpinner();
      }); 
  }

  


}
 