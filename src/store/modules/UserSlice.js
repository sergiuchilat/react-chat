import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userExternalUuid: '8445d2f8-34ce-11ed-a261-0242ac120002',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserExternalUuid: (state, { payload }) => {
      state.userExternalUuid = payload;
    },
  }
});

export const { changeUserExternalUuid } = userSlice.actions;

export default userSlice.reducer;