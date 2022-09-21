import RoomsList from 'components/rooms/list/RoomsList';
import RoomItem from 'components/rooms/item/RoomItem';
import { useState } from 'react';

export default function ChatWrapper({ userExternalUuid }) {


  return (
    <div id={'wrapper'}>
      <RoomsList />
      <RoomItem userExternalUuid={userExternalUuid} />
    </div>
  );
}
