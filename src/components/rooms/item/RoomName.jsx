import search from '../../../assets/img/icons/loupe.svg';

export default function RoomName({ isHeader, name, handlerSearch }) {
  return (
    <div className={`room-name ${isHeader ? 'with-header': ''}`}>
      <div className={'room-name-title'}>{name}</div>
      <button
        className={'room-search-btn'}
        onClick={() => handlerSearch()}
      >
        <img
          width={25}
          height={25}
          src={search}
          alt={'search'}
        />
      </button>
    </div>
  );
}
