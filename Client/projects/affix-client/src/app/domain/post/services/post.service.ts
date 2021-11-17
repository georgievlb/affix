import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PostModel } from '../models/post.model';
import { environment } from "../../../../environments/environment";

const PostsCards: PostModel[] = [
  new PostModel(
    '',
    new Date(),
    '',
    '',
    '',
    false,
    '',
    "",
    "",
    0,
    '',
    ''
  )
];

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {

  private readonly subscription: Subscription = new Subscription();
  private readonly post$$: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(PostsCards[0]);
  private readonly posts$$: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>(PostsCards);
  private readonly draftPosts$$: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>(PostsCards);
  private readonly postsCount$$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private readonly currentPageIndex$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly postPreview$$: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(PostsCards[0]);
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

  getNextPostCardsPage(skip: number = 0, take: number = 5): Observable<PostModel[]>{
    this.httpClient.get(`${this.postsUrl}?skip=${skip}&take=${take}`)
      .subscribe((postCards: any) => {
        postCards.item1.map((p: PostModel) => {
          p.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${p.imageId}`;
          p.index = postCards.item1.indexOf(p);
        });
        this.posts$$.next(postCards.item1);
        this.postsCount$$.next(postCards.item2);
      })

    return this.posts$$.asObservable();
  }

  getPost(moniker: string): Observable<PostModel> {
    this.httpClient.get<PostModel>(`https://${environment.apiUrl}:${environment.port}/posts/${moniker}`)
      .subscribe((p: PostModel) => {
        p.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${p.imageId}`;
        this.post$$.next(p);
      });

    return this.post$$.asObservable();
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

  getPostPreview(): Observable<PostModel> {
    return this.postPreview$$.asObservable();
  }

  setPostPreview(postCard: PostModel): void {
    this.postPreview$$.next(postCard);
  }

  getDraftPosts(): Observable<PostModel[]> {
    this.httpClient.get<PostModel[]>(`${this.postsUrl}/draft`)
      .subscribe((posts: PostModel[]) => {
        this.draftPosts$$.next(posts);
      });

      return this.draftPosts$$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.posts$$.unsubscribe();
  }

  createPost(body: PostModel): Observable<PostModel> {
    return this.httpClient.put<PostModel>(`https://${environment.apiUrl}:${environment.port}/posts`, body);
  }

  putImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return this.httpClient.put(`https://${environment.apiUrl}:${environment.port}/posts/image`, formData);
    
  }
}
