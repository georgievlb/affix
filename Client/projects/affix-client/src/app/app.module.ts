import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RenderHtmlPipe } from './pipes/render-html.pipe';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewPostCardComponent } from './domain/post/view-post-card/view-post-card.component';
import { CreatePostComponent } from './domain/post/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/view-post-details/view-post-details.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ViewAdminPageComponent } from './domain/admin/view-admin-page/view-admin-page.component';
import { PreviewPostCardComponent } from './domain/post/preview-post-card/preview-post-card.component';
import { PreviewPostDetailsComponent } from './domain/post/preview-post-details/preview-post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderHtmlPipe,
    NavMenuComponent,
    MainContentComponent,
    FooterComponent,
    ViewPostCardComponent,
    CreatePostComponent,
    ViewPostDetailsComponent,
    ViewAdminPageComponent,
    PreviewPostCardComponent,
    PreviewPostDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ApiAuthorizationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
