import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostCardModel } from '../../domain/post/models/post-card.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public postCards: PostCardModel[] = [];

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/posts')
      .subscribe((data: any) => this.postCards = data);
  }

  public sampleId: string = 'MyId';
  public sampleHeader: string = 'My Header';
  public sampleTitle: string = 'My Title';
  public sampleSubtitle: string = 'My Subtitle';
  public sampleContent: string = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.";
  public postCardModel: PostCardModel = new PostCardModel(
    this.sampleId,
    this.sampleHeader,
    this.sampleTitle,
    this.sampleSubtitle,
    this.sampleContent);
}
