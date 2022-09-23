import { useDispatch, useSelector } from 'react-redux';
import { acceptAlert, cancelAlert } from '../../store/AlertDialogSlice';

export default function AlertDialog({ acceptDialog }) {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cancelAlert());
  };

  const handleAccept = () => {
    dispatch(acceptAlert());
    acceptDialog();
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
      <div className={'alert-actions'}>
        <button
          className={'alert-cancel'}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className={'alert-accept'}
          onClick={handleAccept}
          autoFocus
        >
            Agree
        </button>
      </div>
    </div>
  );
}
