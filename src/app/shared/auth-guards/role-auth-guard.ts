import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Utils } from '../services/utils';
import { Candidate } from 'src/app/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
   jwtHelper = new JwtHelperService();
  constructor(private router: Router, private utils : Utils) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = this.utils.getUserFromToken();   
    
    if(token?.userrole != Candidate) return true;

    this.router.navigate(["/access"]);
    return false;
  }
  
}