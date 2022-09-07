import RoomsList from "components/rooms/list/RoomsList";
import RoomItem from "components/rooms/item/RoomItem";
import {useState} from "react";

export default function ChatWrapper(){

    const [selectedRoom, setSelectedRoom] = useState(0)

    const onRoomSelectHandle = (roomId) => {
        setSelectedRoom(roomId)
    }

    return (
        <div id={'wrapper'}>
            <RoomsList onSelect={onRoomSelectHandle}/>
            <RoomItem id={selectedRoom}/>
        </div>
    )
}