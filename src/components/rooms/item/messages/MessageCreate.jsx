import send from '../../../../assets/img/icons/send.png';
import smile from '../../../../assets/img/icons/smile.png';
import attachment from '../../../../assets/img/icons/attachment.png';

export default function MessageCreate({ message, handleChangeMessage, handleSubmitMessage }) {
  return (
    <div className={'message-create'}>
      <button className={'send-message'}>
        <img
          width={25}
          height={25}
          src={attachment}
          alt={'Send'}
        />
      </button>
      <input
        placeholder={'Write a message'}
        value={message}
        onChange={(e) => handleChangeMessage(e.target.value)}
        className={'rooms-search-input rooms-message-input'}
        type={'text'}
      />
      <button
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={smile}
          alt={'Send'}
        />
      </button>
      <button
        onClick={handleSubmitMessage}
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={send}
          alt={'Send'}
        />
      </button>
    </div>
  );
}
