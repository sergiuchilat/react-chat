import RoomName from './RoomName';
import MessageSearch from './messages/MessageSearch';
import { MessagesList } from './messages/MessagesList';
import { MessageCreate } from './messages/MessageCreate';
import { useEffect, useState, useRef } from 'react';
import RoomsApi from '../../../services/api/modules/RoomsApi';
import MessagesApi from '../../../services/api/modules/MessagesApi';
import { MessageEdit } from './messages/MessageEdit';
import { useSelector, useDispatch } from 'react-redux';
import { showAlert } from '../../../store/modules/AlertDialogSlice';
import AlertDialog from '../../dialogs/AlertDialog';
import SnackBar from '../../dialogs/SnackBar';
import { showSnackbar } from '../../../store/modules/SnackBarSlice';
import { setLastRoomMessage, setRead } from '../../../store/modules/RoomsSlice';
import { initialStates } from './InitialStatesRoomItem';
import { scrollToBottom } from '../../../functions/ScrollToBottom';
import { SetEmoji } from '../../../functions/SetEmoji';

export default function RoomItem({ isHeader, userExternalUuid }) {
  const [user, setUser] = useState(initialStates.user);
  const [room, setRoom] = useState(initialStates.room);
  const [messages, setMessages] = useState(initialStates.messages);
  const [messageFilters, setMessageFilters] = useState(initialStates.messageFilters);
  const [updatingMessage, setUpdatingMessage] = useState(initialStates.updatingMessage);
  const [selectedMessage, setSelectedMessage] = useState(initialStates.selectedMessage);
  const [replyMessage, setReplyMessage] = useState(initialStates.replyMessage);
  const [searchMessageActive, setSearchMessageActive] = useState(initialStates.searchMessageActive);
  const [pending, setPending] = useState(initialStates.pending);
  const messagesList = useRef(null);
  const editInput = useRef(null);
  const roomTitle = useRef(null);
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
    }
  };
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
      const filter = { ...initialStates.messageFilters };
      setMessageFilters(filter);
      await fetchRoomMessages(filter);
      await scrollToBottom(messagesList);
    }
  };
  const handleSearchInput = ( key, value) => {
    setMessageFilters({ ...messageFilters, [key]: value });
  };
  const handleSearch = async () => {
    if(messageFilters.text.length || messageFilters.date.length) {
      await fetchRoomMessages(messageFilters);
    } else {
      await fetchRoomMessages({ ...initialStates.messageFilters });
    }
    scrollToBottom(messagesList);
  };
  const handleDeleteMessageAlert = async (messageUuid) => {
    try {
      dispatch(showAlert({ ...initialStates.confirm }));
      setSelectedMessage(messageUuid);
    } catch (e) {
      dispatch(showSnackbar({ message: e.message }));
    }
  };
  const handleDeleteMessage = async (messageUuid) => {
    try {
      const response = await new MessagesApi().deleteItem(messageUuid);
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
    setMessageFilters({ ...initialStates.messageFilters });
    setSearchMessageActive(false);
  };
  const resetMessages = async () => {
    scrollToBottom(messagesList);
    await fetchRoomMessages(messageFilters);
    dispatch(setLastRoomMessage(messages[messages.length - 1].text));
    setReplyMessage({});
    setUpdatingMessage({});
  };
  useEffect(() => {
    resetRoom();
    const fetchData = async () => {
      await fetchRoomItem({ ...initialStates.messageFilters });
    };
    fetchData().catch(console.error);
  }, [roomUuid]);

  return (
    <div className={`${room.name && 'rooms-item'} room ${isHeader ? 'with-header' : ''}`}>
      {!snackBar.showed && <>
        {room.name && (
          <>
            <div ref={roomTitle}>
              {!searchMessageActive && (
                <RoomName
                  isHeader={isHeader}
                  name={room.name}
                  handlerSearch={toggleSearchActive}
                />
              )}
              {searchMessageActive && (
                <MessageSearch
                  handleCloseSearch={toggleSearchActive}
                  handleSearchInput={handleSearchInput}
                  handleSearch={handleSearch}
                  isHeader={isHeader}
                />
              )}
            </div>

            {pending && <div className={'loading'}>pending...</div>}
            {!pending && (
              <MessagesList
                ref={messagesList}
                userUuid={user.uuid}
                messages={messages}
                handleDeleteMessage={handleDeleteMessageAlert}
                handleUpdateMessage={handleFinishUpdatingMessage}
                searchMessageActive={searchMessageActive}
                handleReplyMessage={handleReplyMessage}
                messageFilter={messageFilters}
                roomTitle={roomTitle}
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
