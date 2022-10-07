import avatar from './../../../assets/img/icons/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '../../../store/modules/RoomsSlice';

export default function RoomItem({ room, mode, handleForwardMessage }) {
  const dispatch = useDispatch();
  const activeRoom = useSelector(state => state.rooms.selectedRoom);
  const onSelect = (roomUuid) => {
    if(mode === 'forward'){
      handleForwardMessage(roomUuid);
    } else {
      dispatch(selectRoom(roomUuid));
    }
  };

  const unreadMessages = () => room.unread_messages;
  const lastMessage = () => room.last_message;

  return (
    <main
      className={`${
        activeRoom === room.uuid ? 'active' : '' 
      }`}
      onClick={() => {
        onSelect(room.uuid);
      }}
    >
      <img
        src={avatar}
        alt={'avatar'}
      />
      <section>
        <h4>{room.name}</h4>
        {
          (lastMessage() || unreadMessages()) && <article>
            {
              lastMessage() && <p>
                {lastMessage()}
              </p>
            }
            {unreadMessages() && <span>
              {unreadMessages()}
            </span>}
          </article>
        }
      </section>
    </main>
  );
}
