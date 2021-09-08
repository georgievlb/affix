import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostCardModel } from '../../domain/post/models/post-card.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  pageEvent: PageEvent = new PageEvent();

  public allPostCards: PostCardModel[] = [];
  public currentSetOfPostCards: PostCardModel[] = [];
  public currentPageIndex = 0;

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/posts')
      .subscribe((data: any) => {
        this.allPostCards = data;
        this.currentSetOfPostCards = this.allPostCards.slice(5 * this.currentPageIndex, 5 * this.currentPageIndex + 5);
      });
  }


  printEvent(event: any) {
    if (!this.pageEvent.pageIndex)
      this.pageEvent.pageIndex = 0;

    if (this.pageEvent.pageIndex < event.pageIndex) {
      console.log('next');
    } else {
      console.log('previous');
    }
    this.pageEvent = event;
    this.currentPageIndex = event.pageIndex;
    this.currentSetOfPostCards = this.allPostCards.slice(5 * this.currentPageIndex, 5 * this.currentPageIndex + 5);
  }

  public sampleId: string = 'MyId';
  public sampleHeader: string = 'My Header';
  public sampleTitle: string = 'My Title';
  public sampleDate: Date = new Date();
  public sampleSummary: string = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.";
  public postCardModel: PostCardModel = new PostCardModel(
    this.sampleId,
    this.sampleHeader,
    this.sampleTitle,
    this.sampleDate,
    this.sampleSummary);
}
