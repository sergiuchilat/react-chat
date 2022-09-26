import pen from '../../../../../assets/img/icons/pen.svg';
import bin from '../../../../../assets/img/icons/rubbish-bin.svg';
import Moment from 'react-moment';
import avatar from '../../../../../assets/img/icons/avatar.svg';

export default function UserMessage(
  { isHover, handleDeleteMessage, handleUpdateMessage, createdAt, showAvatar, message, searchMessageActive, parentMessage }) {
  return (
    <div className={`messages-wrapper ${!isHover ? 'flex-end' : ''}`}>
      {(isHover && !searchMessageActive) && (
        <div className={'messages-item-actions'}>
          <button onClick={() => handleUpdateMessage(message)}>
            <img
              width={16}
              src={pen}
              alt={'pen'}
            />
          </button>
          <button onClick={() => handleDeleteMessage(message.uuid)}>
            <img
              width={16}
              src={bin}
              alt={'bin'}
            />
          </button>
        </div>
      )}
      <div
        className={`message-item-inner my-message-item-inner ${isHover ? 'messages-hover' : ''}`}
      >
        <div className={'message-item my-message-item'}>
          <Moment
            format={'HH:mm'}
            className={'message-date'}
          >
            {createdAt}
          </Moment>
          {message.parent_uuid && <p className={'reply-text'}>
            {parentMessage.text}
          </p>}
          <p>
            {message.text}
          </p>
        </div>
        {showAvatar && <img
          height={25}
          width={25}
          src={avatar}
          alt={'avatar'}
        />}
      </div>
    </div>

  );
}
