import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ClockModel } from "../models/clock.model";
import { Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClocksService{
    private http = inject(HttpClient);
    readonly url = 'http://localhost:3000/api/clocks';

    getClocks(): Observable<ClockModel[]> {
        return this.http.get<ClockModel[]>(this.url)
    }

    addClock(clock: Omit<ClockModel, 'id | createdAt | manualOffset'>): Observable<ClockModel> {
        return this.http.post<ClockModel>(this.url, clock)
    }

    deleteClock( id: number): Observable<ClockModel> {
        return this.http.delete<ClockModel>(this.url + '/' + id);
    }

    updateClock( id: number, offset: Partial<ClockModel>): Observable<ClockModel> {
        return this.http.put<ClockModel>(this.url + '/' + id, offset);
    }
} 