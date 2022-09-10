import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import MessagesList from './messages/MessagesList';
import MessageCreate from './messages/MessageCreate';
import { useEffect, useState } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';

export default function RoomItem({ id }){

  const [room, setRoom] = useState({
    name: ''
  });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

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
    messages.push({
      id: Date.now(),
      text: message,
      room_id: id,
      sender_id: 1,
      receiver_id: 2,
    });
    setMessage('');
  };

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  const fetchRoomMessages = async () => {
    try {
      const response = await (new MessagesApi()).getRoomMessages(id);
      setMessages(response);
    } catch (e){
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRoomItem();
    fetchRoomMessages();
  }, [id]);

  return (
    <div className={'rooms-item'}>
      {room.name && <>
        <RoomName name={room.name} />
        <MessageSearch />
        <MessagesList
          roomId={id}
          messages={messages}
        />
        <MessageCreate
          message={message}
          handleChangeMessage={handleChangeMessage}
          handleSubmitMessage={handleSubmitMessage}
        />
      </>}
      {!room.name &&
        <h1 className={'room-text'}>Choose a room</h1>}
    </div>
  );
}
