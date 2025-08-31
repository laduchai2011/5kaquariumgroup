import { createContext } from "react";
import { FishCodeContextInterface } from "./type";

export const FishCodeContext = createContext<FishCodeContextInterface| undefined>(undefined);