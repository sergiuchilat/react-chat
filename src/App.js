import './assets/styles/App.css';
import ChatWrapper from './components/ChatWrapper';
import RoomsApi from './services/api/modules/RoomsApi';

function App() {
  const addMember = async (roomUuid, userUuid) => {
    try {
      await (new RoomsApi()).addMember(roomUuid,{
        external_user_uuid: userUuid,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createRoom = async () => {
    try {
      const response = await (new RoomsApi()).createRoom({
        name: `room-${Math.trunc(Math.random() * 10)}`,
        avatar_link: 'link',
      });
      await addMember(response.data.uuid, 'c54cf8e0-34cd-11ed-a261-0242ac120002');
      await addMember(response.data.uuid, '8445d2f8-34ce-11ed-a261-0242ac120002');
    } catch (e) {
      console.log(e);
    }
  };
  const delRoom = async () => {
    try {
      await (new RoomsApi()).delRoom('ffefaa84-d59e-44a5-b019-54ba85811534', { uuid: 'ffefaa84-d59e-44a5-b019-54ba85811534' });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Super chat APP</h1>
      <button onClick={() => createRoom()}>
        Create room
      </button>
      <ChatWrapper />
    </>
  );
}

export default App;
