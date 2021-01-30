import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
//import {SharedModule} from '../shared/shared.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGeneralAdminComponent } from './dashboard/dashboard-general-admin/dashboard-general-admin.component';
import { DashboardIndividualComponent } from './dashboard/dashboard-individual/dashboard-individual.component';
import { CreateEntityLocationComponent } from './create-entity-location/create-entity-location.component';
import { ViewMyEntityLocationsComponent } from './view-my-entity-locations/view-my-entity-locations.component';
import { AnQrcodeModule } from 'an-qrcode';
import { ChartsModule } from 'ng2-charts';
import { DashboardEntityComponent } from './dashboard/dashboard-entity/dashboard-entity.component';
import { TraceHistoryComponent } from './trace-history/trace-history.component';
import { NgSelect2Module } from 'ng-select2';
import { EntityExposedLocationsComponent } from './entity-exposed-locations/entity-exposed-locations.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateTestCentersComponent } from './create-test-centers/create-test-centers.component';
import { ViewTestCentersComponent } from './view-test-centers/view-test-centers.component';
import { ViewContactTracedComponent } from './view-contact-traced/view-contact-traced.component';
import { ViewAllEntitiesComponent } from './view-all-entities/view-all-entities.component';
import { ViewAllLocationsCountComponent } from './view-all-locations-count/view-all-locations-count.component';

const routes: Routes = [
    {path : '',component:DashboardComponent},
    {path : 'create-user', component : CreateNewUserComponent},
    {path : 'create-location', component : CreateEntityLocationComponent},
    {path : 'view-location', component : ViewMyEntityLocationsComponent},
    {path : 'trace-contact', component : TraceHistoryComponent},
    {path : 'entity-exposed-location', component : EntityExposedLocationsComponent},
    {path : 'view-user', component : ViewUsersComponent},
    {path : 'create-test-centers', component : CreateTestCentersComponent},
    {path : 'view-test-centers', component : ViewTestCentersComponent},
    {path : 'contact-traced/:companyname/:address/:id', component : ViewContactTracedComponent},
    {path : 'view-entities', component : ViewAllEntitiesComponent},
    {path : 'view-location-counts', component : ViewAllLocationsCountComponent}
    // { path : 'service-call/:id', component:ServiceTicketComponent},
    // { path : 'delivery-note/:id/:salesid', component : DeliveryTicketComponent}
     
 ];  

 export function playerFactory() {
  return import('lottie-web');
}
@NgModule({ 
  
  imports: [
   // SharedModule,
    AnQrcodeModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule,CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    GooglePlaceModule,
    ChartsModule,
    
  ],

  exports : [
    RouterModule,NgxUiLoaderModule,GooglePlaceModule,AnQrcodeModule
  ],
 
  declarations: [
   
CreateNewUserComponent,
   
DashboardComponent,
   
DashboardGeneralAdminComponent,
   
DashboardIndividualComponent,
   
CreateEntityLocationComponent,
   
ViewMyEntityLocationsComponent,
   
DashboardEntityComponent,
   
TraceHistoryComponent,
   
EntityExposedLocationsComponent,
   
ViewUsersComponent,
   
CreateTestCentersComponent,
   
ViewTestCentersComponent,
   
ViewContactTracedComponent,
   
ViewAllEntitiesComponent,
   
ViewAllLocationsCountComponent],

})
export class LoggedInModule { }