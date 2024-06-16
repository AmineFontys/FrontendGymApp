import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTrainerComponent } from './create-trainer.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrainerService } from '../services/trainer.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CreateTrainerComponent', () => {
  let component: CreateTrainerComponent;
  let fixture: ComponentFixture<CreateTrainerComponent>;
  let mockTrainerService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockTrainerService = jasmine.createSpyObj('TrainerService', ['createTrainer']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CreateTrainerComponent],
      providers: [
        { provide: TrainerService, useValue: mockTrainerService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form fields validation', () => {
    const fields = {
      firstName: ['', 'John123'],  
      surName: ['', 'Doe!'],       
      email: ['', 'test@test', 'test@test.com'], 
      phoneNumber: ['12345', '123-456-7890'], 
      birthDate: ['2050-01-01', '1990-01-01'],
      isMale: ['maybe', true], 
      role: [999, 1]
    };

    
  });
  it('PhoneNumber should be exactly 10 digits', () => {
    let phoneNumber = component.User.controls['phoneNumber'];
    phoneNumber.setValue('1234567890');  // Geldig formaat
    expect(phoneNumber.valid).toBeTruthy();
  
    phoneNumber.setValue('12345');  // Ongeldig formaat
    expect(phoneNumber.valid).toBeFalsy();
  });
  
  it('FirstName should not contain numbers', () => {
    let firstName = component.User.controls['firstName'];
    firstName.setValue('John');  // Geldig
    expect(firstName.valid).toBeTruthy();
  
    firstName.setValue('John123');  // Ongeldig
    expect(firstName.valid).toBeFalsy();
  });

  it('should invalidate firstName with numbers', () => {
    const firstName = component.User.controls['firstName'];
    firstName.setValue('John123');
    expect(firstName.valid).toBeFalse();
  });

  it('should validate correct firstName', () => {
    const firstName = component.User.controls['firstName'];
    firstName.setValue('John');
    expect(firstName.valid).toBeTrue();
  });
  it('should call createTrainer on valid form submission', () => {
    component.User.setValue({
      firstName: 'John',
      surName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      isMale: true,
      role: 1
    });

    mockTrainerService.createTrainer.and.returnValue(of({}));
    component.onSubmit();
  
    expect(mockTrainerService.createTrainer).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      firstName: 'John',
      email: 'john.doe@example.com'
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/trainer']);
  });

  it('should handle errors if creation fails', () => {
    mockTrainerService.createTrainer.and.returnValue(throwError({status: 500}));
    component.onSubmit();
    expect(component.errorMessage).toEqual('Failed to create trainer due to server error');
  });
  it('FirstName and SurName should not be empty', () => {
    const firstName = component.User.controls['firstName'];
    const surName = component.User.controls['surName'];
    firstName.setValue('');
    surName.setValue('');
    expect(firstName.valid).toBeFalse();
    expect(surName.valid).toBeFalse();
  });

  it('FirstName and SurName should contain only valid characters', () => {
    const firstName = component.User.controls['firstName'];
    const surName = component.User.controls['surName'];
    firstName.setValue('John!');
    surName.setValue('Doe@');
    expect(firstName.valid).toBeFalse();
    expect(surName.valid).toBeFalse();
  });

  it('Birthdate should be a valid past date', () => {
    const birthDate = component.User.controls['birthDate'];
    birthDate.setValue('2050-01-01');
    expect(birthDate.valid).toBeFalse();

    birthDate.setValue('1990-01-01');
    expect(birthDate.valid).toBeTrue();
  });

  it('PhoneNumber should match a valid phone number format', () => {
    const phoneNumber = component.User.controls['phoneNumber'];
    phoneNumber.setValue('12345');
    expect(phoneNumber.valid).toBeFalse();

    phoneNumber.setValue('1234567890'); 
    expect(phoneNumber.valid).toBeTrue();
  });

  it('should require email field', () => {
    let email = component.User.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalsy();
  });
  
  it('should require valid email format', () => {
    let email = component.User.controls['email'];
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  
});

