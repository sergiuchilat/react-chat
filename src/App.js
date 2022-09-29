import './assets/styles/App.css';
import ChatWrapper from './components/ChatWrapper';
import RoomsApi from './services/api/modules/RoomsApi';
import { Provider } from 'react-redux';
import { store } from './store';
import { useState } from 'react';
import logo from './assets/img/logos/react-logo.png';
function App() {
  const [chatMode, setChatMode] = useState(false);
  const [userExternalUuid, setUserExternalUuid] = useState('8445d2f8-34ce-11ed-a261-0242ac120002');
  const [membersUuid] = useState(['c54cf8e0-34cd-11ed-a261-0242ac120002',
    '8445d2f8-34ce-11ed-a261-0242ac120002']);
  const roomName = `room-${Math.trunc(Math.random() * 10)}`;
  const createRoom = async (roomName, membersUuid) => {
    try {
      const response = await new RoomsApi().create({
        name: roomName,
        avatar_link: 'link',
      });
      membersUuid.map(async (uuid) => {
        await addMember(
          response.data.uuid,
          uuid
        );
      });
    } catch (e) {
      console.log(e);
    }
  };
  const addMember = async (roomUuid, userUuid) => {
    try {
      await new RoomsApi().addMember(roomUuid, {
        external_user_uuid: userUuid,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const toggleChangeMode = () => {
    setChatMode(chatMode => !chatMode);
  };
  const changeUuid = (e) => {
    setUserExternalUuid(e.target.value);
  };
  return (
    <Provider store={store}>
      <div style={{ textAlign: 'center' }}>
        <strong>Super chat APP</strong>
        <div>User external Uuid</div>
        <input
          value={userExternalUuid}
          onChange={(e) => changeUuid(e)}
        />
        <button
          className={'create-room'}
          onClick={() => createRoom(roomName,membersUuid)}
        >
          Create room
        </button>
      </div>

      {chatMode && <ChatWrapper
        logo={logo}
        title={'Header'}
        userExternalUuid={userExternalUuid}
      />}
      {!chatMode && <button
        className={'chat-open'}
        onClick={toggleChangeMode}
      >
        Chat
      </button>}
    </Provider>
  );
}

export default App;
