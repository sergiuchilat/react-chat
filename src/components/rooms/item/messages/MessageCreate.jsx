import MessageCreateActions from './MessageCreateActions';

export default function MessageCreate({ message, handleChangeMessage, handleSubmitMessage, setEmoji }) {

  return (
    <div className={'message-create'}>
      <input
        placeholder={'Type your message...'}
        value={message}
        onChange={(e) => handleChangeMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmitMessage(e.target.value)}
        className={'rooms-search-input rooms-message-input'}
        type={'text'}
      />
      <MessageCreateActions
        handleSubmitMessage={handleSubmitMessage}
        setEmoji={setEmoji}
      />
    </div>
  );
}
