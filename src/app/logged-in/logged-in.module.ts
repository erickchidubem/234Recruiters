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



const routes: Routes = [
    {path : '',component:DashboardComponent},
    {path : 'create-user', component : CreateNewUserComponent},
    {path : 'create-location', component : CreateEntityLocationComponent}

    // { path : 'service-call/:id', component:ServiceTicketComponent},
    // { path : 'delivery-note/:id/:salesid', component : DeliveryTicketComponent}
    
 ]; 

 export function playerFactory() {
  return import('lottie-web');
}
@NgModule({ 
  
  imports: [
   // SharedModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    GooglePlaceModule,
  ],

  exports : [
    RouterModule,NgxUiLoaderModule,GooglePlaceModule,
  ],
 
  declarations: [
   
CreateNewUserComponent,
   
DashboardComponent,
   
DashboardGeneralAdminComponent,
   
DashboardIndividualComponent,
   
CreateEntityLocationComponent],

})
export class LoggedInModule { }