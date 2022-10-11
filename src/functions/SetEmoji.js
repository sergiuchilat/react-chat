export const SetEmoji = (emoji, inputDom, message, setMessage) => {
  const cursor = inputDom.current.selectionStart;
  if(typeof message === 'object') {
    const textWithEmoji = message.text.slice(0, cursor) + emoji + message.text.slice(cursor);
    setMessage({ ...message, text: textWithEmoji });
  } else {
    setMessage(message.slice(0, cursor) + emoji + message.slice(cursor));
  }
  inputDom.current.focus();
};
