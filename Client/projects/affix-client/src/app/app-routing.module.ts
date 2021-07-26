import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { CreatePostComponent } from './domain/post/create-post/create-post.component';
import { ViewPostDetailsComponent } from './domain/post/view-post-details/view-post-details.component';
import { AuthorizeGuard } from "../api-authorization/authorize.guard";

const routes: Routes = [
  { path: 'posts/create', component: CreatePostComponent, canActivate: [AuthorizeGuard] },
  { path: 'posts/:id', component: ViewPostDetailsComponent },
  { path: '', component: MainContentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
