import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PostCardModel } from '../models/post-card.model';
import { environment } from "../../../../environments/environment";

const PostsCards: PostCardModel[] = [
  {
    id: 'MyId',
    header: 'My Header',
    title: 'My Title',
    date: new Date(),
    summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

  }
];

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {

  private readonly subscription: Subscription = new Subscription();
  private readonly posts$$: BehaviorSubject<PostCardModel[]> = new BehaviorSubject<PostCardModel[]>(PostsCards);
  private readonly postsCount$$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private readonly currentPageIndex$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly postsUrl = `https://${environment.apiUrl}:${environment.port}/posts`;

  constructor(private httpClient: HttpClient) {
    this.subscription.add(
      this.httpClient.get(this.postsUrl)
        .subscribe((postCards: any) => {
          this.posts$$.next(postCards[0]);
          this.postsCount$$.next(postCards[1]);
        })
    )
  }

  getNextPostCardsPage(skip: number = 0, take: number = 5): Observable<PostCardModel[]>{
    this.httpClient.get(`${this.postsUrl}?skip=${skip}&take=${take}`)
      .subscribe((postCards: any) => {
        this.posts$$.next(postCards.item1);
        this.postsCount$$.next(postCards.item2);
      })

    return this.posts$$.asObservable();
  }

  getPostsCount() {
    return this.postsCount$$.asObservable();
  }

  setCurrentPageIndex(pageIndex: number): void {
    this.currentPageIndex$$.next(pageIndex);
  }

  getCurrentPageIndex(): Observable<number> {
    return this.currentPageIndex$$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.posts$$.unsubscribe();
  }
}
