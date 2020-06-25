import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Utils} from './utils';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {


  constructor(private injector: Injector) { }


  handleError(error: any): void {
    console.log(error);
    const router = this.injector.get(Router);
    const util = this.injector.get(Utils);

    console.log(`Request URL: ${router.url}`);
    util.StopSpinner();
    if (error instanceof HttpErrorResponse) {
      this.ErrorManager(error.status);
      console.error('Error status:', error.status);    
      console.error('Error message:', error.message); 
    }
    else{
      console.error('Error message:', error.message); 
      router.navigate(['error/500'])
    }
  }

  ErrorManager(errorcode){
    let theErrorMessage = "";
    const router = this.injector.get(Router);
    const toaster = this.injector.get(ToastrService);
    if(errorcode == 500){
      theErrorMessage = "Internal Error, please contact the system administrator";
      router.navigate(['error/500']);
      }else if(errorcode == 400){
          theErrorMessage = "Please check your input values, some fields where not supplied properly";
      }else if (errorcode == 401){
          router.navigate(['error/401']);
     }else{
      theErrorMessage = "Unknown Error, please contact the system administrator";
      router.navigate(['error/500']);
     }
    toaster.error(theErrorMessage);
  }


}