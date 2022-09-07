import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import MessagesList from './messages/MessagesList';
import MessageCreate from './messages/MessageCreate';
import { useEffect, useState } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';

export default function RoomItem({ id }){

  const [room, setRoom] = useState({
    name: '---'
  });

  const fetchRoomItem = async () => {
    try {
      if(id){
        const response = await (new RoomsApi()).getById(id);
        setRoom(response);
      }
    } catch (e){
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRoomItem();
  }, [id]);

  return (
    <div className={'rooms-item'}>
      <RoomName name={room.name} />
      <MessageSearch />
      <MessagesList roomId={id} />
      <MessageCreate />
    </div>
  );
}