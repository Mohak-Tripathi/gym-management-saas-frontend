// store/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';


interface User {
  userId: string;
  role: string;
  gymId: string;
  gymBranchId: string | null;
}

interface LoggedInUserData {
  token: string;
  user: User;
}

interface UserState {
  loggedinUserData: LoggedInUserData | null;
}

const initialState: UserState = {
  loggedinUserData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: { payload: LoggedInUserData }) {
      console.log(action.payload, "action.payload")
      state.loggedinUserData = action.payload;
      
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
