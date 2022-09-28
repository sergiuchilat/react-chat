import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../../store/RoomsSlice';
import useDebounce from '../../../hooks/useDebounce';

export default function RoomsList( { mode }) {
  const [searchString, setSearchString] = useState('');
  const rooms = useSelector(state => state.rooms.roomsList);
  const dispatch = useDispatch();

  const fetchList = async (searchString) => {
    await dispatch(fetchRooms(searchString));
  };
  const debouncedSearch = useDebounce(fetchList, 500);
  useEffect(() => {
    fetchList(searchString);
  }, [dispatch]);

  const onSearch = (search) => {
    const searchString = search || '';
    setSearchString(searchString);
    debouncedSearch(searchString);
  };

  return (
    <div className={'rooms-list-inner'}>
      <RoomSearch onSearch={onSearch} />
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
