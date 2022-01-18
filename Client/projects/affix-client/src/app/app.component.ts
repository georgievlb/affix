import { Component } from '@angular/core';
import { IDTokenClaims } from 'oidc-client';
import { Subscription } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    'header { background-color: white; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .2) }'
  ]
})
export class AppComponent {

  private readonly subscription: Subscription = new Subscription();
  public isUserLoggedIn = false;
  public userName: string | undefined;
  public userRole: string | null;

  constructor(private authService: AuthorizeService) {
    this.subscription.add(this.authService
      .isAuthenticated()
      .subscribe(isUserLoggedIn => {
        this.isUserLoggedIn = isUserLoggedIn;
      })
    );

    this.subscription.add(this.authService
      .getUser()
      .subscribe(user => {
        this.userName = user?.name;
      }));

    this.subscription.add(this.authService
      .getUserClaims()
      .subscribe((claims: IDTokenClaims | null) => {
        this.userRole = claims ? claims['role'] : '';
      }));
  };

}
