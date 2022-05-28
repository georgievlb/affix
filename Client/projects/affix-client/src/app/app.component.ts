import { Component, OnInit } from '@angular/core';
import { IDTokenClaims, User } from 'oidc-client';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { PostService } from './domain/post/services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    'header { background-color: white; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .2) }'
  ]
})
export class AppComponent implements OnInit {

  private readonly subscription: Subscription = new Subscription();
  public isAuthenticated = false;
  public token: string | null = '';
  public userName: string | undefined;
  public userRole: string | null;
  public user : User | null;

  constructor(private authService: AuthService, private postService: PostService) {
    const token$ = from(this.authService.getAccessToken());
    const isAuthenticated$ = from(this.authService.isAuthenticated())

    this.subscription.add(
      token$.subscribe(token => this.token = token)
    );
    this.subscription.add(
      isAuthenticated$.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
    )
    this.subscription.add(
      this.authService.user$.subscribe(user => {
        this.user = user;
        this.userRole = user?.profile.role;
      })
    );
  }

  callApi() {
    this.postService.getData().subscribe(data => console.log(data));
  }

  printUser() {
    console.log(this.user);
  }

  printToken() {
    console.log(this.token);
  }

  ngOnInit() {
      this.authService.getAccessToken()
      .then(token => this.token = token);
  }

}
