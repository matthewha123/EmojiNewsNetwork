import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmojiPickerComponent } from './new-emoji-picker.component';

describe('NewEmojiPickerComponent', () => {
  let component: NewEmojiPickerComponent;
  let fixture: ComponentFixture<NewEmojiPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmojiPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmojiPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
