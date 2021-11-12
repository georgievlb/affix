import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostModel } from '../../domain/post/models/post.model';
import { PostService } from '../../domain/post/services/post.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, AfterViewInit {

  public readonly numberOfItemsPerPage = 5;
  public currentSetOfPostCards$: Observable<PostModel[]>;
  public postsCount$: Observable<number>;
  public currentPageIndex: number;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.currentSetOfPostCards$ = this.postService.getNextPostCardsPage();
    this.postsCount$ = this.postService.getPostsCount();
    const routeParam: any = this.route.snapshot.paramMap.get('number');
    this.currentPageIndex = Number.parseInt(routeParam);

    if (this.currentPageIndex > 0) {
      this.navigateToPage();
      this.router.navigate(['/page/' + this.currentPageIndex]);
    }
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = this.currentPageIndex,
      this.paginator.page.next({
        pageIndex: this.currentPageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }


  // TODO: fix the following issues
  // 1. Navigate pages using 1-based index
  // 2. When navigating on home page, don't route /page/NaN
  // 3. When navigating from /page/2 to /page/1 no content is loaded
  onPageChanged(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.navigateToPage();
  }

  navigateToPage() {
    this.currentSetOfPostCards$ = this.postService.getNextPostCardsPage(this.numberOfItemsPerPage * this.currentPageIndex, this.numberOfItemsPerPage);
    this.router.navigate(['/page/' + this.currentPageIndex]);
  }

}
