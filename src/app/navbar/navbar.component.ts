import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('collapse', [
      state('open', style({
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('open <=> closed', animate('0.5s'))
    ])
  ]
})
export class NavbarComponent {

  constructor(private router: Router) { }
  isCollapsed = true;
  userRole = localStorage.getItem('role');
  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if ((event.target as Element) && typeof (event.target as Element).closest === 'function' && !(event.target as Element).closest('.dropdown') && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation(); 
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  navigateToHomepage() {
    console.log(this.userRole);
    if (this.userRole === 'trainer') {
      this.router.navigate(['/trainer-homepage']);
    } else {
      this.router.navigate(['/member-homepage']);
    }
  }
  navigateToTrainings() {
    this.router.navigate(['/create-training']);
  }
  navigateToTrainers() {
    this.router.navigate(['/trainer']);
  }
  navigateToMembers() {
    this.router.navigate(['/members']);
  }
  navigateToPersonelManagement() {
    this.router.navigate(['/personel-management']);
  }
}