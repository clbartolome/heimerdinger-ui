import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: any;
  private info: any;
  constructor(private http: HttpClient) { }
  public loadConfig() {
    this.http.get('./assets/config/info.json')
      .toPromise()
      .then((info: any) => {
        this.info = info;
        console.log(this.info);
      })
      .catch((err: any) => {
        console.error(err);
      });
    return this.http.get('./assets/config/config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
        console.log(this.config);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  getConfig() {
    return this.config;
  }
  getInfo() {
    return this.info;
  }
}
