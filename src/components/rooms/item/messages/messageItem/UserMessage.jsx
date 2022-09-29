import pen from '../../../../../assets/img/icons/pen.svg';
import bin from '../../../../../assets/img/icons/rubbish-bin.svg';
import Moment from 'react-moment';
import avatar from '../../../../../assets/img/icons/avatar.svg';
import check from '../../../../../assets/img/icons/check.svg';
import Tooltip from '../../../../common/Tooltip';
export default function UserMessage(
  { isHover, handleDeleteMessage, handleUpdateMessage, createdAt, showAvatar, message, searchMessageActive, parentMessage }) {
  return (
    <div className={`messages-wrapper ${!isHover ? 'flex-end' : ''}`}>
      {(isHover && !searchMessageActive) && (
        <div className={'messages-item-actions'}>
          <Tooltip title={'Edit'}>
            <button onClick={() => handleUpdateMessage(message)}>
              <img
                width={16}
                src={pen}
                alt={'pen'}
              />
            </button>
          </Tooltip>
          <Tooltip title={'Remove'}>
            <button onClick={() => handleDeleteMessage(message.uuid)}>
              <img
                width={16}
                src={bin}
                alt={'bin'}
              />
            </button>
          </Tooltip>

        </div>
      )}
      <div
        className={`message-item-inner my-message-item-inner ${isHover ? 'messages-hover' : ''}`}
      >
        <div className={'message-item my-message-item'}>
          <Moment
            format={'HH:mm'}
            className={`message-date ${showAvatar ? 'message-with-avatar' : ''}`}
          >
            {createdAt}
          </Moment>
          <span className={`message-read ${showAvatar ? 'message-with-avatar' : ''}`}>
            {!message.is_read && <img
              src={check}
              alt={'check'}
            />}
            {message.is_read && <>
              <img
                style={{ marginRight: '-6px' }}
                src={check}
                alt={'check'}
              />
              <img
                src={check}
                alt={'check'}
              />
            </>}
          </span>
          {message.parent_uuid && <p className={'reply-text'}>
            {parentMessage?.text}
          </p>}
          <p>
            {message?.text}
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
