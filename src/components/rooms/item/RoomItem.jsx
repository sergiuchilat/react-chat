import RoomName from "./RoomName";
import MessageSearch from "./messages/MessageSearch";
import MessagesList from "./messages/MessagesList";
import MessageCreate from "./messages/MessageCreate";

export default function RoomItem({name}){
    return (
        <div>
            <RoomName name={name}/>
            <MessageSearch/>
            <MessagesList/>
            <MessageCreate/>
        </div>
    )
}