import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import { MessagesList } from './messages/MessagesList';
import { MessageCreate } from './messages/create/MessageCreate';
import { useEffect, useState, useCallback, useRef } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';
import { MessageEdit } from './messages/edit/MessageEdit';
import { useSelector } from 'react-redux';


export default function RoomItem() {
  const [room, setRoom] = useState({
    name: '',
  });
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [message, setMessage] = useState('');
  const [myUuid, setMyUuid] = useState(null);
  const [searchMessageMode, setSearchMessageMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState({});
  const messagesList = useRef();
  const createInput = useRef();
  const editInput = useRef();
  const roomUuid = useSelector(state => state.rooms.selectedRoom)
  const fetchRoomMessages = async () => {
    try {
      const response = await new RoomsApi().getMessages(roomUuid);
      if (response.data) {
        setMessages(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRoomItem = async () => {
    try {
      if (roomUuid) {
        setLoading(true);
        await fetchRoomMessages();
        const members = await fetchRoomMembers();
        await fetchRoom(roomUuid);
        if (members.data) {
          setMyUuid(
            members.data.find(
              (item) =>
                item.external_user_uuid ===
                'c54cf8e0-34cd-11ed-a261-0242ac120002'
            ).uuid
          );
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      handleScrollToBottom();
    }
  };
  const fetchRoom = async (roomUuid) => {
    try {
      const response = await new RoomsApi().getRoom(roomUuid);
      if (response.data) {
        setRoom({ name: response.data.name });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleScrollToBottom = (timeout = 400) => {
    setTimeout(() => {
      if (messagesList.current) {
        messagesList.current.scroll({
          top: messagesList.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, timeout);
  };
  const fetchRoomMembers = async () => {
    try {
      const response = await new RoomsApi().getMembers(roomUuid);
      if (response.data) {
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitMessage = async () => {
    try {
      if (message.trim().length) {
        const response = await new MessagesApi().createMessage({
          text: message,
          room_uuid: roomUuid,
          sender_uuid: myUuid,
        });
        handleScrollToBottom();
        if (response) {
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
    setSearchMessageMode((searchMessageMode) => !searchMessageMode);
  };
  const handleChangeSearch = (value) => {
    setMessageSearch(value);
  };
  const handleSetEmoji = (emoji) => {
    if (Object.keys(updatingMessage).length) {
      const cursor = editInput.current.selectionStart;
      setUpdatingMessage(
        updatingMessage.text.slice(0, cursor) +
          emoji +
          updatingMessage.text.slice(cursor)
      );
      editInput.current.focus();
    } else {
      const cursor = createInput.current.selectionStart;
      setMessage(message.slice(0, cursor) + emoji + message.slice(cursor));
      createInput.current.focus();
    }
  };
  const handleSearch = async () => {
    await fetchRoomMessages();
  };
  const handleDeleteMessage = async (messageUuid) => {
    try {
      const conf = confirm('Are you sure?');
      if (conf) {
        const response = await new MessagesApi().deleteMessage(messageUuid);
        if (response.status === 204) {
          await fetchRoomMessages();
        }
        if (Object.keys(updatingMessage).length !== 0) {
          setUpdatingMessage({});
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSetUpdatingMessage = (message) => {
    setUpdatingMessage(message);
  };
  const handleUpdateMessage = async (messageUuid) => {
    try {
      if (updatingMessage.text.length) {
        const response = await new MessagesApi().updateMessage(messageUuid, {
          text: updatingMessage.text,
          sender_uuid: updatingMessage.sender_uuid,
          room_uuid: updatingMessage.room_uuid,
        });
        setUpdatingMessage({});
        if (response.data) {
          await fetchRoomMessages();
        }
      } else {
        await handleDeleteMessage(messageUuid);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancelUpdate = () => {
    setUpdatingMessage({});
  };
  const handleChangeUpdatingMessage = (message) => {
    setUpdatingMessage({ ...updatingMessage, text: message });
  };
  useEffect(() => {
    fetchRoomItem();
    setUpdatingMessage({});
    const socketUrl = `ws://157.230.122.163:8108/ws/rooms/${roomUuid}/messages`
    console.log(socketUrl, 'socket url');
    if (roomUuid) {
      const socket = new WebSocket(socketUrl);
      socket.onmessage = (event) => {
        console.log(event);
      }
      // socket.on('connect', () => {
      //   console.log('connected');
      // });
      // socket.on('disconnect', () => {
      //   console.log('disconnect');
      // });
      // socket.on('addMessage', (payload) => {
      //   console.log(payload, 'payload');
      // });
    }

    // fetchRoomMessages();
  }, [roomUuid]);

  return (
    <div className={`${room.name && 'rooms-item'} room`}>
      {room.name && (
        <>
          {!searchMessageMode && (
            <RoomName name={room.name} handlerSearch={handlerSearchMode} />
          )}
          {searchMessageMode && (
            <MessageSearch
              handleCloseSearch={handlerSearchMode}
              handleChangeSearch={handleChangeSearch}
              handleSearch={handleSearch}
            />
          )}
          {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}
          {!loading && (
            <MessagesList
              ref={messagesList}
              myUuid={myUuid}
              messages={messages}
              handleDeleteMessage={handleDeleteMessage}
              handleUpdateMessage={handleSetUpdatingMessage}
            />
          )}
          {Object.keys(updatingMessage).length !== 0 && (
            <MessageEdit
              updatingMessage={updatingMessage}
              handleUpdateMessage={handleUpdateMessage}
              handleChangeUpdatingMessage={handleChangeUpdatingMessage}
              handleDeleteMessage={handleDeleteMessage}
              handleCancelUpdate={handleCancelUpdate}
              setEmoji={handleSetEmoji}
              ref={editInput}
            />
          )}
          {Object.keys(updatingMessage).length === 0 && (
            <MessageCreate
              message={message}
              handleChangeMessage={handleChangeMessage}
              handleSubmitMessage={handleSubmitMessage}
              setEmoji={handleSetEmoji}
              ref={createInput}
            />
          )}
        </>
      )}
      {!room.name && <h1 className={'room-text'}>Choose a room</h1>}
    </div>
  );
}
