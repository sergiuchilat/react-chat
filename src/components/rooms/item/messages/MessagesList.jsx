import MessageItem from './MessageItem';

export default function MessagesList({ messages }){

  return (
    <div>
      {
        messages && messages.map(message => (
          <MessageItem
            message={message.text}
            key={message.id}
          />
        ))
      }
    </div>
  );
}
