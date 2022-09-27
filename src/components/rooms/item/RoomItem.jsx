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
import { setRead } from '../../../store/RoomsSlice';

export default function RoomItem({ userExternalUuid }) {
  const [room, setRoom] = useState({
    name: '',
  });
  const [messageSearch, setMessageSearch] = useState({
    text: '',
    date: '',
  });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [searchMessageActive, setSearchMessageActive] = useState(false);
  const [filters, setFilters] = useState('');
  const [pending, setPending] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState({});
  const messagesList = useRef();
  const createInput = useRef();
  const editInput = useRef();
  const roomUuid = useSelector(state => state.rooms.selectedRoom);
  const alert = useSelector((state) => state.alert);
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

  const validate = (text) =>  text.length;
  const fetchRoomMessages = async (filters) => {
    try {
      const response = await new RoomsApi().getMessages(roomUuid, filters);
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
        await fetchRoomMessages(filters);
        const members = await fetchRoomMembers();
        if (members) {
          const member = members.find((item) => item.external_user_uuid === userExternalUuid);
          setUser(member);
        }
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    } finally {
      setPending(false);
      scrollToBottom();
    }
  };
  const readMessages = async (roomUuid, userUuid, externalUuid, messagesUuid) => {
    try {
      await new RoomsApi().memberReadMessages(roomUuid, userUuid, {
        external_user_uuid: externalUuid,
        messages: [...messagesUuid]
      });
    } catch (e) {
      dispatch(showSnackbar(e));
    }
  };
  useEffect(() => {
    if(roomUuid){
      const unreadMessagesUuid = messages.filter(message =>
        (message.sender_uuid !== user.uuid) && !message.is_read).map(message => message.uuid);
      if(unreadMessagesUuid.length){
        readMessages(roomUuid, user.uuid, user.external_user_uuid, unreadMessagesUuid);
      }
    }
  }, [user]);
  const fetchRoom = async (roomUuid) => {
    try {
      const response = await new RoomsApi().getItem(roomUuid);
      if (response.data) {
        setRoom({ name: response.data.name });
        dispatch(setRead(roomUuid));
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
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
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleSubmitMessage = async (attachments) => {
    try {
      if (validate(message)) {
        const finalMessage = {
          text: message,
          room_uuid: roomUuid,
          sender_uuid: user.uuid,
          parent_uuid: replyMessage?.uuid,
          attachments: attachments || [],
        };
        if(!finalMessage.parent_uuid) {
          delete finalMessage.parent_uuid;
        }
        const response = await new MessagesApi().createMessage({ ...finalMessage });
        scrollToBottom();
        if (response) {
          await fetchRoomMessages(filters);
          setReplyMessage({});
        }
      }
      setMessage('');
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleChangeMessage = (message) => {
    setMessage(message);
  };
  const toggleSearchActive = async () => {
    setSearchMessageActive((searchMessageActive) => !searchMessageActive);
    setUpdatingMessage({});
    setReplyMessage({});
    if(searchMessageActive) {
      setFilters('');
      setMessageSearch({
        text: '',
        date: ''
      });
      await fetchRoomMessages('');
      await scrollToBottom();
    }
  };
  const handleSearchInput = (value) => {
    setMessageSearch({ ...messageSearch, text: value });
  };
  const handleChangeDate = (date) => {
    setMessageSearch({ ...messageSearch, date: date });
  };
  const handleSearch = async () => {
    if(messageSearch.text.length && messageSearch.date.length) {
      setFilters(`?search=${messageSearch.text}&created_at=${messageSearch.date}`);
      await fetchRoomMessages(`?search=${messageSearch.text}&created_at=${messageSearch.date}`);
    } else if(messageSearch.text.length) {
      setFilters(`?search=${messageSearch.text}`);
      await fetchRoomMessages(`?search=${messageSearch.text}`);
    } else if(messageSearch.date.length){
      setFilters(`?created_at=${messageSearch.date}`);
      await fetchRoomMessages(`?created_at=${messageSearch.date}`);
    } else {
      setFilters('');
      await fetchRoomMessages('');
    }
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
  const handleDeleteMessageAlert = async (messageUuid) => {
    try {
      const confirm = {
        title: 'Delete a message',
        message: 'Are you sure?',
        confirmed: true
      };
      dispatch(showAlert({ ...confirm }));
      setSelectedMessage(messageUuid);
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleDeleteMessage = async (messageUuid) => {
    try {
      const response = await new MessagesApi().deleteMessage(messageUuid);
      if (response.status === 204) {
        await fetchRoomMessages(filters);
      }
      if (Object.keys(updatingMessage).length !== 0) {
        setUpdatingMessage({});
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleFinishUpdatingMessage = (message) => {
    setUpdatingMessage(message);
  };
  const handleUpdateMessage = async (messageUuid, parentUuid) => {
    try {
      if (validate(updatingMessage.text)) {
        if(!updatingMessage.parent_uuid){
          delete updatingMessage.parent_uuid;
        }
        /*    if(!Object.keys(parentUuid).length){
          updatingMessage.parent_uuid = null;
        }*/
        console.log(updatingMessage);
        const response = await new MessagesApi().updateMessage(messageUuid, { ...updatingMessage });
        setUpdatingMessage({});
        if (response.data) {
          await fetchRoomMessages(filters);
        }
      } else {
        await handleDeleteMessageAlert(messageUuid);
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
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
  const handleReplyMessage = (message) => {
    setReplyMessage(message);
  };
  const handleRemoveParentMessage = () => {
    setReplyMessage({});
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchRoomItem();

    };
    fetchData().catch(console.error);
    setUpdatingMessage({});
    setReplyMessage({});
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
                handleChangeDate={handleChangeDate}
              />
            )}
            {pending && <div style={{ textAlign: 'center' }}>pending...</div>}
            {!pending && (
              <MessagesList
                ref={messagesList}
                userUuid={user.uuid}
                messages={messages}
                handleDeleteMessage={handleDeleteMessageAlert}
                handleUpdateMessage={handleFinishUpdatingMessage}
                searchMessageActive={searchMessageActive}
                handleReplyMessage={handleReplyMessage}
              />
            )}
            {!searchMessageActive && <>
              {Object.keys(updatingMessage).length !== 0 && (
                <MessageEdit
                  updatingMessage={updatingMessage}
                  handleUpdateMessage={handleUpdateMessage}
                  handleChangeUpdatingMessage={handleChangeUpdatingMessage}
                  handleDeleteMessage={handleDeleteMessageAlert}
                  handleCancelUpdateMessage={handleCancelUpdateMessage}
                  selectEmoji={handleSetEmoji}
                  ref={editInput}
                  messages={messages}
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
                  replyMessage={replyMessage}
                  ref={createInput}
                  handleRemoveParentMessage={handleRemoveParentMessage}
                />
              )}
            </>}
          </>
        )}
        {!room.name && <h1 className={'room-text'}>Choose a room</h1>}
        {alert.showed && <AlertDialog acceptDialog={acceptDialog} />}
      </>}
      {snackBar.showed && <SnackBar />}
    </div>
  );
}
