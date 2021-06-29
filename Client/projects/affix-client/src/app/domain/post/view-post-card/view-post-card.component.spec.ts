import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostCardComponent } from './view-post-card.component';

describe('ViewPostComponent', () => {
  let component: ViewPostCardComponent;
  let fixture: ComponentFixture<ViewPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
