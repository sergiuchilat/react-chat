import MessageCreateActions from './MessageCreateActions';
import { forwardRef } from 'react';

export const MessageCreate = forwardRef(({ message, handleChangeMessage, handleSubmitMessage, setEmoji }, ref) => {
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
      <MessageCreateActions
        handleSubmitMessage={handleSubmitMessage}
        setEmoji={setEmoji}
      />
    </div>
  );
});

MessageCreate.displayName = 'messageCreate';
