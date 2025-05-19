import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Branch {
  id: string;
  name: string;
  address: string;
}

interface BranchState {
  branches: Branch[];
}

const initialState: BranchState = {
  branches: []
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranches(state, action: PayloadAction<Branch[]>) {
      state.branches = action.payload;
    },
    clearBranchs(state) {
      state.branches = [];
    },
  },
});

export const { setBranches, clearBranchs } = branchSlice.actions;
export default branchSlice.reducer;
