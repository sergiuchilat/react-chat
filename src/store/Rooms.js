import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RoomsApi from '../services/api/modules/RoomsApi';

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async function(_, {rejectWithValue}) {
    try {
      const response = await (new RoomsApi()).getRoomsList();
      if(response.data) {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
)

export const RoomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    roomsList: [],
    status: null,
    error: null,
    selectedRoom: null,
  },
  reducers: {
    selectRoom: (state,{payload}) => {
      state.selectedRoom = payload;
    }
  },
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      state.status = 'loading';
      state.error = null
    },
    [fetchRooms.fulfilled]: (state, {payload}) => {
      state.status = 'resolved';
      state.roomsList = payload
    },
    [fetchRooms.rejected]: (state, {payload}) => {
      state.status = 'rejected'
      state.error = payload
    }
  }
});

export const {selectRoom} = RoomsSlice.actions;
export default RoomsSlice.reducer;