import avatar from './../../../assets/img/icons/avatar.png';

export default function RoomItem({ room, onSelect, activeRoom }){

  return (
    <div
      className={`room-list-item ${activeRoom === room.uuid ? 'room-list-item--active' : ''}`}
      onClick={() => {onSelect(room.uuid);}}
    >
      <img
        width={30}
        height={30}
        src={avatar}
        alt={'avatar'}
      />
      <div className={'room-list-header'}>
        <h4 className={'room-list-title'}>{room.name}</h4>
        <p className={'room-list-last'}>{room.last_message}</p>
      </div>
    </div>
  );
}
