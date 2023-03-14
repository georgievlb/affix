import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { CreatePostComponent } from './domain/post/components/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/components/view-post-details/view-post-details.component';
import { ViewAdminPageComponent } from './domain/admin/view-admin-page/view-admin-page.component';
import { PreviewPostCardComponent } from './domain/post/components/preview-post-card/preview-post-card.component';
import { PreviewPostDetailsComponent } from './domain/post/components/preview-post-details/preview-post-details.component';
import { UpdatePostComponent } from './domain/post/components/update-post/update-post.component';
import { DeletePostComponent } from './domain/post/components/delete-post/delete-post.component';
import { SigninCallbackComponent } from './auth/components/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './auth/components/signout-callback/signout-callback.component';
import { AdminLoginComponent } from './domain/admin/admin-login/admin-login.component';
import { AdminLogoutComponent } from './domain/admin/admin-logout/admin-logout.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'signout-callback', component: SignoutCallbackComponent },
  { path: 'admin', component: ViewAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/create', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/draft', component: UpdatePostComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/preview/:moniker', component: PreviewPostCardComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/preview/details/:moniker', component: PreviewPostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/edit', component: UpdatePostComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/edit/:moniker', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'admin/post/delete', component: DeletePostComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/logout', component: AdminLogoutComponent },
  { path: 'posts/:moniker', component: ViewPostDetailsComponent},
  { path: 'home/page/:number', component: MainContentComponent },
  { path: 'home', component: MainContentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
