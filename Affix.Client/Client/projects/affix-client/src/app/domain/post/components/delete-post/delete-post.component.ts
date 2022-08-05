import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { DeletePostConfirmationComponent } from './delete-post-confirmation/delete-post-confirmation.component';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html'
})
export class DeletePostComponent {

  constructor (private router: Router, private postService: PostService,
    public dialog: MatDialog) {
    this.postService.getAllPosts()
    .subscribe((p : { item1: PostModel[], item2: number }) => {
      this.posts = [...p.item1];
    });
  }

  public posts: PostModel[];

  public navigateBack() {
    this.router.navigate(['/admin']);
  }

  deletePost(moniker: string) {
    this.postService.deletePost(moniker);
    this.posts = this.posts.filter(p => p.moniker !== moniker);
  }

  openDialog(moniker: string): void {
    const dialogRef = this.dialog.open(DeletePostConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(moniker);
      }
    });
  }

}