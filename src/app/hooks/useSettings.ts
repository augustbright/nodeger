import { useQuery } from "react-query";
import { API } from "../../shared/const";

export const useSettings = () => useQuery(API.SETTINGS.GET, () => api.settings.get());