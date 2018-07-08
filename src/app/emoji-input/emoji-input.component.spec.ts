import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiInputComponent } from './emoji-input.component';

describe('EmojiInputComponent', () => {
  let component: EmojiInputComponent;
  let fixture: ComponentFixture<EmojiInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
