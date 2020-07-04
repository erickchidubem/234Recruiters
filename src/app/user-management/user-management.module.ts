import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
//import {SharedModule} from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [
    {path : ''},
    { path:'login', component : LoginComponent },
    { path: 'register', component : RegisterComponent},
    { path: 'forgot-password', component : ForgotPasswordComponent},
    { path: 'password-reset/:id/:date/:date2/:datediff', component : ResetPasswordComponent}
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
    LottieModule.forRoot({ player: playerFactory })
  ],

  exports : [
    RouterModule,NgxUiLoaderModule
  ],
 
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
],

})
export class UserMangementModule { }