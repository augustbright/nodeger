import { useQuery } from "react-query";
import { API } from "../../shared/const";

export const useNVMLocalVersions = () => useQuery(API.NVM.LS_LOCAL, () => api.nvm.lsLocal());