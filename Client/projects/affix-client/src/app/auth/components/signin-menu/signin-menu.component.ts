import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin-menu',
  templateUrl: './signin-menu.component.html',
  styleUrls: ['./signin-menu.component.scss']
})
export class SigninMenuComponent implements OnInit {
  public isUserAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loginChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  public login = () => {
    this.authService.login();
  }

  public logout = () => {
    this.authService.logout();
  }

}
