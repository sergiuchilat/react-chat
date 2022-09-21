import MessageActions from './MessageActions';
import { forwardRef } from 'react';

export const MessageCreate = forwardRef(
  ({
    message,
    handleChangeMessage,
    handleSubmitMessage,
    selectEmoji,
    handleUpdateMessage,
    updatingMessage,
    handleDeleteMessage }, ref) => {
    return (
      <div className={'message-create'}>
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
    );
  }
);

MessageCreate.displayName = 'messageCreate';
