import { HttpHeaders } from "@angular/common/http";
export class Constants {
  public static deployMode = 1; // 0 -> dev, 1-> online test, 2 -> live
  public DM = Constants.deployMode;
  public readonly apiUrl = Constants.getAPI_URL();

  GetToken() {
    if (localStorage.getItem("token") != null) {
      //  return atob(atob(atob(atob(localStorage.getItem("token")))));
      return localStorage.getItem("token");
    } else {
      return null;
    }
  }

  GetAPIKEY() {
    if (Constants.deployMode == 0) {
      return "xr7TPU0GaoNCvIzcUDdyHLaNMAvLXdp9ZJgQAXG35b96JAw7FbQrwQci0Q735PDlPMhtH"; // dev
    } else if (Constants.deployMode == 1) {
      return "xr7TPU0GaoNCvIzcUDdyHLaNMAvLXdp9ZJgQAXG35b96JAw7FbQrwQci0Q735PDlPMhtH"; // online test server
    } else if (Constants.deployMode == 2) {
      return "xr7TPU0GaoNCvIzcUDdyHLaNMAvLXdp9ZJgQAXG35b96JAw7FbQrwQci0Q735PDlPMhtH"; //live
    }
  }

  static getAPI_URL() {
    if (this.deployMode == 0) {
      return "https://localhost:2599/api/"; // dev
    } else if (this.deployMode == 1) {
      return "http://www.234recruiter.com/api/"; // online test server
    } else if (this.deployMode == 2) {
      return "https://flaxity.com/cisburosal/public/"; //live
    }
  }

  GetHttpHeadersToken(): HttpHeaders {
    const headers = this.GetHttpHeadersAnonymous().set(
      "Authorization",
      "Bearer " + this.GetToken()
    );
    return headers;
  }

  GetHttpHeadersToken2(): HttpHeaders {
    const headers = new HttpHeaders()
      .set("content-type", "multipart/form-data")
      .set("APIKEY", this.GetAPIKEY())
      .set("Authorization", "Bearer " + this.GetToken());
    return headers;
  }

  GetHttpHeadersAnonymous(): HttpHeaders {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("APIKEY", this.GetAPIKEY());
    return headers;
  }
}
