import { useState } from 'react';
import DatePicker from 'react-date-picker';
export default function MessageSearchActions({
  handleCloseSearch,
  handleSearch,
  handleChangeDate
}) {
  const [startDate, setStartDate] = useState(null);
  const setDate = (date) => {
    if(date) {
      const finishDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      handleChangeDate(finishDate);
    } else {
      handleChangeDate('');
    }
    setStartDate(date);
  };
  return (
    <div className={'message-search-actions'}>
      <DatePicker
        className={`date-picker search-date ${startDate ? '' : 'clean-date'}`}
        onChange={(date) => setDate(date)}
        locale={'en'}
        maxDate={new Date()}
        format={'YYYY-MM-DD'}
        value={startDate}
      />
      <button
        onClick={() => handleSearch()}
        className={'search'}
      >
        Search
      </button>
      <button
        className={'search-cancel'}
        onClick={() => handleCloseSearch()}
      >
        Cancel
      </button>
    </div>
  );
}
