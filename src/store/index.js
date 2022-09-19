import { configureStore } from '@reduxjs/toolkit';
import RoomsSlice from './Rooms';
export const store = configureStore({
  reducer: {
    rooms: RoomsSlice,
  }
});