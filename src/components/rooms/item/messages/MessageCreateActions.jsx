import Picker from 'emoji-picker-react';
import smile from '../../../../assets/img/icons/smile.png';
import attachment from '../../../../assets/img/icons/attachment.png';
import send from '../../../../assets/img/icons/send.png';
import { useState } from 'react';

export default function MessageCreateActions({ handleSubmitMessage, setEmoji }) {
  const [emojiDialog, setEmojiDialog] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject.emoji);
  };

  return (
    <>
      <button
        onClick={() => setEmojiDialog(emojiDialog => !emojiDialog)}
        className={`send-message ${emojiDialog ? 'emoji-dialog': ''}`}
      >
        <img
          width={25}
          height={25}
          src={smile}
          alt={'Emoji'}
        />
      </button>
      {emojiDialog && <Picker
        preload
        disableSearchBar
        onEmojiClick={onEmojiClick}
      />}
      <button className={'send-message'}>
        <img
          width={25}
          height={25}
          src={attachment}
          alt={'attachment'}
        />
      </button>
      <button
        onClick={(e) => handleSubmitMessage(e.target.value)}
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={send}
          alt={'Send'}
        />
      </button>
    </>
  );
}
