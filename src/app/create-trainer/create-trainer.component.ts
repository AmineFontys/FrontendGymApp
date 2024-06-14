import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private trainerservice: TrainerService, private router: Router) {}

  ngOnInit(): void {
    this.User = this.fb.group({
      firstName: [''],
      surName: [''],
      email: ['', [Validators.required, Validators.email]], 
    phoneNumber: [''],
    birthDate: ['', [this.pastDateValidator]],
      isMale: true, 
      role: [1] 
    });
  }

  onSubmit(): void {
    const formValue = {
      ...this.User.value,
      isMale: this.User.value.isMale === 'true', 
    };

    console.log(formValue);
    this.createTrainer(formValue);
  }
  pastDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const birthDate = new Date(control.value);
  
    if (birthDate >= today) {
      return { 'pastDate': true }; 
    }
    return null; 
  }
  createTrainer(formValue: any): void {
    this.trainerservice.createTrainer(formValue).subscribe({
      next: (response) => {
        console.log('Trainer created successfully', response);
        this.router.navigate(['/trainer']); 
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to create trainer due to server error'; 
      }
    });
  }

}
