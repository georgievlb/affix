import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from './domain/post/view-post/view-post.component';

const routes: Routes = [
  { path : 'view-post', component: ViewPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
