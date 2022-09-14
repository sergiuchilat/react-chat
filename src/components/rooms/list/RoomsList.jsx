import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import RoomsApi from 'services/api/modules/RoomsApi';

export default function RoomsList({ onSelect }){
  const [rooms, setRooms] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [activeRoom, setActiveRoom] = useState(null);
  const fetchRoomsList = async () => {
    try {
      const response = await (new RoomsApi()).get(searchString);
      setRooms(response);
    } catch (e){
      console.log(e);
    }
  };

  const fetchRoomsL = async () => {
    try {
      const response = await (new RoomsApi()).getRoomsList();
    } catch (e) {
      console.log(e);
    }
  };

  const addMember = async () => {
    try {
      const response = await (new RoomsApi()).addMember('ffefaa84-d59e-44a5-b019-54ba85811534',{
        external_user_uuid: '469|EuJScKNah0QvVzJnFnDxl5shTN6f9ZvkiMGfUtWU',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createRoom = async () => {
    try {
      await (new RoomsApi()).createRoom({
        name: 'Vicu',
        avatar_link: 'asd',
      });
      await fetchRoomsL();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRoomsList();
    fetchRoomsL();
  }, [searchString]);

  const onRoomSelectHandle = (roomId) => {
    onSelect(roomId);
    setActiveRoom(roomId);
  };

  const onRoomSearch = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <div className={'rooms-list-inner'}>
      <RoomSearch onSearch={onRoomSearch} />
      <div className={'rooms-list'}>
        {
          rooms.length !== 0 && rooms.map(room => (
            <RoomItem
              name={room.name}
              id={room.id}
              key={room.id}
              onSelect={onRoomSelectHandle}
              activeRoom={activeRoom}
            />
          ))
        }
      </div>
    </div>
  );
}
