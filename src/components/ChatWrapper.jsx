import RoomsList from 'components/rooms/list/RoomsList';
import RoomItem from 'components/rooms/item/RoomItem';

export default function ChatWrapper({ userExternalUuid, logo, title }) {

  return (
    <div className={'container'}>
      {(logo || title) && <div className={'chat-header'}>
        <img
          src={logo}
          alt={'logo'}
        />
        <div>{title}</div>
      </div>}
      <div id={'wrapper'}>
        <RoomsList />
        <RoomItem userExternalUuid={userExternalUuid} />
      </div>
    </div>

  );
}
