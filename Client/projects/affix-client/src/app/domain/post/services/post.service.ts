import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PostModel } from '../models/post.model';
import { environment } from "../../../../environments/environment";

const Posts: PostModel[] = [
  new PostModel('', new Date(), '', '', '', false, '', "", "", 0, '', '', '', '')
];

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {

  private readonly subscription: Subscription = new Subscription();
  private readonly post$$: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(Posts[0]);
  private readonly posts$$: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>(Posts);
  private readonly editPost$$: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(Posts[0]);
  private readonly editPosts$$: BehaviorSubject<{item1: PostModel[], item2: number}> = new BehaviorSubject<{item1: PostModel[], item2: number}>({item1: Posts, item2: 0});
  private readonly draftPosts$$: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>(Posts);
  private readonly postsCount$$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private readonly currentPageIndex$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly postPreview$$: BehaviorSubject<PostModel> = new BehaviorSubject<PostModel>(Posts[0]);
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


  //#region CRUD methods

  getPost(moniker: string): Observable<PostModel> {
    this.httpClient.get<PostModel>(`https://${environment.apiUrl}:${environment.port}/posts/${moniker}`)
      .subscribe((p: PostModel) => {
        p.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${p.imageId}`;
        this.post$$.next(p);
      });

    return this.post$$.asObservable();
  }

  getAllPosts(): Observable<{item1: PostModel[], item2: number}> {
    this.httpClient.get<{item1: PostModel[], item2: number}>(this.postsUrl)
      .subscribe((p: {item1: PostModel[], item2: number}) => {
        this.editPosts$$.next(p);
      });

    return this.editPosts$$.asObservable();
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

  getDraftPosts(): Observable<PostModel[]> {
    this.httpClient.get<PostModel[]>(`${this.postsUrl}/draft`)
      .subscribe((posts: PostModel[]) => {
        this.draftPosts$$.next(posts);
      });

      return this.draftPosts$$.asObservable();
  }

  putImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    return this.httpClient.put(`https://${environment.apiUrl}:${environment.port}/posts/image`, formData);
  }

  putPost(body: PostModel): Observable<PostModel> {
    return this.httpClient.put<PostModel>(`https://${environment.apiUrl}:${environment.port}/posts`, body);
  }

  deletePost(moniker: string): void {
    this.httpClient.delete<string>(`https://${environment.apiUrl}:${environment.port}/posts?moniker=${moniker}`)
    .subscribe((result: string) => console.log(result))
  }

  //#endregion


  //#region Observables

  getEditPost(): Observable<PostModel> {
    return this.editPost$$.asObservable();
  }

  getCurrentPageIndex(): Observable<number> {
    return this.currentPageIndex$$.asObservable();
  }

  getPostPreview(): Observable<PostModel> {
    return this.postPreview$$.asObservable();
  }

  getPostsCount() {
    return this.postsCount$$.asObservable();
  }

  getEmptyPostModel(): PostModel {
    return new PostModel('', new Date(), '', '', '', false, '', '', '', 0, '', '', '', '')
  }

  //#endregion

  //#region Behaviour Subjects

  setEditPost(post: PostModel): void {
    this.editPost$$.next(post);
  }

  setCurrentPageIndex(pageIndex: number): void {
    this.currentPageIndex$$.next(pageIndex);
  }

  setPostPreview(postCard: PostModel): void {
    this.postPreview$$.next(postCard);
  }

  //#endregion

  //#region Lifecycle hooks

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.posts$$.unsubscribe();
    this.postsCount$$.unsubscribe();
  }

  //#endregion
}
