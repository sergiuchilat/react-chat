import MessageItem from './MessageItem';

export default function MessagesList({ messages }){

  return (
    <div className={'messages'}>
      {
        messages.length !== 0 && messages.map(message => (
          <MessageItem
            message={message.text}
            senderId={message.sender_id}
            key={message.id}
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
