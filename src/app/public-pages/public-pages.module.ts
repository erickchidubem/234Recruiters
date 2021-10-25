import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
//import {SharedModule} from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { JobSingleComponent } from './job-single/job-single.component';
//import { LottieModule } from 'ngx-lottie';



const routes: Routes = [
    {path : '', component : HomeComponent},
    {path:'about-us', component : AboutUsComponent},
    {path:'terms', component : TermsComponent},
    {path:'faq', component : FaqComponent},
    {path:'contact', component:ContactComponent},
    {path:'job-single/:id', component: JobSingleComponent}


    // { path: 'password-reset/:id/:date/:date2/:datediff', component : ResetPasswordComponent}
    // // { path : 'service-call/:id', component:ServiceTicketComponent},
    
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
   // LottieModule.forRoot({ player: playerFactory })
  ],

  exports : [
    RouterModule,NgxUiLoaderModule
  ],
 
  declarations: [
    // LoginComponent,
    // RegisterComponent,
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
    HomeComponent,
    PublicLayoutComponent,
    AboutUsComponent,
    TermsComponent,
    FaqComponent,
    ContactComponent,
    JobSingleComponent,
],

})
export class PublicPagesModule { }