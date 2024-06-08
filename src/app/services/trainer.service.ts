import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/trainer.model';


@Injectable({
  providedIn: 'root'
})

export class TrainerService {
    private apiUrl = 'https://localhost:32769/api'; 
  
    constructor(private http: HttpClient) { }

    getTrainers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/user`);
    }
    createTrainer(trainer: User): Observable<User> {
      return this.http.post<User>(`${this.apiUrl}/user`, trainer);
    }
    deleteTrainer(trainerId: number): Observable<User> {
      return this.http.delete<User>(`${this.apiUrl}/user/${trainerId}`);
    }
}
