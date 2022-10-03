import MessageItem from './messageItem/MessageItem';
import { forwardRef } from 'react';

export const MessagesList = forwardRef(
  ({ userUuid, messages, handleDeleteMessage, handleUpdateMessage, searchMessageActive, handleReplyMessage, messageFilter },
    ref) => {
    return (
      <div
        ref={ref}
        className={`messages_wrapper ${searchMessageActive ? 'messages_search-active' : ''}`}
      >
        <div className={'messages'}>
          {messages.length !== 0 &&
            messages.map((message) => (
              <MessageItem
                userUuid={userUuid}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
                handleUpdateMessage={handleUpdateMessage}
                searchMessageActive={searchMessageActive}
                key={message.uuid}
                messages={messages}
                handleReplyMessage={handleReplyMessage}
                messageFilter={messageFilter}
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
