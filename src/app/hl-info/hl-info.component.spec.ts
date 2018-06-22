import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlInfoComponent } from './hl-info.component';

describe('HlInfoComponent', () => {
  let component: HlInfoComponent;
  let fixture: ComponentFixture<HlInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
