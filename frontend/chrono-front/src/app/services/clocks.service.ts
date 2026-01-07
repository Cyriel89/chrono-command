import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Clock } from "../models/clock.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClocksService{
    private http = inject(HttpClient);
    private clocks = signal<Clock[]>([]);
    readonly url = 'http://localhost:3000/api/clocks';

    getClocks(): Observable<Clock[]> {
        return this.http.get<Clock[]>(this.url)
    }
}