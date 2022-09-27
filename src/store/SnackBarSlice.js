import { createSlice } from '@reduxjs/toolkit';

const parsePosition = (position) => {
  let vertical = 'bottom';
  let horizontal = 'right';
  if([
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ].includes(position)){
    [vertical, horizontal] = position.split('-');
  }

  return {
    vertical,
    horizontal
  };
};

const initialState = {
  showed: false,
  color: '',
  message: '',
  timeout: 0,
  vertical: 'bottom',
  horizontal: 'right'
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.color = action.payload.color;
      state.message = action.payload.message;
      state.timeout = action.payload.timeout;
      const position = parsePosition(action.payload.position);
      state.vertical = position.vertical;
      state.horizontal = position.horizontal;
      state.showed = true;
    },
    hideSnackbar: (state) => {
      state.showed = false;
    }
  }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;