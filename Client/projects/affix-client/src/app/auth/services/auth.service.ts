import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: 'https://localhost:5001/',
      client_id: 'affix_client_spa2',
      redirect_uri: 'https://localhost:6002/signin-callback',
      post_logout_redirect_uri: 'https://localhost:6002/signout-callback',
      response_type: "code",
      scope: "openid profile AffixAPI"
    };

  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.checkUser(user));
        }
        this._user = user;

        return this.checkUser(user);
      })
  }

  private checkUser = (user: User | null): boolean => {
    return !!user && !user.expired;
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        this._loginChangedSubject.next(this.checkUser(user));
        return user;
      })
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }
  public finishLogout = () => {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  public getAccessToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then(user => {
         return !!user && !user.expired ? user.access_token : null;
    })
  }

}
