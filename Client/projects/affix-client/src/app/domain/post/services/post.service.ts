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
    summary: "My Summary",
    moniker: 'my-moniker',
    imageId: 'my-image-id',
    imageSrc: '',
    index: 0,
    imageAltText: 'My Image Alt Text'
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
        postCards.item1.map((p: PostCardModel) => {
          p.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${p.imageId}`;
          p.index = postCards.item1.indexOf(p);
          console.log('ImageAltText:', p.imageAltText);
        });
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
