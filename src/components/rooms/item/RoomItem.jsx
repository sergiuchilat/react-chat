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
import { initialStates } from './InitialStatesRoomItem';
import { scrollToBottom } from '../../../utils/ScrollToBottom';
import { SetEmoji } from '../../../utils/SetEmoji';

export default function RoomItem({ userExternalUuid }) {
  const [user, setUser] = useState(initialStates.user);
  const [room, setRoom] = useState(initialStates.room);
  const [messages, setMessages] = useState(initialStates.messages);
  const [messageFilters, setMessageFilters] = useState(initialStates.messageFilters);
  const [updatingMessage, setUpdatingMessage] = useState(initialStates.updatingMessage);
  const [selectedMessage, setSelectedMessage] = useState(initialStates.selectedMessage);
  const [replyMessage, setReplyMessage] = useState(initialStates.replyMessage);
  const [searchMessageActive, setSearchMessageActive] = useState(initialStates.searchMessageActive);
  const [pending, setPending] = useState(initialStates.pending);
  const messagesList = useRef();
  const editInput = useRef();
  const roomUuid = useSelector(state => state.rooms.selectedRoom);
  const alert = useSelector((state) => state.alert);
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

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
  const fetchRoomItem = async (filters) => {
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
      scrollToBottom(messagesList);
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
  const toggleSearchActive = async () => {
    setSearchMessageActive((searchMessageActive) => !searchMessageActive);
    setUpdatingMessage({});
    setReplyMessage({});
    if(searchMessageActive) {
      const filter = {
        text: '',
        date: ''
      };
      setMessageFilters({ ...filter });
      await fetchRoomMessages({ ...filter });
      await scrollToBottom(messagesList);
    }
  };
  const handleSearchInput = (value) => {
    setMessageFilters({ ...messageFilters, text: value });
  };
  const handleChangeDate = (date) => {
    setMessageFilters({ ...messageFilters, date: date });
  };
  const handleSearch = async () => {
    if(messageFilters.text.length || messageFilters.date.length) {
      await fetchRoomMessages(messageFilters);
    } else {
      await fetchRoomMessages({
        text: '',
        date: ''
      });
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
        await fetchRoomMessages(messageFilters);
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
  const handleSetEmoji = (emoji) => {
    SetEmoji(emoji, editInput, updatingMessage, setUpdatingMessage);
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
  const resetRoom = () => {
    setUpdatingMessage({});
    setReplyMessage({});
    setMessageFilters({
      text: '',
      date: ''
    });
    setSearchMessageActive(false);
  };
  const resetMessages = async () => {
    scrollToBottom(messagesList);
    await fetchRoomMessages(messageFilters);
    setReplyMessage({});
    setUpdatingMessage({});
  };
  useEffect(() => {
    resetRoom();
    const fetchData = async () => {
      await fetchRoomItem({
        text: '',
        date: ''
      });
    };
    fetchData().catch(console.error);
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
                  updateMessage={resetMessages}
                  handleChangeUpdatingMessage={handleChangeUpdatingMessage}
                  handleCancelUpdateMessage={handleCancelUpdateMessage}
                  selectEmoji={handleSetEmoji}
                  handleDeleteMessageAlert={handleDeleteMessageAlert}
                  ref={editInput}
                  messages={messages}
                />
              )}
              {Object.keys(updatingMessage).length === 0 && (
                <MessageCreate
                  resetMessages={resetMessages}
                  updatingMessage={updatingMessage}
                  handleDeleteMessage={handleDeleteMessageAlert}
                  replyMessage={replyMessage}
                  handleRemoveParentMessage={handleRemoveParentMessage}
                  roomUuid={roomUuid}
                  user={user}
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
