import Picker from 'emoji-picker-react';
import smile from '../../../../assets/img/icons/smile.png';
import attachment from '../../../../assets/img/icons/attachment.png';
import send from '../../../../assets/img/icons/send.png';
import { useState } from 'react';
import bin from '../../../../assets/img/icons/rubbish-bin.png';

export default function MessageActions({
  handleUpdateMessage,
  selectEmoji,
  updatingMessage,
  handleDeleteMessage,
  handleSubmitMessage,
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
      {Object.keys(updatingMessage).length === 0 && <button
        onClick={() => handleSubmitMessage()}
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={send}
          alt={'Send'}
        />
      </button>}
      {Object.keys(updatingMessage).length !== 0 && <>
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
          </button>)}
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
      </>}
    </>
  );
}
