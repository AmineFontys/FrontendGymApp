import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelManagementComponent } from './personel-management.component';

describe('PersonelManagementComponent', () => {
  let component: PersonelManagementComponent;
  let fixture: ComponentFixture<PersonelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonelManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
