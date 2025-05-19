import { getRequest } from "@/lib/services/request";
import { setBranches } from "@/lib/store/slices/branchSlice";
import { setSelectedBranch } from "@/lib/store/slices/selectedBranchSlice";

export const fetchAllBranches = async (dispatch: any) => {
  try {
    const data = await getRequest("/api/gym-branch");
    // Only keep required fields
    const simplifiedBranches = data.map((branch: any) => ({
      id: branch.id,
      name: branch.name,
      address: branch.address
    }));

    // Dispatch to Redux
    dispatch(setBranches(simplifiedBranches));
    if (simplifiedBranches.length > 0) {
      dispatch(setSelectedBranch(simplifiedBranches[0]));
    } else {
      dispatch(setSelectedBranch(null));
    }
  } catch (error) {
    console.log(error, "Error fetching branches");
  }
};