import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineViewComponent } from './headline-view.component';

describe('HeadlineViewComponent', () => {
  let component: HeadlineViewComponent;
  let fixture: ComponentFixture<HeadlineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadlineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
