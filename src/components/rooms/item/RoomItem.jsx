import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import MessagesList from './messages/MessagesList';
import MessageCreate from './messages/create/MessageCreate';
import { useEffect, useState, useCallback } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';
import MessageEdit from './messages/edit/MessageEdit';

export default function RoomItem({ roomUuid }){

  const [room, setRoom] = useState({
    name: ''
  });
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [message, setMessage] = useState('');
  const [myUuid, setMyUuid] = useState(null);
  const [searchMessageMode, setSearchMessageMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchRoomMessages = async () => {
    try {
      const response = await (new RoomsApi()).getMessages(roomUuid);
      if(response.data){
        setMessages(response.data);
      }
    } catch (e){
      console.log(e);
    }
  };

  const fetchRoomItem = async () => {
    try {
      if(roomUuid){
        await fetchRoomMessages();
        const members = await fetchRoomMembers();
        if(members.data) {
          setMyUuid(members.data.find(item =>
            item.external_user_uuid === 'c54cf8e0-34cd-11ed-a261-0242ac120002').uuid);
          setRoom({ name: 'Vicu' });
        }
      }
    } catch (e){
      console.log(e);
    }
  };

  const fetchRoomMembers = useCallback(async() => {
    try {
      const response = await (new RoomsApi()).getMembers(roomUuid);
      return response;
    } catch (e) {
      console.log(e);
    }
  }, [roomUuid]);

  const handleSubmitMessage = async () => {
    try {
      if(message.trim().length) {
        const response = await (new MessagesApi()).createMessage({
          text: message,
          room_uuid: roomUuid,
          sender_uuid: myUuid,
        });
        if(response) {
          await fetchRoomMessages();
        }
      }
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  const clearSearchMessage = useCallback(() => {
    setMessageSearch('');
  }, []);

  const handlerSearchMode = async () => {
    clearSearchMessage();
    setSearchMessageMode(searchMessageMode => !searchMessageMode);
  };
  const handleChangeSearch = (value) => {
    setMessageSearch(value);
  };
  const handleSetEmoji = (emoji) => {
    setMessage(message + emoji);
  };
  const handleSearch = async () => {
    await fetchRoomMessages();
  };
  const handleDeleteMessage = async (messageUuid) => {
    try {
      const conf = confirm('Are you sure?');
      if(conf) {
        const response = (new MessagesApi()).deleteMessage(messageUuid);
      }
      await fetchRoomMessages();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchRoomItem();
    // fetchRoomMessages();
  }, [roomUuid]);

  return (
    <div className={`${room.name && 'rooms-item'} room`}>
      {room.name && <>
        {!searchMessageMode &&
            <RoomName
              name={room.name}
              handlerSearch={ handlerSearchMode }
            />}
        {searchMessageMode &&
            <MessageSearch
              handleCloseSearch={ handlerSearchMode }
              handleChangeSearch={ handleChangeSearch }
              handleSearch={ handleSearch }
            />}
        <MessagesList
          myUuid={myUuid}
          messages={messages}
          handleDeleteMessage={handleDeleteMessage}
        />
        {editMode && <MessageEdit />}
        {!editMode && <MessageCreate
          message={message}
          handleChangeMessage={handleChangeMessage}
          handleSubmitMessage={handleSubmitMessage}
          setEmoji={handleSetEmoji}
        />}
      </>}
      {!room.name &&
        <h1 className={'room-text'}>Choose a room</h1>}
    </div>
  );
}
