import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import MessagesList from './messages/MessagesList';
import MessageCreate from './messages/MessageCreate';
import { useEffect, useState, useCallback } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';

export default function RoomItem({ id }){

  const [room, setRoom] = useState({
    name: ''
  });
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [message, setMessage] = useState('');
  const [searchMessageMode, setSearchMessageMode] = useState(false);
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

  const handleSubmitMessage = () => {
    if(message.trim().length) {
      messages.push({
        id: Date.now(),
        text: message,
        room_id: id,
        sender_id: 1,
        receiver_id: 2,
      });
    }
    setMessage('');
  };

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  const fetchRoomMessages = async () => {
    try {
      const response = await (new MessagesApi()).getRoomMessages(id, messageSearch);
      setMessages(response);
    } catch (e){
      console.log(e);
    }
  };

  const clearSearchMessage = useCallback(() => {
    setMessageSearch('');
  }, []);

  const handlerSearchMode = async () => {
    clearSearchMessage();
    console.log(messageSearch);
    setSearchMessageMode(searchMessageMode => !searchMessageMode);
  };
  const handleChangeSearch = (value) => {
    setMessageSearch(value);
  };
  const handleSetEmoji = (emoji) => {
    setMessage(message + emoji);
  };
  const handleSearch = () => {
    fetchRoomMessages();
  };

  useEffect(() => {
    fetchRoomItem();
    fetchRoomMessages();
  }, [id]);

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
          roomId={id}
          messages={messages}
        />
        <MessageCreate
          message={message}
          handleChangeMessage={handleChangeMessage}
          handleSubmitMessage={handleSubmitMessage}
          setEmoji={handleSetEmoji}
        />
      </>}
      {!room.name &&
        <h1 className={'room-text'}>Choose a room</h1>}
    </div>
  );
}
