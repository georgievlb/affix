import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectCardsComponent } from './view-project-cards.component';

describe('ViewProjectCardsComponent', () => {
  let component: ViewProjectCardsComponent;
  let fixture: ComponentFixture<ViewProjectCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
