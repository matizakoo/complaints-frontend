import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {InfoDTO} from "../../../info-dto";
import {map} from "rxjs/operators";
import {Complaint} from "./complaint";
import {Category} from "../category/category";
import {ComplaintComponent} from "./complaint.component";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
    private apiUrl = 'http://localhost:8080/complaint';

  constructor(private http: HttpClient) { }

    createComplaint(complaint: Complaint): Observable<HttpResponse<InfoDTO>> {
        return this.http.post<InfoDTO>(`${this.apiUrl}`, complaint , { observe: 'response' })
            .pipe(
                map(response => response),
                catchError(this.handleError)
            );
    }
    getComplaints(): Observable<Complaint[]> {
        return this.http.get<Complaint[]>(this.apiUrl);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Server error:', error);
        return throwError(() => new Error('Failed to create complaint. Please try again later.'));
    }
}
