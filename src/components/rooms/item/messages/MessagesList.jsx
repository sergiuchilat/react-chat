import MessageItem from './MessageItem';

export default function MessagesList({ myUuid, messages, handleDeleteMessage }){

  return (
    <div className={'messages'}>
      {
        messages.length !== 0 && messages.map(message => (
          <MessageItem
            myUuid={myUuid}
            message={message}
            handleDeleteMessage={handleDeleteMessage}
            key={message.uuid}
          />
        ))
      }
      {
        messages.length === 0 &&
          <h3 className={'room-text'}>No messages</h3>
      }
    </div>
  );
}
