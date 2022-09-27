import avatar from './../../../assets/img/icons/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../../../store/RoomsSlice';

export default function RoomItem({ room }) {
  const dispatch = useDispatch();
  const activeRoom = useSelector(state => state.rooms.selectedRoom);
  const onSelect = (roomUuid) => {
    dispatch(selectRoom(roomUuid));
  };

  const unreadMessages = () => room.unread_messages;
  const lastMessage = () => room.last_message;

  //todo .room-list .item .active
  //todo img width and height must be in CSS
  //todo replace h4 with div
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
        {
          (lastMessage() || unreadMessages()) && <div className={'room-message'}>
            {
              lastMessage() && <p className={'room-list-last'}>
                {lastMessage()}
              </p>
            }
            {unreadMessages() && <div className={'room-unread-messages'}>
              {unreadMessages()}
            </div>}
          </div>
        }
      </div>
    </div>
  );
}
