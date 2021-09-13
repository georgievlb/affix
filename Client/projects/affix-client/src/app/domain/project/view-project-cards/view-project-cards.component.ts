import { Component, OnInit } from '@angular/core';
import { ProjectCardModel } from '../models/project-card.model';

@Component({
  selector: 'app-view-project-cards',
  templateUrl: './view-project-cards.component.html',
  styleUrls: ['./view-project-cards.component.scss']
})
export class ViewProjectCardsComponent implements OnInit {

  public currentSetOfProjectCards: ProjectCardModel[] = [
    {
      id: 'MyId',
      header: 'My Header',
      title: 'My Title',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId',
      header: 'My Header',
      title: 'My Title',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId',
      header: 'My Header',
      title: 'My Title',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId',
      header: 'My Header',
      title: 'My Title',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
