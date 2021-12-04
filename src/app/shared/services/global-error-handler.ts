import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Utils } from "./utils";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private utils: Utils;
  private router: Router;
  private toaster: ToastrService;
  constructor(
    private injector: Injector
    ) {}

  handleError(error: any): void {
    this.utils = this.injector.get(Utils);
    this.router = this.injector.get(Router);
    console.log(error);
    console.log(`Request URL: ${this.router.url}`);    
    this.utils.StopSpinner();
    if (error instanceof HttpErrorResponse) {
      this.ErrorManager(error.status);
      console.error("Error status:", error.status);
      console.error("Error message:", error.message);
    } else {
      console.error("Error message:", error.message);
      this.router.navigate(["error/500"]);
    }
  }

  ErrorManager(errorcode) {
    this.router = this.injector.get(Router);
    this.toaster = this.injector.get(ToastrService);
    let theErrorMessage = "";
    if (errorcode == 500) {
      theErrorMessage =
        "Internal Error, please contact the system administrator";
      this.router.navigate(["error/500"]);
    } else if (errorcode == 400) {
      theErrorMessage =
        "Please check your input values, some fields where not supplied properly";
    } else if (errorcode == 401) {
      this.router.navigate(["error/401"]);
    } else {
      theErrorMessage =
        "Unknown Error, please contact the system administrator";
      this.router.navigate(["error/500"]);
    }
    this.toaster.error(theErrorMessage);
  }
}
