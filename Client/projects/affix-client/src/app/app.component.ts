import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './models/post.model';

import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public postTitle: string = '';
  public postContent: string = '';
  public posts: any;

  fillerNav = Array.from({length: 2}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 2}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private httpClient: HttpClient) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/posts')
      .subscribe(data => {this.posts = data});
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  createPost() {
    console.log(this.postTitle, this.postContent);
    const body = { title : this.postTitle, content : this.postContent };
    this.httpClient.put('https://localhost:5001/posts', body)
      .subscribe(data => console.log(data));
  }

}
