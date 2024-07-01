import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../complaint/complaint';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private apiUrl = 'http://localhost:8080/date';

    constructor(private http: HttpClient) { }

    getYear(): Observable<Date> { // Zmieniamy bigint na number
        return this.http.get<Date>(this.apiUrl);
    }

    getAmountOfComplaints(): Observable<number> { // Zmieniamy bigint na number
        return this.http.get<number>('http://localhost:8080/complaint/amountOfReports');
    }

    getAmountOfComplaintsThisWeek(): Observable<number> { // Zmieniamy bigint na number
        return this.http.get<number>('http://localhost:8080/complaint/amountOfComplaintsThisWeek');
    }

    getComplaintsByMonth(): Observable<Map<number, number>> {
        return this.http.get<Map<number, number>>('http://localhost:8080/complaint/complaintsChart');
    }

    getCriticalComplaints(): Observable<Complaint[]> { // Zmieniamy bigint na number
        return this.http.get<Complaint[]>('http://localhost:8080/complaint/expiresInTwoDays');
    }

}
