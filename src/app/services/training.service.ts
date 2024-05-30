import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
    private apiUrl = 'https://localhost:32769'; 
  
    constructor(private http: HttpClient) { }

    getTrainings(): Observable<Training[]> {
      return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
    }

    getTraining(id: number): Observable<Training> {
      return this.http.get<Training>(`${this.apiUrl}/trainings/${id}`);
    }

    addTraining(training: Training): Observable<Training> {
      return this.http.post<Training>(`${this.apiUrl}/trainings`, training);
    }

    updateTraining(training: Training): Observable<Training> {
      return this.http.put<Training>(`${this.apiUrl}/trainings/${training.id}`, training);
    }

    deleteTraining(id: number): Observable<Training> {
      return this.http.delete<Training>(`${this.apiUrl}/trainings/${id}`);
    }
}

    