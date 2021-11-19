import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { CreatePostComponent } from './domain/post/components/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/components/view-post-details/view-post-details.component';
import { AuthorizeGuard } from "../api-authorization/authorize.guard";
import { ViewAdminPageComponent } from './domain/admin/view-admin-page/view-admin-page.component';
import { PreviewPostCardComponent } from './domain/post/components/preview-post-card/preview-post-card.component';
import { PreviewPostDetailsComponent } from './domain/post/components/preview-post-details/preview-post-details.component';
import { UpdatePostComponent } from './domain/post/components/update-post/update-post.component';
import { DeletePostComponent } from './domain/post/components/delete-post/delete-post.component';

const routes: Routes = [
  { path: 'admin/post/create', component: CreatePostComponent, canActivate: [AuthorizeGuard] },
  { path: 'admin/post/edit', component: UpdatePostComponent, canActivate: [AuthorizeGuard] },
  { path: 'admin/post/edit/:moniker', component: CreatePostComponent, canActivate: [AuthorizeGuard] },
  { path: 'admin/post/delete', component: DeletePostComponent, canActivate: [AuthorizeGuard] },
  { path: 'posts/:moniker', component: ViewPostDetailsComponent },
  { path: 'admin/post/preview/:moniker', component: PreviewPostCardComponent, canActivate: [AuthorizeGuard] },
  { path: 'admin/post/preview/details/:moniker', component: PreviewPostDetailsComponent, canActivate: [AuthorizeGuard] },
  { path: 'page/:number', component: MainContentComponent },
  { path: 'admin', component: ViewAdminPageComponent, canActivate: [AuthorizeGuard] },
  { path: 'admin/post/draft', component: UpdatePostComponent, canActivate: [AuthorizeGuard] },
  { path: '', component: MainContentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
