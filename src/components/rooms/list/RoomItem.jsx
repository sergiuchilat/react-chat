import avatar from './../../../assets/img/icons/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../../../store/RoomsSlice';

export default function RoomItem({ room }) {
  const dispatch = useDispatch();
  const activeRoom = useSelector(state => state.rooms.selectedRoom);
  const onSelect = (roomUuid) => {
    dispatch(selectRoom(roomUuid));
  };

  return (
    <div
      className={`room-list-item ${
        activeRoom === room.uuid ? 'room-list-item--active' : '' 
      }`}
      onClick={() => {
        onSelect(room.uuid);
      }}
    >
      <img
        width={30}
        height={30}
        src={avatar}
        alt={'avatar'}
      />
      <div className={'room-list-header'}>
        <h4 className={'room-list-title'}>{room.name}</h4>
        <div className={'room-message'}>
          <p className={'room-list-last'}>
            {room.last_message}
          </p>
          {room.unread_messages > 0 && <div className={'room-unread-messages'}>
            {room.unread_messages}
          </div>}
        </div>
      </div>
    </div>
  );
}
