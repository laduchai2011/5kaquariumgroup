import { createContext } from "react";
import type { OrderContextInterface } from "./type";

export const OrderContext = createContext<OrderContextInterface| undefined>(undefined);