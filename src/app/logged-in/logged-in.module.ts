import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import {SharedModule} from '../shared/shared.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CommonModule } from "@angular/common";
import { LottieModule } from "ngx-lottie";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardGeneralAdminComponent } from "./dashboard/dashboard-general-admin/dashboard-general-admin.component";
import { DashboardIndividualComponent } from "./dashboard/dashboard-individual/dashboard-individual.component";
import { AnQrcodeModule } from "an-qrcode";
import { ChartsModule } from "ng2-charts";
import { DashboardEntityComponent } from "./dashboard/dashboard-entity/dashboard-entity.component";
import { NgSelect2Module } from "ng-select2";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { PostAJobComponent } from "./post-a-job/post-a-job.component";
import { JobSingleComponent } from "../public-pages/job-single/job-single.component";
import { JobSearchComponent } from "../public-pages/job-search/job-search.component";
import { UploadCvComponent } from "./upload-cv/upload-cv.component";
import { RoleAuthGuard } from "../shared/auth-guards/role-auth-guard";

const routes: Routes = [
  { path: "", component: DashboardComponent },

  { path: "user-profile", component: UserProfileComponent },
  { path: "post-a-job", component: PostAJobComponent, canActivate: [RoleAuthGuard]},
  { path: "edit-a-job/:id", component: PostAJobComponent, canActivate: [RoleAuthGuard]},
  { path: "job-single/:id", component: JobSingleComponent },
  {
    path: "job-search/:keyword/:location/:category",
    component: JobSearchComponent,
  },
  { path: "upload-cv", component: UploadCvComponent },
  // { path : 'delivery-note/:id/:salesid', component : DeliveryTicketComponent}
];

export function playerFactory() {
  return import("lottie-web");
}
@NgModule({
  imports: [
    // SharedModule,
    AnQrcodeModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelect2Module,
    ReactiveFormsModule,
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    GooglePlaceModule,
    ChartsModule,
  ],

  exports: [RouterModule, NgxUiLoaderModule, GooglePlaceModule, AnQrcodeModule],

  declarations: [
    DashboardComponent,

    DashboardGeneralAdminComponent,

    DashboardIndividualComponent,

    DashboardEntityComponent,

    UserProfileComponent,

    PostAJobComponent,

    UploadCvComponent,
  ],
})
export class LoggedInModule {}
