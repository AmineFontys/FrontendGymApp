import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



constructor(private router: Router) { }
navigateToChat(): void {
  this.router.navigate(['/chat']);
}
navigateToTrainerHomepage(): void {
  this.router.navigate(['/trainer-homepage']);


}
}
