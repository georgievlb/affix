import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../domain/post/modles/post.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public posts: PostModel[] = [];

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/posts')
      .subscribe((data: any) => {
        this.posts = data });
  }

}
