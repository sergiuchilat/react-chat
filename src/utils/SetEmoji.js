export const SetEmoji = (emoji, inputDom, message, setMessage) => {
  const cursor = inputDom.current.selectionStart;
  setMessage(message.slice(0, cursor) + emoji + message.slice(cursor));
  inputDom.current.focus();
};
