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
      id: 'MyId0',
      header: 'My Header',
      title: 'My Title 1',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId1',
      header: 'My Header',
      title: 'My Title 2',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId2',
      header: 'My Header',
      title: 'My Title 3',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    },
    {
      id: 'MyId3',
      header: 'My Header',
      title: 'My Title 4',
      date: new Date(),
      summary: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."

    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
