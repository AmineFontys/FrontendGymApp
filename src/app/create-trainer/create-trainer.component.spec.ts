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
      declarations: [ CreateTrainerComponent ],
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
  it('should call createTrainer on valid form submission', () => {
    mockTrainerService.createTrainer.and.returnValue(of({id: '123', name: 'John Doe'}));
    component.User.setValue({
      firstName: 'John',
      surName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      birthDate: '1990-01-01',
      isMale: true,
      role: 1
    });
  
    component.onSubmit();
  
    expect(mockTrainerService.createTrainer).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      firstName: 'John',
      email: 'john.doe@example.com'
    }));
  });
  it('should navigate to trainer view on successful creation', () => {
    mockTrainerService.createTrainer.and.returnValue(of({}));
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/trainer']);
  });
  it('should handle errors if creation fails', () => {
    mockTrainerService.createTrainer.and.returnValue(throwError({status: 500}));
    component.onSubmit();
    expect(component.errorMessage).toEqual('Failed to create trainer due to server error');
  });
        
});

