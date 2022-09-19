import avatar from '../../../../assets/img/icons/avatar.png';
import pen from '../../../../assets/img/icons/pen.png';
import bin from '../../../../assets/img/icons/rubbish-bin.png';
import { useState } from 'react';

export default function MessageItem({
  myUuid,
  message,
  handleDeleteMessage,
  handleUpdateMessage,
}) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const padTo2Digits = (num) => {
    return num.toLocaleString().padStart(2, '0');
  };
  const formatDate = (date) => {
    return `${padTo2Digits(date.getHours())}:${padTo2Digits(
      date.getMinutes()
    )} `;
  };
  const createdAt = formatDate(new Date(Number(message.created_at)));
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {message.sender_uuid !== myUuid && (
        <div className={'messages-wrapper'}>
          <div className={'message-item-inner'}>
            <img height={25} width={25} src={avatar} alt={'avatar'} />
            <div className={'message-item'}>
              {message.text}
              <span className={'message-date'}>{createdAt}</span>
            </div>
          </div>
        </div>
      )}
      {message.sender_uuid === myUuid && (
        <div className={`messages-wrapper ${!isHover ? 'flex-end' : ''}`}>
          {isHover && (
            <div className={'messages-item-actions'}>
              <button onClick={() => handleUpdateMessage(message)}>
                <img src={pen} alt={'pen'} />
              </button>
              <button onClick={() => handleDeleteMessage(message.uuid)}>
                <img src={bin} alt={'bin'} />
              </button>
            </div>
          )}
          <div
            className={`message-item-inner my-message-item-inner 
            ${isHover ? 'messages-hover' : ''}`}
          >
            <div className={'message-item my-message-item'}>
              <span className={'message-date'}>{createdAt}</span>
              {message.text}
            </div>
            <img height={25} width={25} src={avatar} alt={'avatar'} />
          </div>
        </div>
      )}
    </div>
  );
}
