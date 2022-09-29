import search from '../../../../assets/img/icons/loupe.svg';
import MessageSearchActions from './MessageSearchActions';

export default function MessageSearch({
  handleCloseSearch,
  handleSearchInput,
  handleSearch,
  handleChangeDate
}) {
  return (
    <div className={'message-search'}>
      <div className={'message-search-inner'}>
        <img
          width={16}
          height={16}
          src={search}
          alt={'search'}
          style={{ marginRight: 10 }}
        />
        <input
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={'Search Message'}
          className={'message-search-input'}
          type={'text'}
        />
      </div>
      <MessageSearchActions
        handleCloseSearch={handleCloseSearch}
        handleSearch={handleSearch}
        handleChangeDate={handleChangeDate}
      />
    </div>
  );
}
