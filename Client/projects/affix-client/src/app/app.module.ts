import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RenderHtmlPipe } from './domain/post/pipes/render-html.pipe';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ViewPostCardComponent } from './domain/post/components/view-post-card/view-post-card.component';
import { CreatePostComponent } from './domain/post/components/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/components/view-post-details/view-post-details.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ViewAdminPageComponent } from './domain/admin/view-admin-page/view-admin-page.component';
import { PreviewPostCardComponent } from './domain/post/components/preview-post-card/preview-post-card.component';
import { PreviewPostDetailsComponent } from './domain/post/components/preview-post-details/preview-post-details.component';
import { RequestInterceptor } from './common/request-interceptor';
import { UpdatePostComponent } from './domain/post/components/update-post/update-post.component';
import { RenderMarkdownPipe } from './domain/post/pipes/render-markdown.pipe';
import { DeletePostComponent } from './domain/post/components/delete-post/delete-post.component';
import { DeletePostConfirmationComponent } from './domain/post/components/delete-post/delete-post-confirmation/delete-post-confirmation.component';

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
    PreviewPostDetailsComponent,
    UpdatePostComponent,
    RenderMarkdownPipe,
    DeletePostComponent,
    DeletePostConfirmationComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
