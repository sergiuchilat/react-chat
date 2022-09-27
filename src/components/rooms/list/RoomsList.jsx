import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../../store/RoomsSlice';
import useDebounce from '../../../hooks/useDebounce';

export default function RoomsList({ forward }) {
  const [searchString, setSearchString] = useState('');
  const rooms = useSelector(state => state.rooms.roomsList);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(fetchRoomsList, 500);

  function fetchRoomsList(searchString) {
    dispatch(fetchRooms(searchString));
  }

  useEffect(() => {
    fetchRoomsList(searchString);
  }, [dispatch]);

  const onRoomSearch = (search) => {
    if(!search) {
      setSearchString('');
      debouncedSearch('');
    } else {
      setSearchString(`?search=${search}`);
      debouncedSearch(`?search=${search}`);
    }
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
