import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { Training } from '../models/training.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings: Training[] = [];
  constructor(private router: Router, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings;
    });
  }
  navigateToTrainingDetails(trainingId: number): void {
    this.router.navigate(['/training-details', trainingId]);
  }
  navigateToHomepage(): void {
    this.router.navigate(['/member-homepage']);
  }
  navigateToPersonelManagement(): void {
    this.router.navigate(['/personel-management']);
  }
  navigateToTrainings(): void {
    this.router.navigate(['/trainings']);
  }
}
