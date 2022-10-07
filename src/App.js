import './assets/styles/App.css';
import ChatWrapper from './components/ChatWrapper';
import RoomsApi from './services/api/modules/RoomsApi';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import logo from './assets/img/logos/react-logo.png';
import { changeUserExternalUuid } from './store/modules/UserSlice';
function App() {
  const [chatMode, setChatMode] = useState(false);
  const [color, setColor] = useState('#007aff');
  const userExternalUuid = useSelector(state => state.user.userExternalUuid);
  const membersUuid = ['c54cf8e0-34cd-11ed-a261-0242ac120002', '8445d2f8-34ce-11ed-a261-0242ac120002'];
  const roomName = `room-${Math.trunc(Math.random() * 10)}`;
  const dispatch = useDispatch();
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
    dispatch(changeUserExternalUuid(e.target.value));
  };
  const resetColor = () => {
    setColor('#007aff');
  };
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <strong>Super chat APP</strong>
        <div>User external Uuid</div>
        <input
          value={userExternalUuid}
          onChange={(e) => changeUuid(e)}
        />
        c54cf8e0-34cd-11ed-a261-0242ac120002
        <button
          className={'create-room'}
          onClick={() => createRoom(roomName,membersUuid)}
        >
            Create room
        </button>
        <div>
          <input
            type={'color'}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button onClick={() => resetColor()}>
              Reset
          </button>
        </div>
      </div>

      {chatMode && <ChatWrapper
        logo={logo}
        title={'Header'}
        toggleChangeMode={toggleChangeMode}
        userExternalUuid={userExternalUuid}
        headerColor={color}
      />}
      <button
        className={'chat-open'}
        onClick={toggleChangeMode}
      >
          Chat
      </button>
    </>
  );
}

export default App;
