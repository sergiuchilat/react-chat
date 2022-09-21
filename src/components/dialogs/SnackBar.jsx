import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from 'store/snackbarSlice';

export default function CustomSnackbar() {

  const snackbar = useSelector((state) => state.snackbar);
  const verticalPosition = snackbar.vertical || 'bottom';
  const horizontalPosition = snackbar.horizontal || 'right';

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  const action = (
    <IconButton
      size={'small'}
      aria-label={'close'}
      color={'inherit'}
      onClick={handleClose}
    >
      <CloseIcon fontSize={'small'} />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={snackbar.showed}
        autoHideDuration={snackbar.timeout}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: verticalPosition, horizontal: horizontalPosition }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.color}
        >
          { snackbar.message }
        </Alert>
      </Snackbar>

    </div>
  );
}
