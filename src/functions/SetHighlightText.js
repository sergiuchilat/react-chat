export const setHighlightText = (message, highlight) => {
  const parts = message.split(new RegExp(`(${highlight})`, 'gi'));
  return <span>
    { parts.map((part, i) =>
      <span
        key={i}
        style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color:'#30ec23' } : {} }
      >
        { part }
      </span>)}
  </span>;
};
