import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false; // Set to true if user is logged in
  dropdownVisible: boolean = false; // To toggle dropdown visibility
  loggedInUsername: string | null = null;
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }


  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.dropdownVisible = false;
    this.navigateTo('/auth');
  }
    navigateTo(page: string): void {
    this.router.navigate([page]);

  }
}
