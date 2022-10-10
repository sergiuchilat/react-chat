import RoomItem from './RoomItem';
import RoomSearch from './RoomSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRoom } from '../../../store/modules/RoomsSlice';
import useDebounce from '../../../hooks/useDebounce';
import { showSnackbar } from '../../../store/modules/SnackBarSlice';
import MessagesApi from '../../../services/api/modules/MessagesApi';
import { cancelAlert } from '../../../store/modules/AlertDialogSlice';
import RoomsApi from '../../../services/api/modules/RoomsApi';

export default function RoomsList( { mode, isHeader }) {
  const [searchString, setSearchString] = useState('');
  const rooms = useSelector(state => state.rooms.roomsList);
  const userExternalUuid = useSelector(state => state.user.userExternalUuid);
  const parentUuid = useSelector(state => state.rooms.selectedMessageUuid);
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
  const fetchRoomMembers = async (roomUuid) => {
    try {
      const response = await new RoomsApi().getMembers(roomUuid);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleForwardMessage = async (roomUuid) => {
    try {
      await dispatch(selectRoom(roomUuid));
      const members = await fetchRoomMembers(roomUuid);
      const senderUuid = members.find((item) => item.external_user_uuid === userExternalUuid).uuid;
      const message = {
        sender_uuid: senderUuid,
        room_uuid: roomUuid,
        parent_uuid: parentUuid
      };
      const response = await new MessagesApi().create({ ...message });
      if (response) {
        dispatch(cancelAlert());
      }
    }  catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  return (
    <div className={`rooms-list-inner ${isHeader ? 'with-header': ''} ${mode === 'forward' ? 'forward' : ''}`}>
      {mode !== 'forward' && <RoomSearch onSearch={onSearch} />}
      <div className={'rooms-list'}>
        {rooms.length !== 0 &&
          rooms.map((room) => (
            <RoomItem
              room={room}
              mode={mode}
              handleForwardMessage={handleForwardMessage}
              key={room.uuid}
            />
          ))}
      </div>
    </div>
  );
}
