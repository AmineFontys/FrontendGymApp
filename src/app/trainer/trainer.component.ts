import { Component } from '@angular/core';
import { User} from '../models/trainer.model';
import { TrainerService } from '../services/trainer.service';
import { NgFor } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class TrainerComponent {
  trainer: User = {
    id: 1,
    firstName: 'John',
    surName: 'Doe',
    email: '',
    phoneNumber: '',
    birthDate: '',
    isMale: true,
    role: 1 
  };
  trainers: User[] = [];
  selectedTrainerId: number | null = null;

  constructor( private trainerService: TrainerService, private router : Router) {}

  ngOnInit(): void {
    this.getTrainers();
  }
  getTrainers(): void {
    this.trainerService.getTrainers().subscribe({
      next: (response) => {
        console.log('Trainers fetched successfully', response);
        this.trainers = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

    // this.trainerService.getTrainers().subscribe((trainers) => {
    //   this.trainers = trainers.filter(trainer => trainer.role === 1); // Filter for role number 1
    //   console.log(this.trainers);
    // });
  }
  selectTrainer(trainerId: number): void {
    this.selectedTrainerId = trainerId;
    console.log(this.selectedTrainerId);
  }

  isSelected(trainerId: number): boolean {
    return this.selectedTrainerId === trainerId;
  }
  NavigateToCreateTrainer(): void {
    this.selectedTrainerId = null;
    this.router.navigate(['/create-trainer']);
  }
  addTrainer(): void {
    // Implementation for adding a trainer
  }
  
  updateTrainer(): void {
    if (this.selectedTrainerId) {
      console.log(this.selectedTrainerId);
    }
  }
  
  deleteTrainer(): void {
    if (this.selectedTrainerId) {
      this.trainerService.deleteTrainer(this.selectedTrainerId).subscribe({
        next: (response) => {
          console.log('Trainer deleted successfully', response);
          this.trainers = this.trainers.filter(trainer => trainer.id !== this.selectedTrainerId);
          this.selectedTrainerId = null;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
      
    }
  }
}
