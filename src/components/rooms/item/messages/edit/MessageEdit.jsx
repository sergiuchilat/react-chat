import MessageEditActions from './MessageEditActions';

export default function MessageEdit({ updatingMessage, handleUpdateMessage, handleChangeUpdatingMessage, handleDeleteMessage }) {
  return (
    <div className={'message-create'}>
      <input
        placeholder={'Type your message...'}
        value={updatingMessage.text}
        onChange={(e) => handleChangeUpdatingMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleUpdateMessage(updatingMessage.uuid)}
        className={'rooms-search-input rooms-message-input'}
        type={'text'}
      />
      <MessageEditActions
        handleUpdateMessage={handleUpdateMessage}
        updatingMessage={updatingMessage}
        handleDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
}
