import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component';
import { SigninMenuComponent } from './components/signin-menu/signin-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SigninCallbackComponent,
    SignoutCallbackComponent,
    SigninMenuComponent
  ],
  exports: [
    SigninCallbackComponent,
    SignoutCallbackComponent,
    SigninMenuComponent
  ]
})
export class AuthModule { }
