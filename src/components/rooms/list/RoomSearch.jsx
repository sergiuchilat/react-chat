
export default function RoomSearch({ onSearch }){

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={'rooms-search'}>
      <input
        type={'text'}
        onInput={handleSearch}
      />
    </div>
  );
}