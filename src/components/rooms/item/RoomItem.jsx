import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import { MessagesList } from './messages/MessagesList';
import { MessageCreate } from './messages/MessageCreate';
import { useEffect, useState, useRef } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';
import { MessageEdit } from './messages/MessageEdit';
import { useSelector, useDispatch } from 'react-redux';
import { showAlert } from '../../../store/AlertDialogSlice';
import AlertDialog from '../../dialogs/AlertDialog';
import SnackBar from '../../dialogs/SnackBar';
import { showSnackbar } from '../../../store/SnackBarSlice';

export default function RoomItem({ userExternalUuid }) {
  const [room, setRoom] = useState({
    name: '',
  });
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [message, setMessage] = useState('');
  const [userUuid, setUserUuid] = useState(null);
  const [searchMessageActive, setSearchMessageActive] = useState(false);
  const [pending, setPending] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesList = useRef();
  const createInput = useRef();
  const editInput = useRef();
  const roomUuid = useSelector(state => state.rooms.selectedRoom);
  const alert = useSelector((state) => state.alert);
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

  const validate = (text) =>  text.length;
  const fetchRoomMessages = async () => {
    try {
      const response = await new RoomsApi().getMessages(roomUuid);
      if (response.data) {
        setMessages(response.data);
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const fetchRoomItem = async () => {
    try {
      if (roomUuid) {
        setPending(true);
        await fetchRoom(roomUuid);
        await fetchRoomMessages();
        const members = await fetchRoomMembers();
        if (members) {
          setUserUuid(
            members.find(
              (item) =>
                item.external_user_uuid === userExternalUuid
            ).uuid
          );
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
      scrollToBottom();
    }
  };
  const fetchRoom = async (roomUuid) => {
    try {
      const response = await new RoomsApi().getItem(roomUuid);
      if (response.data) {
        setRoom({ name: response.data.name });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const scrollToBottom = (timeout = 400) => {
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
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitMessage = async (attachments) => {
    try {
      if (validate(message)) {
        const finalMessage = {
          text: message,
          room_uuid: roomUuid,
          sender_uuid: userUuid,
          attachments: attachments || [],
        };
        const response = await new MessagesApi().createMessage({ ...finalMessage });
        scrollToBottom();
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

  const clearSearchMessage = () => {
    setMessageSearch('');
  };

  const toggleSearchActive = async () => {
    clearSearchMessage();
    setSearchMessageActive((searchMessageActive) => !searchMessageActive);
  };
  const handleSearchInput = (value) => {
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
  const handleDeleteMessageAlert = async (messageUuid) => {
    try {
      const confirm = {
        title: 'Delete a message',
        message: 'Are you sure?',
      };
      dispatch(showAlert({ ...confirm }));
      setSelectedMessage(messageUuid);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteMessage = async (messageUuid) => {
    try {
      const response = await new MessagesApi().deleteMessage(messageUuid);
      if (response.status === 204) {
        await fetchRoomMessages();
      }
      if (Object.keys(updatingMessage).length !== 0) {
        setUpdatingMessage({});
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleFinishUpdatingMessage = (message) => {
    setUpdatingMessage(message);
  };
  const handleUpdateMessage = async (messageUuid) => {
    try {
      if (validate(updatingMessage.text)) {
        if(!updatingMessage.parent_uuid){
          delete updatingMessage.parent_uuid;
        }
        const response = await new MessagesApi().updateMessage(messageUuid, { ...updatingMessage });
        setUpdatingMessage({});
        if (response.data) {
          await fetchRoomMessages();
        }
      } else {
        await handleDeleteMessageAlert(messageUuid);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancelUpdateMessage = () => {
    setUpdatingMessage({});
  };
  const handleChangeUpdatingMessage = (message) => {
    setUpdatingMessage({ ...updatingMessage, text: message });
  };
  const acceptDialog = async () => {
    await handleDeleteMessage(selectedMessage);
    setSelectedMessage(null);
  };
  useEffect(() => {
    fetchRoomItem();
    setUpdatingMessage({});
    // const socketUrl = `ws://157.230.122.163:8108/ws/rooms/${roomUuid}/messages`;
    // console.log(socketUrl, 'socket url');
    // if (roomUuid) {
    //   const socket = new WebSocket(socketUrl);
    //   socket.onmessage = (event) => {
    //     console.log(event);
    //   };
    //   socket.on('connect', () => {
    //     console.log('connected');
    //   });
    //   socket.on('disconnect', () => {
    //     console.log('disconnect');
    //   });
    //   socket.on('addMessage', (payload) => {
    //     console.log(payload, 'payload');
    //   });
    // }

    // fetchRoomMessages();
  }, [roomUuid]);

  return (
    <div className={`${room.name && 'rooms-item'} room`}>
      {!snackBar.showed && <>
        {room.name && (
          <>
            {!searchMessageActive && (
              <RoomName
                name={room.name}
                handlerSearch={toggleSearchActive}
              />
            )}
            {searchMessageActive && (
              <MessageSearch
                handleCloseSearch={toggleSearchActive}
                handleSearchInput={handleSearchInput}
                handleSearch={handleSearch}
              />
            )}
            {pending && <div style={{ textAlign: 'center' }}>pending...</div>}
            {!pending && (
              <MessagesList
                ref={messagesList}
                userUuid={userUuid}
                messages={messages}
                handleDeleteMessage={handleDeleteMessageAlert}
                handleUpdateMessage={handleFinishUpdatingMessage}
              />
            )}
            {Object.keys(updatingMessage).length !== 0 && (
              <MessageEdit
                updatingMessage={updatingMessage}
                handleUpdateMessage={handleUpdateMessage}
                handleChangeUpdatingMessage={handleChangeUpdatingMessage}
                handleDeleteMessage={handleDeleteMessageAlert}
                handleCancelUpdateMessage={handleCancelUpdateMessage}
                selectEmoji={handleSetEmoji}
                ref={editInput}
              />
            )}
            {Object.keys(updatingMessage).length === 0 && (
              <MessageCreate
                message={message}
                handleChangeMessage={handleChangeMessage}
                handleSubmitMessage={handleSubmitMessage}
                selectEmoji={handleSetEmoji}
                handleUpdateMessage={handleUpdateMessage}
                updatingMessage={updatingMessage}
                handleDeleteMessage={handleDeleteMessageAlert}
                ref={createInput}
              />
            )}
          </>
        )}
        {!room.name && <h1 className={'room-text'}>Choose a room</h1>}
        {alert.showed && <AlertDialog acceptDialog={acceptDialog} />}
      </>}
      {snackBar.showed && <SnackBar />}
    </div>
  );
}
