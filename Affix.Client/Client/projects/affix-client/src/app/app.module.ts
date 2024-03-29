import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './common/material.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RenderHtmlPipe } from './domain/post/pipes/render-html.pipe';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ViewPostCardComponent } from './domain/post/components/view-post-card/view-post-card.component';
import { CreatePostComponent } from './domain/post/components/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/components/view-post-details/view-post-details.component';

import { ViewAdminPageComponent } from './domain/admin/view-admin-page/view-admin-page.component';
import { PreviewPostCardComponent } from './domain/post/components/preview-post-card/preview-post-card.component';
import { PreviewPostDetailsComponent } from './domain/post/components/preview-post-details/preview-post-details.component';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';
import { UpdatePostComponent } from './domain/post/components/update-post/update-post.component';
import { RenderMarkdownPipe } from './domain/post/pipes/render-markdown.pipe';
import { DeletePostComponent } from './domain/post/components/delete-post/delete-post.component';
import { DeletePostConfirmationComponent } from './domain/post/components/delete-post/delete-post-confirmation/delete-post-confirmation.component';
import { DisqusModule } from 'ngx-disqus';
import { SubscriptionComponent } from './domain/subscription/components/subscription/subscription.component';
import { SubscriptionDialogComponent } from './domain/subscription/components/subscription-dialog/subscription-dialog.component';
import { SubscriptionThankyouDialogComponent } from './domain/subscription/components/subscription-thankyou-dialog/subscription-thankyou-dialog.component';
import { SearchContainerComponent } from './domain/search/components/search-container/search-container.component';
import { SearchDialogComponent } from './domain/search/components/search-dialog/search-dialog.component';
import { AdminLoginComponent } from './domain/admin/admin-login/admin-login.component';
import { AdminLogoutComponent } from './domain/admin/admin-logout/admin-logout.component';

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
    DeletePostConfirmationComponent,
    SubscriptionComponent,
    SubscriptionDialogComponent,
    SubscriptionThankyouDialogComponent,
    SearchContainerComponent,
    SearchDialogComponent,
    AdminLoginComponent,
    AdminLogoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    DisqusModule.forRoot('affix-1'),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
