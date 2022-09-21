import { useDispatch, useSelector } from 'react-redux';
import { acceptAlert, cancelAlert } from '../../store/AlertDialogSlice';

export default function AlertDialog() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cancelAlert());
  };

  const handleAccept = () => {
    dispatch(acceptAlert());
  };

  return (
    <div
      className={'alert-dialog'}
      style={{ maxWidth: alert.width }}
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
        <button onClick={handleClose}>Cancel</button>
        <button
          onClick={handleAccept}
          autoFocus
        >
            Agree
        </button>
      </div>
    </div>
  );
}
