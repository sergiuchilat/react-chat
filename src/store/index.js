import { configureStore } from '@reduxjs/toolkit';
import RoomsSlice from './RoomsSlice';
import AlertDialogSlice from './AlertDialogSlice';
import SnackBarSlice from './SnackBarSlice';
export const store = configureStore({
  reducer: {
    rooms: RoomsSlice,
    alert: AlertDialogSlice,
    snackBar: SnackBarSlice
  }
});
