import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../../store/RoomsSlice';
import useDebounce from '../../../hooks/useDebounce';

//todo forward => mode = normal|forward
export default function RoomsList({ }) {
  const [searchString, setSearchString] = useState('');
  const rooms = useSelector(state => state.rooms.roomsList);
  const dispatch = useDispatch();

  //todo async
  const fetchList = (searchString) => {
    dispatch(fetchRooms(searchString));
  };
  const debouncedSearch = useDebounce(fetchList, 500);
  useEffect(() => {
    fetchList(searchString);
  }, [dispatch]);

  const onSearch = (search) => {
    const searchString = search ? `?search=${search}`: '';
    setSearchString(searchString);
    debouncedSearch(searchString);

    if(!search) {
      console.log('remove me');
    } else {
      //todo move ?search= in API
      setSearchString(`?search=${search}`);
      debouncedSearch(`?search=${search}`);
    }
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
