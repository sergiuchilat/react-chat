import MessageEditActions from './MessageEditActions';
import { forwardRef } from 'react';
import cancel from '../../../../../assets/img/icons/cancel.png';

export const MessageEdit = forwardRef((
  { updatingMessage, handleUpdateMessage, handleChangeUpdatingMessage, handleDeleteMessage, handleCancelUpdate, setEmoji }, ref)  => {
  return (
    <div className={'message-edit'}>
      <div className={'message-edit-input'}>
        <button onClick={handleCancelUpdate}>
          <img
            src={cancel}
            alt={'cancel'}
          />
        </button>
        <input
          ref={ref}
          placeholder={'Type your message...'}
          value={updatingMessage.text}
          onChange={(e) => handleChangeUpdatingMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateMessage(updatingMessage.uuid)}
          className={'rooms-search-input rooms-message-input'}
          type={'text'}
        />
        <MessageEditActions
          handleUpdateMessage={handleUpdateMessage}
          setEmoji={setEmoji}
          updatingMessage={updatingMessage}
          handleDeleteMessage={handleDeleteMessage}
        />
      </div>
    </div>
  );
});

MessageEdit.displayName = 'messageEdit';
