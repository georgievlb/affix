import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/domain/post/models/post.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  public posts: PostModel[] = [
    new PostModel('', new Date(), '', '', '', false, '', "", "", 0, '', '')
  ];
  constructor(private searchService: SearchService, private router: Router) { }

  onSearchPost(event: any) {
    this.searchService.getSearchPosts(event.target.value)
    .subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  }

  onPostClicked(moniker: string) {
    // TODO: Optimize logic so that it doesn't reload the page if the user searches for the same post again.
    this.router.navigate([`/posts/${moniker}`]);
  }

  ngOnInit(): void {
  }
}
