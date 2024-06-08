import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personel-management',
  standalone: true,
  imports: [],
  templateUrl: './personel-management.component.html',
  styleUrl: './personel-management.component.css'
})
export class PersonelManagementComponent {

  constructor(private router: Router) { }

  navigateToTrainerManagement(): void {
    this.router.navigate(['/trainer']);
  }

}
