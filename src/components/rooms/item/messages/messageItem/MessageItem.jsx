import { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ForeignMessage from './ForeignMessage';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../../../store/modules/SnackBarSlice';
import MessagesApi from '../../../../../services/api/modules/MessagesApi';

export default function MessageItemWrapper({
  userUuid, message, handleDeleteMessage, handleUpdateMessage, searchMessageActive,
  messages, handleReplyMessage, messageFilter }) {
  const [isHover, setIsHover] = useState(false);
  const messageItem = useRef();
  const [showAvatar, setShowAvatar] = useState(false);
  const [parentMessage, setParentMessage] = useState({});
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    if(!searchMessageActive){
      setIsHover(true);
    }
  };
  const handleMouseLeave = () => {
    if(!searchMessageActive){
      setIsHover(false);
    }
  };
  const createdAt = new Date(Number(`${message.created_at}000`));
  const setAvatar = () => {
    if(messageItem.current){
      if(messageItem.current.nextSibling){
        return !(messageItem.current.nextSibling.classList[0] === messageItem.current.classList[0]);
      } else {
        return true;
      }
    }
  };
  const fetchMessage = async (uuid) => {
    try {
      const response = await new MessagesApi().getItem(uuid);
      if(response.data.sender_uuid){
        return response.data;
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const findParentMessage = async () => {
    if(message.parent_uuid) {
      const parentMessage = messages.find(item => item.uuid === message.parent_uuid);
      if(parentMessage) {
        setParentMessage(parentMessage);
      } else {
        const response = await fetchMessage(message.parent_uuid);
        setParentMessage(response);
      }
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
      className={`${message.sender_uuid !== userUuid ? 'foreign-message' : 'my-message'} ${!showAvatar ? 'without-avatar' : ''} ${!message.is_read ? 'unread' : ''}`}
      ref={messageItem}
      data-id={message.uuid}
    >
      {message.sender_uuid !== userUuid && (
        <ForeignMessage
          isHover={isHover}
          showAvatar={showAvatar}
          message={message}
          createdAt={createdAt}
          handleReplyMessage={handleReplyMessage}
          parentMessage={parentMessage}
          messageFilter={messageFilter}
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
          messageFilter={messageFilter}
        />
      )}
    </div>
  );
}
