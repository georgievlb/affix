import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostModel } from '../../domain/post/models/post.model';
import { PostService } from '../../domain/post/services/post.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  public readonly numberOfItemsPerPage = 5;
  public currentSetOfPostCards$: Observable<PostModel[]>;
  public postsCount$: Observable<number>;
  public currentPageIndex: number;
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.currentSetOfPostCards$ = this.postService.getNextPostCardsPage();
    this.postsCount$ = this.postService.getPostsCount();
    const routeParam: any = this.route.snapshot.paramMap.get('number');
    this.currentPageIndex = Number.parseInt(routeParam) ? Number.parseInt(routeParam) : 0;

    if (this.currentPageIndex !== 0) {
      this.navigateToPage();
      this.router.navigate(['/home/page/' + this.currentPageIndex]);
    }
  }

  // TODO: fix the following issues
  // 1. Navigate pages using 1-based index
  onPageChanged(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.navigateToPage();
  }

  navigateToPage() {
    this.currentSetOfPostCards$ = this.postService.getNextPostCardsPage(this.numberOfItemsPerPage * this.currentPageIndex, this.numberOfItemsPerPage);
    this.router.navigate(['/home/page/' + this.currentPageIndex]);
  }
}
