import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RoomsApi from '../../services/api/modules/RoomsApi';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async function(filter, { rejectWithValue }) {
    try {
      const response = await (new RoomsApi()).getList(filter);
      if(response.data) {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
const initialState = {
  roomsList: [],
  status: null,
  error: null,
  selectedRoom: null,
  selectedMessageUuid: null,
};
export const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom: (state,{ payload }) => {
      state.selectedRoom = payload;
    },
    setRead: (state, { payload }) => {
      const room = state.roomsList.find(item => item.uuid === payload);
      room.unread_messages = null;
    },
    selectForwardMessage: (state, { payload }) => {
      state.selectedMessageUuid = payload;
    },
    setLastRoomMessage: (state, { payload }) => {
      const selectedRoom = state.roomsList.findIndex(room => room.uuid === state.selectedRoom);
      state.roomsList[selectedRoom].last_message = payload;
    }
  },
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchRooms.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
      state.roomsList = payload;
    },
    [fetchRooms.rejected]: (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload;
    }
  }
});

export const { selectRoom, setRead, selectForwardMessage, setLastRoomMessage } = RoomsSlice.actions;
export default RoomsSlice.reducer;
