import avatar from '../../../../assets/img/icons/avatar.png';
import pen from '../../../../assets/img/icons/pen.png';
import bin from '../../../../assets/img/icons/rubbish-bin.png';
import { useState } from 'react';
import Moment from 'react-moment';

export default function MessageItem({
  userUuid,
  message,
  handleDeleteMessage,
  handleUpdateMessage,
}) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const createdAt = new Date(Number(`${message.created_at}000`));
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {message.sender_uuid !== userUuid && (
        <div className={'messages-wrapper'}>
          <div className={'message-item-inner'}>
            <img
              height={25}
              width={25}
              src={avatar}
              alt={'avatar'}
            />
            <div className={'message-item'}>
              {message.text}
              <Moment
                format={'HH:mm'}
                className={'message-date'}
              >
                {createdAt}
              </Moment>
            </div>
          </div>
        </div>
      )}
      {message.sender_uuid === userUuid && (
        <div className={`messages-wrapper ${!isHover ? 'flex-end' : ''}`}>
          {isHover && (
            <div className={'messages-item-actions'}>
              <button onClick={() => handleUpdateMessage(message)}>
                <img
                  src={pen}
                  alt={'pen'}
                />
              </button>
              <button onClick={() => handleDeleteMessage(message.uuid)}>
                <img
                  src={bin}
                  alt={'bin'}
                />
              </button>
            </div>
          )}
          <div
            className={`message-item-inner my-message-item-inner 
            ${isHover ? 'messages-hover' : ''}`}
          >
            <div className={'message-item my-message-item'}>
              <Moment
                format={'HH:mm'}
                className={'message-date'}
              >
                {createdAt}
              </Moment>
              {message.text}
            </div>
            <img
              height={25}
              width={25}
              src={avatar}
              alt={'avatar'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
