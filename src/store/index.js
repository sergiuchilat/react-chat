import { configureStore } from '@reduxjs/toolkit';
import RoomsSlice from './RoomsSlice';
import AlertDialogSlice from './AlertDialogSlice';
export const store = configureStore({
  reducer: {
    rooms: RoomsSlice,
    alert: AlertDialogSlice
  }
});
