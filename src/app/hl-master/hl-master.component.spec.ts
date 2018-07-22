import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlMasterComponent } from './hl-master.component';

describe('HlMasterComponent', () => {
  let component: HlMasterComponent;
  let fixture: ComponentFixture<HlMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
