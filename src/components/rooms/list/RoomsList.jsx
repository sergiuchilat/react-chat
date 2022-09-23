import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../../store/RoomsSlice';

export default function RoomsList() {
  const [searchString, setSearchString] = useState('');
  const rooms = useSelector(state => state.rooms.roomsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms(searchString));
  }, [dispatch, searchString]);


  const onRoomSearch = async (search) => {
    setSearchString(`?search=${search}`);
  };

  return (
    <div className={'rooms-list-inner'}>
      <RoomSearch onSearch={onRoomSearch} />
      <div className={'rooms-list'}>
        {rooms.length !== 0 &&
          rooms.map((room) => (
            <RoomItem
              room={room}
              key={room.uuid}
            />
          ))}
      </div>
    </div>
  );
}
