import { inject, Injectable } from "@angular/core";
import { ClockFormModel } from "../models/clock-form.model";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export type FormResult = 
    | { status: 'ok' } 
    | { status: 'error'; 
        fieldErrors: Partial<Record<keyof ClockFormModel, string>>; 
    };

@Injectable({
    providedIn: 'root'
})
export class ClockFormService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/clocks';

    async addClock(value: ClockFormModel): Promise<FormResult> {
        await new Promise((r) => setTimeout(r, 700));

        const fieldErrors: Partial<Record<keyof ClockFormModel, string>> = {}

        // Exemples de règle de validation (à brancher avec la BDD)
        if (value.name.trim().toLowerCase() === 'accueil' && value.room.trim().toLowerCase() === 'hall') {
            fieldErrors.name = 'Cette horloge éxiste déjà (Test front)';
        }

        try {
            await firstValueFrom(this.http.post(this.apiUrl, value));
            return { status: 'ok'}
        } catch (e: any) {
            console.error('API Error', e);
            return {
                status: 'error',
                fieldErrors: {
                    status: "Erreur serveur : Impossible de créer l'horloge"
                }
            }
        }
    }
}