import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostModel } from '../../post/models/post.model';

const Posts: PostModel[] = [
  new PostModel('', new Date(), '', '', '', false, '', "", "", 0, '', '')
];

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly searchPosts$$: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>(Posts);
  private readonly postsUrl = `https://${environment.apiUrl}:${environment.port}/search?`;
  
  constructor(private httpClient: HttpClient) { }

    getSearchPosts(keywords: string): Observable<PostModel[]> {
      if(keywords.length > 2) {

        this.httpClient.get<PostModel[]>(`${this.postsUrl}${this.formatQueryString(keywords)}`)
        .subscribe((posts: PostModel[]) => {
          this.searchPosts$$.next(posts);
        });
        
      } else if (!keywords) {
        this.searchPosts$$.next(Posts);
      }
        return this.searchPosts$$.asObservable();
    }

    //#region Behaviour Subjects

    setSearchPosts(posts: PostModel[]): void {
      this.searchPosts$$.next(posts);
    }

    //#endregion

    private formatQueryString(keywords: string) {
      return keywords
      .split(' ')
      .map((k: string) => `keywords=${k.toLowerCase()}`)
      .join('&');
    }
}