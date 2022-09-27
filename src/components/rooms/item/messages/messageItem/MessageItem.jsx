import { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ForeignMessage from './ForeignMessage';

export default function MessageItemWrapper({
  userUuid,
  message,
  handleDeleteMessage,
  handleUpdateMessage,
  searchMessageActive,
  messages,
  handleReplyMessage
}) {
  const [isHover, setIsHover] = useState(false);
  const messageItem = useRef();
  const [showAvatar, setShowAvatar] = useState(false);
  const [parentMessage, setParentMessage] = useState({});
  const handleMouseEnter = () => {
    if(!searchMessageActive){
      setIsHover(true);
    }
  };
  const createdAt = new Date(Number(`${message.created_at}000`));
  const handleMouseLeave = () => {
    if(!searchMessageActive){
      setIsHover(false);
    }
  };

  const setAvatar = () => {
    if(messageItem.current){
      if(messageItem.current.nextSibling){
        return !(messageItem.current.nextSibling.classList[0] === messageItem.current.classList[0]);
      } else {
        return true;
      }
    }
  };
  const findParentMessage = () => {
    if(message.parent_uuid) {
      setParentMessage(messages.find(item => item.uuid === message.parent_uuid));
    }
  };
  useEffect(() => {
    setShowAvatar(setAvatar());
    findParentMessage();
  }, [messages]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${message.sender_uuid !== userUuid ? 'foreign-message' : 'my-message'} ${!showAvatar ? 'without-avatar' : ''} ${!message.is_read ? 'unread': ''}`}
      ref={messageItem}
    >
      {message.sender_uuid !== userUuid && (
        <ForeignMessage
          isHover={isHover}
          showAvatar={showAvatar}
          message={message}
          createdAt={createdAt}
          handleReplyMessage={handleReplyMessage}
          parentMessage={parentMessage}
        />
      )}
      {message.sender_uuid === userUuid && (
        <UserMessage
          isHover={isHover}
          handleDeleteMessage={handleDeleteMessage}
          handleUpdateMessage={handleUpdateMessage}
          createdAt={createdAt}
          showAvatar={showAvatar}
          message={message}
          searchMessageActive={searchMessageActive}
          parentMessage={parentMessage}
        />
      )}
    </div>
  );
}
