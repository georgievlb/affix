import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-logout',
  template: `
    <div>Redirecting...</div>
  `,
  styles: [
  ]
})
export class AdminLogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
