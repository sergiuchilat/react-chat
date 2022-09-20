import calendar from '../../../../assets/img/icons/calendar.png';

export default function MessageSearchActions({
  handleCloseSearch,
  handleSearch,
}) {
  return (
    <div className={'message-search-actions'}>
      <button className={'search-date'}>
        <img
          width={20}
          height={20}
          src={calendar}
          alt={'calendar'} 
        />
      </button>
      <button
        onClick={() => handleSearch()}
        className={'search'}
      >
        Search
      </button>
      <button
        className={'search-cancel'}
        onClick={() => handleCloseSearch()}
      >
        Cancel
      </button>
    </div>
  );
}
