import { createContext } from "react";
import { MyOrderContextInterface } from "./type";

export const MyOrderContext = createContext<MyOrderContextInterface| undefined>(undefined);