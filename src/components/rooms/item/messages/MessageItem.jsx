import avatar from '../../../../assets/img/icons/avatar.png';

export default function MessageItem({ message, senderId }){
  return (
    <>
      {senderId !== 1 && <div className={'message-item-inner'}>
        <img
          height={25}
          width={25}
          src={avatar}
          alt={'avatar'}
        />
        <div className={'message-item'}>
          {message}
        </div>
      </div>}
      {senderId === 1 && <div className={'message-item-inner my-message-item-inner'}>
        <div className={'message-item my-message-item'}>
          {message}
        </div>
        <img
          height={25}
          width={25}
          src={avatar}
          alt={'avatar'}
        />
      </div>}
    </>
  );
}
