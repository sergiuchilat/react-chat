import { configureStore } from '@reduxjs/toolkit';
import RoomsSlice from './modules/RoomsSlice';
import AlertDialogSlice from './modules/AlertDialogSlice';
import SnackBarSlice from './modules/SnackBarSlice';
import UserSlice from './modules/UserSlice';

export const store = configureStore({
  reducer: {
    rooms: RoomsSlice,
    alert: AlertDialogSlice,
    snackBar: SnackBarSlice,
    user: UserSlice
  }
});
