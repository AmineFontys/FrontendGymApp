import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  trainingForm!: FormGroup;
  trainingSchedules: any[] = []; // Placeholder for training schedules

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTrainingSchedules(); // Simulate loading from API
  }

  initializeForm(): void {
    this.trainingForm = this.fb.group({
      name: ['', Validators.required],
      trainingSchedule: [null, Validators.required],
      maxParticipants: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  loadTrainingSchedules(): void {
    // Example data or fetch from an API
    this.trainingSchedules = [
      { id: 1, name: 'Morning Yoga' },
      { id: 2, name: 'Evening Strength' }
    ];
  }

  onSubmit(): void {
    if (this.trainingForm.valid) {
      console.log(this.trainingForm.value);
      // API call to save the training
    }
  }
}
