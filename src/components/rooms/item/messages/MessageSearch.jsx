import search from '../../../../assets/img/icons/loupe.png';
import MessageSearchActions from './MessageSearchActions';

export default function MessageSearch({ handlerSearch }){
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
          placeholder={'Search Message'}
          className={'message-search-input'}
          type={'text'}
        />
      </div>
      <MessageSearchActions handlerSearch={ handlerSearch } />
    </div>
  );
}
