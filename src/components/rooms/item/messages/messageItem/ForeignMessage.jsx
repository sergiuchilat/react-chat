import avatar from '../../../../../assets/img/icons/avatar.svg';
import Moment from 'react-moment';
import reply from '../../../../../assets/img/icons/reply.svg';
import forward from '../../../../../assets/img/icons/forward.svg';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../../../../store/AlertDialogSlice';
import Tooltip from '../../../../common/Tooltip';
import { setHighlightText } from '../../../../../functions/SetHighlightText';
export default function ForeignMessage({ isHover, showAvatar, message, createdAt, handleReplyMessage, parentMessage, messageFilter }) {
  const dispatch = useDispatch();

  const handleForwardMessage = (message) => {
    console.log(message);
    const dialog = {
      title: 'Forward a message'
    };
    dispatch(showAlert({ ...dialog }));
  };

  return (
    <div className={'messages-wrapper'}>
      <div
        className={`message-item-inner ${isHover ? 'messages-hover' : ''}`}
      >
        {showAvatar && <img
          height={25}
          width={25}
          src={avatar}
          alt={'avatar'}
        />}
        <div className={'message-item'}>
          {message.parent_uuid && <p className={'reply-text'}>
            {parentMessage?.text}
          </p>}
          <p>
            {setHighlightText(message.text, messageFilter)}
          </p>
          <Moment
            format={'HH:mm'}
            className={'message-date'}
          >
            {createdAt}
          </Moment>
        </div>
      </div>
      {isHover && (
        <div className={'messages-item-actions'}>
          <Tooltip title={'Reply'}>
            <button onClick={() => handleReplyMessage(message)}>
              <img
                width={16}
                src={reply}
                alt={'reply'}
              />
            </button>
          </Tooltip>
          <Tooltip title={'Forward'}>
            <button onClick={() => handleForwardMessage(message)}>
              <img
                width={16}
                src={forward}
                alt={'forward'}
              />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
