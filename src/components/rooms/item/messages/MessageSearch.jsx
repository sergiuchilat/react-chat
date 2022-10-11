import search from '../../../../assets/img/icons/loupe.svg';
import MessageSearchActions from './MessageSearchActions';

export default function MessageSearch({
  handleCloseSearch,
  handleSearchInput,
  handleSearch,
  isHeader
}) {
  return (
    <div className={`message-search ${isHeader ? 'with-header': ''}`}>
      <div className={'message-search-inner'}>
        <img
          width={16}
          height={16}
          src={search}
          alt={'search'}
          style={{ marginRight: 10 }}
        />
        <input
          onChange={(e) => handleSearchInput('text', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={'Search Message'}
          className={'message-search-input'}
          type={'text'}
        />
      </div>
      <MessageSearchActions
        handleCloseSearch={handleCloseSearch}
        handleSearch={handleSearch}
        handleSearchInput={handleSearchInput}
      />
    </div>
  );
}
