import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedBranch {
  id: string;
  name: string;
  address: string;
}

interface SelectedBranchState {
  selectedBranch: SelectedBranch | null;
}

const initialState: SelectedBranchState = {
  selectedBranch: null,
};

const selectedBranchSlice = createSlice({
  name: "selectedBranch",
  initialState,
  reducers: {
    setSelectedBranch(state, action: PayloadAction<SelectedBranch | null>) {
      state.selectedBranch = action.payload;
    },
    clearSelectedBranch(state) {
      state.selectedBranch = null;
    },
  },
});

export const { setSelectedBranch, clearSelectedBranch } = selectedBranchSlice.actions;
export default selectedBranchSlice.reducer;