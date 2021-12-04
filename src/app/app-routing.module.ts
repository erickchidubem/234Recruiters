import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BodyContentComponent } from "./shared/loggedin-layout/body-content/body-content.component";
import { PublicLayoutComponent } from "./public-pages/public-layout/public-layout.component";
import { InternalAuthGuard } from "./shared/auth-guards/internal-auth-guard";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CommonModule } from "@angular/common";
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: PublicLayoutComponent,
    loadChildren: () =>
      import("./public-pages/public-pages.module").then(
        (m) => m.PublicPagesModule
      ),
  },
  {
    path: "public-user",
    loadChildren: () =>
      import("./user-management/user-management.module").then(
        (m) => m.UserMangementModule
      ),
  },
  {
    path: "access",
    component: BodyContentComponent,
    canActivate: [InternalAuthGuard],
    loadChildren: () =>
      import("./logged-in/logged-in.module").then((m) => m.LoggedInModule),
  },
  // { path: '**', component: ErrorComponent },\
  {path: 'error/500', redirectTo: "/home" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    NgxUiLoaderModule,
    // FormsModule,
    // ReactiveFormsModule,
    // BrowserModule,
    // NgxUiLoaderModule,
    // ToastrModule.forRoot(),
    // PasswordStrengthMeterModule
    CommonModule
  ],
  exports: [
    RouterModule,
    NgxUiLoaderModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgxUiLoaderModule,
    // ToastrModule,
  ],

  declarations: [
    // LoginComponent,
    BodyContentComponent,
    // HeaderComponent,
    // FooterComponent,
    // PrimarySidebarComponent,
    // SecondarySidebarComponent,
    // ResetPasswordComponent,
    // PasswordResetComponent
  ],
})
export class AppRoutingModule {}
