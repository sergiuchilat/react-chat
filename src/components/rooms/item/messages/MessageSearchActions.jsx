import { useState } from 'react';
import DatePicker from 'react-date-picker';
import Tooltip from '../../../common/Tooltip';
export default function MessageSearchActions({
  handleCloseSearch,
  handleSearch,
  handleSearchInput
}) {
  const [startDate, setStartDate] = useState(null);
  const setDate = (date) => {
    if(date) {
      const finishDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      handleSearchInput('date',finishDate);
    } else {
      handleSearchInput('date','');
    }
    setStartDate(date);
  };
  return (
    <div className={'message-search-actions'}>
      <Tooltip title={'Date'}>
        <DatePicker
          className={`date-picker search-date ${startDate ? '' : 'clean-date'}`}
          onChange={(date) => setDate(date)}
          locale={'en'}
          maxDate={new Date()}
          format={'YYYY-MM-DD'}
          value={startDate}
        />
      </Tooltip>

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
