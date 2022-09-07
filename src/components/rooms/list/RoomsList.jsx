import RoomItem from "./RoomItem";
import RoomSearch from "./RoomSearch";

export default function RoomsList(){
    return (
        <div>
            <RoomSearch/>
            <div className={'rooms-list'}>
                <RoomItem name={'Victor'}/>
                <RoomItem name={'Power IT'}/>
                <RoomItem name={'Some chat'}/>
            </div>
        </div>
    )
}