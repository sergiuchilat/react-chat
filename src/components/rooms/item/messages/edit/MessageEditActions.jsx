import attachment from '../../../../../assets/img/icons/attachment.png';
import send from '../../../../../assets/img/icons/send.png';
import { useState } from 'react';
import smile from '../../../../../assets/img/icons/smile.png';
import bin from '../../../../../assets/img/icons/rubbish-bin.png';
import Picker from 'emoji-picker-react';
export default function MessageEditActions({
  handleUpdateMessage,
  selectEmoji,
  updatingMessage,
  handleDeleteMessage,
}) {
  const [emojiDialogVisible, setEmojiDialogVisible] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    selectEmoji(emojiObject.emoji);
  };
  return (
    <>
      <button
        onClick={() => setEmojiDialogVisible((emojiDialog) => !emojiDialog)}
        className={`send-message ${emojiDialogVisible ? 'emoji-dialog' : ''}`}
      >
        <img
          width={25}
          height={25}
          src={smile}
          alt={'Emoji'}
        />
      </button>
      {emojiDialogVisible && (
        <Picker
          preload
          disableSearchBar
          onEmojiClick={onEmojiClick}
        />
      )}
      <button className={'send-message'}>
        <img
          width={25}
          height={25}
          src={attachment}
          alt={'attachment'}
        />
      </button>
      {updatingMessage.text.length !== 0 && (
        <button
          onClick={() => handleUpdateMessage(updatingMessage.uuid)}
          className={'send-message'}
        >
          <img
            width={25}
            height={25}
            src={send}
            alt={'Send'}
          />
        </button>
      )}
      {updatingMessage.text.length === 0 && (
        <button
          onClick={() => handleDeleteMessage(updatingMessage.uuid)}
          className={'send-message'}
        >
          <img
            width={25}
            height={25}
            src={bin}
            alt={'delete'}
          />
        </button>
      )}
    </>
  );
}
