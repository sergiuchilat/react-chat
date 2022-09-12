import avatar from '../../../../assets/img/icons/avatar.png';

export default function MessageItem({ message }){
  return (
    <div className={'message-item-inner'}>
      <img
        height={25}
        width={25}
        src={avatar}
        alt={'avatar'}
      />
      <div className={'message-item'}>
        {message}
      </div>
    </div>
  );
}
