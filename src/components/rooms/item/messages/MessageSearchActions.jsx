import calendar from '../../../../assets/img/icons/calendar.png';

export default function MessageSearchActions({ handlerSearch }) {
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
        className={'search'}
      >
        Search
      </button>
      <button
        className={'search-cancel'}
        onClick={ () => handlerSearch() }
      >
        Cancel
      </button>
    </div>
  );
}
