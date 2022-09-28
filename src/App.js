import './assets/styles/App.css';
import ChatWrapper from './components/ChatWrapper';
import RoomsApi from './services/api/modules/RoomsApi';
import { Provider } from 'react-redux';
import { store } from './store';
import { useState } from 'react';

function App() {
  const userExternalUuid = '8445d2f8-34ce-11ed-a261-0242ac120002';
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

  return (
    <Provider store={store}>
      <h1>Super chat APP</h1>
      <button onClick={() => createRoom(roomName,membersUuid)}>Create room</button>
      <ChatWrapper userExternalUuid={userExternalUuid} />
    </Provider>
  );
}

export default App;
