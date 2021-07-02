import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { CreatePostComponent } from './domain/post/create-post/create-post.component';

const routes: Routes = [
  { path: 'post/create', component: CreatePostComponent },
  { path: '', component: MainContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
