import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {path : '' , redirectTo: '/public-user/login', pathMatch:'full' },
  {path : 'public-user',loadChildren: () => import('./user-management/user-management.module').then(m => m.UserMangementModule)},

  // {path : 'home', component:LoginComponent},
  // {path : 'login', component:LoginComponent},
  // {path : 'reset-password', component : ResetPasswordComponent},
  // {path : 'password-reset/:id/:date/:date2/:datediff', component : PasswordResetComponent},
  // {path : 'access', component:BodyContentComponent, canActivate:[InternalAuthGuard], loadChildren : './logged-in/logged-in.module#LoggedInModule'},
 
  // {path : 'ticket', loadChildren : './tickets/tickets.module#TicketsModule'}, 
  //{ path: 'error', loadChildren: './error-pages/error.module#ErrorModule' },
 // { path : '**', redirectTo : '/error/400'},
  
];

@NgModule({
  imports: [
                RouterModule.forRoot(routes, {useHash:true}),
                // FormsModule,
                // ReactiveFormsModule,
                // BrowserModule,
                // NgxUiLoaderModule,
                // ToastrModule.forRoot(),
                // PasswordStrengthMeterModule
  ],
  exports: [  
    RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgxUiLoaderModule,
    // ToastrModule,
  ],
 
  declarations :[
    // LoginComponent,
    // BodyContentComponent,
    // HeaderComponent,
    // FooterComponent,
    // PrimarySidebarComponent,
    // SecondarySidebarComponent,
    // ResetPasswordComponent,
    // PasswordResetComponent
  ]
})
export class AppRoutingModule { }
