import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin-menu',
  templateUrl: './signin-menu.component.html',
  styleUrls: ['./signin-menu.component.scss']
})
export class SigninMenuComponent {

  @Input()
  public isAuthenticated = false;

  constructor(private authService: AuthService) { }

  public login = () => {
    this.authService.login();
  }

  public logout = () => {
    this.authService.logout();
  }

}
