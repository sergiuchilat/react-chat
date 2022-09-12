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

  useEffect(() => {
    fetchRoomsList();
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
