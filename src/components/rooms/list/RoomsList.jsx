import RoomItem from "./RoomItem";
import RoomSearch from "./RoomSearch";
import {useEffect, useState} from "react";
import RoomsApi from "services/api/modules/RoomsApi";

export default function RoomsList({ onSelect }){
    const [rooms, seRooms] = useState([]);

    const fetchRoomsList = async () => {
        try {
            const response = await (new RoomsApi()).get();
            seRooms(response);
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchRoomsList();
    }, [rooms]);

    const onRoomSelectHandle = (roomId) => {
        onSelect(roomId)
    }

    return (
        <div>
            <RoomSearch/>
            <div className={'rooms-list'}>
                {
                    rooms && rooms.map(room => (
                        <RoomItem
                            name={room.name}
                            id={room.id}
                            key={room.id}
                            onSelect={onRoomSelectHandle}
                        />
                    ))
                }
            </div>
        </div>
    )
}