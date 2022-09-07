export default function RoomItem({id, name, onSelect}){

    return (
        <div onClick={() => {onSelect(id)}}>
            <div>{name}</div>
        </div>
    )
}