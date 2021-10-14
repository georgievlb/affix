import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminPageComponent } from './view-admin-page.component';

describe('ViewAdminPageComponent', () => {
  let component: ViewAdminPageComponent;
  let fixture: ComponentFixture<ViewAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
