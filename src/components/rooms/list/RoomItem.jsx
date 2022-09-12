import avatar from './../../../assets/img/icons/avatar.png';

export default function RoomItem({ id, name, onSelect, activeRoom }){

  return (
    <div
      className={`room-list-item ${activeRoom === id && 'room-list-item--active'}`}
      onClick={() => {onSelect(id);}}
    >
      <img
        width={30}
        height={30}
        src={avatar}
        alt={'avatar'}
      />
      <h4 className={'room-list-title'}>{name}</h4>
    </div>
  );
}
