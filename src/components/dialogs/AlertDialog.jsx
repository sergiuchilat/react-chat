import { useDispatch, useSelector } from 'react-redux';
import { acceptAlert, cancelAlert } from '../../store/AlertDialogSlice';
import RoomsList from '../rooms/list/RoomsList';

export default function AlertDialog({ acceptDialog }) {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cancelAlert());
  };

  const handleAccept = () => {
    if(alert.confirmed) {
      dispatch(acceptAlert());
      acceptDialog();
    }
  };

  return (
    <div
      className={'alert-dialog'}
      style={{ width: alert.width }}
    >
      <h3 id={'alert-dialog-title'}>
        {alert.title}
      </h3>
      <div>
        <p id={'alert-dialog-description'}>
          {alert.message}
        </p>
      </div>
      {!alert.confirmed && <RoomsList forward />}
      <div className={'alert-actions'}>
        <button
          className={'alert-cancel'}
          onClick={handleClose}
        >
          Cancel
        </button>
        {alert.confirmed &&
        <button
          className={'alert-accept'}
          onClick={handleAccept}
          autoFocus
        >
            Agree
        </button>}
      </div>
    </div>
  );
}
