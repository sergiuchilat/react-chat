import MessageActions from './MessageActions';
import cancel from '../../../../assets/img/icons/cancel.svg';
import { forwardRef } from 'react';

export const MessageCreate = forwardRef(
  ({
    message,
    handleChangeMessage,
    handleSubmitMessage,
    selectEmoji,
    handleUpdateMessage,
    updatingMessage,
    handleDeleteMessage,
    replyMessage,
    handleRemoveParentMessage }, ref) => {
    return (
      <div className={'message-create'}>
        {Object.keys(replyMessage).length > 0 && <div className={'reply-message'}>
          <p>{replyMessage.text}</p>
          <button onClick={() => handleRemoveParentMessage()}>
            <img
              height={16}
              width={16}
              src={cancel}
              alt={'cancel'}
            />
          </button>
        </div>}
        <div className={'message-create-inner'}>
          <input
            ref={ref}
            placeholder={'Type your message...'}
            value={message}
            onChange={(e) => handleChangeMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitMessage()}
            className={'rooms-search-input rooms-message-input'}
            type={'text'}
          />
          <MessageActions
            handleUpdateMessage={handleUpdateMessage}
            selectEmoji={selectEmoji}
            updatingMessage={updatingMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleSubmitMessage={handleSubmitMessage}
          />
        </div>

      </div>
    );
  }
);

MessageCreate.displayName = 'messageCreate';
