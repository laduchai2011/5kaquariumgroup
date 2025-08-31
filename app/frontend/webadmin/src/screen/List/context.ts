import { createContext } from "react";
import type { ListContextInterface } from "./type";

export const ListContext = createContext<ListContextInterface| undefined>(undefined);