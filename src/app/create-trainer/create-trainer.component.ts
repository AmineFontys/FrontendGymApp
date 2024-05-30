import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/trainer.model';
import { TrainerService } from '../services/trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css']
})
export class CreateTrainerComponent implements OnInit {
  User!: FormGroup;

  constructor(private fb: FormBuilder, private trainerservice: TrainerService, private router: Router) {}

  ngOnInit(): void {
    this.User = this.fb.group({
      firstName: [''],
      surName: [''],
      email: [''],
      phoneNumber: [''],
      birthDate: [''],
      isMale: true, // Default set as Male
      role: [1] // Default role
    });
  }

  onSubmit(): void {
    const formValue = {
      ...this.User.value,
      isMale: this.User.value.isMale === 'true', // Add null check
    };

    console.log(formValue);
    this.createTrainer(formValue);
  }

  createTrainer(formValue: any): void {
    this.trainerservice.createTrainer(formValue).subscribe({
      next: (response) => {
        console.log('Trainer created successfully', response);
        this.router.navigate(['/trainer']); // Navigate to the trainer view on success
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

}
