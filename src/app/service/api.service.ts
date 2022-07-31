import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppConfigService } from '../providers/app-config.service';
import { Server } from '../model/server'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private config: AppConfigService) { }

  // Get all servers
  getServers(): Observable<any> {
    return this.http.get(
      `${this.config.getConfig().apiUrl}${this.config.getConfig().server}`)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get server by id
  getServer(id: any): Observable<any> {
    let url = `${this.config.getConfig().apiUrl}${this.config.getConfig().server}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
