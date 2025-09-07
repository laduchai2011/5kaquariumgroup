import { createContext } from "react";
import { ProductContextInterface } from "./type";

export const ProductContext = createContext<ProductContextInterface| undefined>(undefined);