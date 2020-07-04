import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyContentComponent} from './shared/loggedin-layout/body-content/body-content.component';
import { InternalAuthGuard } from './shared/auth-guards/internal-auth-guard';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
const routes: Routes = [
  
  {path : '' , redirectTo: '/public-user/login', pathMatch:'full' },
  {path : 'public-user',loadChildren: () => import('./user-management/user-management.module').then(m => m.UserMangementModule)},
  {path : 'access', component:BodyContentComponent, canActivate:[InternalAuthGuard], loadChildren : ()=> import('./logged-in/logged-in.module').then(m=>m.LoggedInModule)},
  
  
];

@NgModule({
  imports: [
                RouterModule.forRoot(routes, {useHash:true}),
                NgxUiLoaderModule,
                // FormsModule,
                // ReactiveFormsModule,
                // BrowserModule,
                // NgxUiLoaderModule,
                // ToastrModule.forRoot(),
                // PasswordStrengthMeterModule
  ],
  exports: [  
    RouterModule,
    NgxUiLoaderModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgxUiLoaderModule,
    // ToastrModule,
  ],
 
  declarations :[
    // LoginComponent,
     BodyContentComponent,
    // HeaderComponent,
    // FooterComponent,
    // PrimarySidebarComponent,
    // SecondarySidebarComponent,
    // ResetPasswordComponent,
    // PasswordResetComponent
  ]
})
export class AppRoutingModule { }
