import MessageItem from './MessageItem';
import { forwardRef } from 'react';

export const MessagesList = forwardRef(
  ({ myUuid, messages, handleDeleteMessage, handleUpdateMessage }, ref) => {
    return (
      <div
        ref={ref}
        className={'messages_wrapper'}
      >
        <div className={'messages'}>
          {messages.length !== 0 &&
            messages.map((message) => (
              <MessageItem
                myUuid={myUuid}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
                handleUpdateMessage={handleUpdateMessage}
                key={message.uuid}
              />
            ))}
          {messages.length === 0 && (
            <h3 className={'room-text'}>No messages</h3>
          )}
        </div>
      </div>
    );
  }
);
MessagesList.displayName = 'messages';
