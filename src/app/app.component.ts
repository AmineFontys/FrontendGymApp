import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendGymApp'
  showNavbar = false;

  constructor(private router: Router) {
    // Listen to router events
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide Navbar in first page route, show in others
        this.showNavbar = !event.urlAfterRedirects.startsWith('/login');
      }
    });
  }
}
