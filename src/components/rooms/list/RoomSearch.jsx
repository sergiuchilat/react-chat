export default function RoomSearch({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={'rooms-search'}>
      <input
        className={'rooms-search-input'}
        placeholder={'Search room'}
        type={'text'}
        onInput={handleSearch}
      />
    </div>
  );
}
