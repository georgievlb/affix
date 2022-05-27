import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-login',
  template: `
    <div>Redirecting...</div>
  `,
  styles: [
  ]
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.login();
  }

}
