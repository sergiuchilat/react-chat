import RoomsList from 'components/rooms/list/RoomsList';
import RoomItem from 'components/rooms/item/RoomItem';
import { useState } from 'react';

export default function ChatWrapper() {


  return (
    <div id={'wrapper'}>
      <RoomsList />
      <RoomItem />
    </div>
  );
}
