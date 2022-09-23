import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showed: false,
  title: '',
  message: '',
  width: '300',
  answer: false,
};

export const alertDialogSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.showed = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.color = action.payload.color;
      state.width = action.payload.width;
    },
    cancelAlert: (state) => {
      state.answer = false;
      state.showed = false;
    },
    acceptAlert: (state) => {
      state.answer = true;
      state.showed = false;
    }
  }
});

export const { showAlert, cancelAlert, acceptAlert } = alertDialogSlice.actions;

export default alertDialogSlice.reducer;
