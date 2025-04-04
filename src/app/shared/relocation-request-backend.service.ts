import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelocationRequest } from './interfaces/relocation-request';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelocationRequestBackendService {

  private apiUrl = "http://localhost:8090/request";

  constructor(private http: HttpClient) { }

  public sendRelocationRequest(data: Partial<RelocationRequest>): Observable<boolean> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log(data);

    return this.http.post<RelocationRequest>(url, data, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error:', error);
        return of(false);
      })
    );
  }
}
