import { useContext } from "react";
import { IPCStatusContext } from "../components/IPCStatusProvider/IPCStatusProvider";

export const useIPCStatus = () => useContext(IPCStatusContext);
