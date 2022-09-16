import attachment from '../../../../../assets/img/icons/attachment.png';
import send from '../../../../../assets/img/icons/send.png';

export default function MessageEditActions({ handleSubmitMessage }) {
  return (
    <>
      <button className={'send-message'}>
        <img
          width={25}
          height={25}
          src={attachment}
          alt={'attachment'}
        />
      </button>
      <button
        onClick={(e) => handleSubmitMessage()}
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={send}
          alt={'Send'}
        />
      </button>
    </>
  );
}
