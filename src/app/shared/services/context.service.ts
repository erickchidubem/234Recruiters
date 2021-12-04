import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Constants } from "./constants";

@Injectable({
  providedIn: "root",
})
export class ContextService {
  constructor(private http: HttpClient, private config: Constants) {}

  decodeToken() {
    var decoded = jwt_decode(this.config.GetToken());
    return decoded;
  }

  UserProfile() {
    let value = <any>this.decodeToken();
    return value.context.user[0];
  }

  getWithToken(DataObject: string, SubAPIURL: string) {
    return this.http.get(this.config.apiUrl + SubAPIURL + DataObject, {
      headers: this.config.GetHttpHeadersToken(),
    });
  }

  postWithToken(DataObject: any, SubAPIURL: string) {
    return this.http.post<any>(this.config.apiUrl + SubAPIURL, DataObject, {
      headers: this.config.GetHttpHeadersToken(),
    });
  }

  postWithToken2(DataObject: any, SubAPIURL: string, contentType = "multipart/form-data") {
    return this.http.post<any>(this.config.apiUrl + SubAPIURL, DataObject, {
      headers: this.config.GetHttpHeadersToken2(contentType),
    });
  }

  getWithNoToken(DataObject: string, SubAPIURL: string) {
    return this.http.get(this.config.apiUrl + SubAPIURL + DataObject, {
      headers: this.config.GetHttpHeadersAnonymous(),
    });
  }

  postWithNoToken(DataObject: any, SubAPIURL: string) {
    return this.http.post(this.config.apiUrl + SubAPIURL, DataObject, {
      headers: this.config.GetHttpHeadersAnonymous(),
    });
  }
}
