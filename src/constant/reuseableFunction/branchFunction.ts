import { getRequest } from "@/lib/services/request";
import { setBranches } from "@/lib/store/slices/branchSlice";

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

    } catch (error) {
      console.log(error, "Error fetching branches");
    }
  };