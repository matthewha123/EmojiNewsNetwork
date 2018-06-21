import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlMovementComponent } from './hl-movement.component';

describe('HlMovementComponent', () => {
  let component: HlMovementComponent;
  let fixture: ComponentFixture<HlMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
