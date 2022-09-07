import RoomsList from "components/rooms/list/RoomsList";
import RoomItem from "components/rooms/item/RoomItem";

export default function ChatWrapper(){
    return (
        <div id={'wrapper'}>
            <RoomsList/>
            <RoomItem name={'Test'}/>
        </div>
    )
}