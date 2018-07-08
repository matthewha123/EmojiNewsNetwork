import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsMasterComponent } from './translations-master.component';

describe('TranslationsMasterComponent', () => {
  let component: TranslationsMasterComponent;
  let fixture: ComponentFixture<TranslationsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
