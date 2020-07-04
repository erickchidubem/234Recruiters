import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Utils } from '../services/utils';

@Injectable({
  providedIn: 'root'
})
export class InternalAuthGuard implements CanActivate,CanActivateChild {
   jwtHelper = new JwtHelperService();
  constructor(private router: Router, private utils : Utils) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = this.utils.getToken();   
    console.log(token);
    if(token != null){
      if (!this.jwtHelper.isTokenExpired(token)){
          //confirm token again db
            return true;
          }
    }    
     this.router.navigate(["login"]);
     return false;
  }
  
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var token = this.utils.getToken();   
    console.log(token);
    if(token != null){
      if (!this.jwtHelper.isTokenExpired(token)){
            return true;
          }
    }    
     this.router.navigate(["login"]);
     return false;
  }
}