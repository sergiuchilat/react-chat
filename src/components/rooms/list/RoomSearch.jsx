
export default function RoomSearch({onSearch}){

    const handleSearch = (e) => {
        console.log(e.target.value)
        console.log('ooo')
        onSearch(e.target.value)
    }

    return (
        <div className={'rooms-search'}>
            <input type="text" onInput={handleSearch}/>
        </div>
    )
}