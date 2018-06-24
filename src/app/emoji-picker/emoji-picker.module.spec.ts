import { EmojiPickerModule } from './emoji-picker.module';

describe('EmojiPickerModule', () => {
  let emojiPickerModule: EmojiPickerModule;

  beforeEach(() => {
    emojiPickerModule = new EmojiPickerModule();
  });

  it('should create an instance', () => {
    expect(emojiPickerModule).toBeTruthy();
  });
});
