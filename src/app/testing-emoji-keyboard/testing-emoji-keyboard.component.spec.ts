import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingEmojiKeyboardComponent } from './testing-emoji-keyboard.component';

describe('TestingEmojiKeyboardComponent', () => {
  let component: TestingEmojiKeyboardComponent;
  let fixture: ComponentFixture<TestingEmojiKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingEmojiKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingEmojiKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
