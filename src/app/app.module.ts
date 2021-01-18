import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { GlobalErrorHandlerService } from './shared/services/global-error-handler';
import { Constants } from './shared/services/constants';
import { Utils } from './shared/services/utils';
import { ContextService } from './shared/services/context.service';
import { DatePipe } from '@angular/common';

//import { Select2Module } from 'ng2-select2';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GooglePlaceModule,
    //Select2Module,
   // HttpModule,
    HttpClientModule,FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
        Constants,
        Utils,
        ContextService,
        GlobalErrorHandlerService,
      //  CdkTableService,
        DatePipe,
        { 
        provide:  ErrorHandler, 
        useClass: GlobalErrorHandlerService 
      },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
