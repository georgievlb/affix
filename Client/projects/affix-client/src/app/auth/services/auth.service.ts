import { Injectable } from '@angular/core';
import { IDTokenClaims, User, UserManager, UserManagerSettings } from 'oidc-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  private _user: User | null = null;
  private user$$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private userClaims$$: BehaviorSubject<IDTokenClaims | undefined> = new BehaviorSubject<IDTokenClaims | undefined>(undefined);
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();
  public user$ = this.user$$.asObservable();

  constructor() {
    this._userManager = new UserManager(this.idpSettings);
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: `${environment.authority}`,
      client_id: `${environment.clientId}`,
      redirect_uri: `${environment.redirect_uri}`,
      post_logout_redirect_uri: `${environment.post_logout_redirect_uri}`,
      response_type: `${environment.response_type}`,
      scope: `${environment.scope}`
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
          this.user$$.next(user);
          const claims: IDTokenClaims | undefined = user?.profile;
          this.userClaims$$.next(claims);
        }
        this._user = user;

        return this.checkUser(user);
      })
  }

  public IsAdmin(): Observable<boolean> {
    return this.getUserClaims()
      .pipe(map(claims => claims ? claims.role === 'admin': false));
  }

  public getUserClaims(): Observable<IDTokenClaims | undefined> {
    return this.userClaims$$.asObservable();
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

  // TODO: Remove because it's obsolete
  // public getAccessToken(): Observable<string | null> {
  //   return from(this.ensureUserManagerInitialized())
  //     .pipe(mergeMap(() => from(this.userManager!.getUser())),
  //       map(user => user && user.access_token));
  // }

    // TODO: Remove because it's obsolete
  // private getUserFromStorage(): Observable<IUser | null> {
  //   return from(this.ensureUserManagerInitialized())
  //     .pipe(
  //       mergeMap(() => this.userManager!.getUser()),
  //       map(u => u && u.profile));
  // }
}
