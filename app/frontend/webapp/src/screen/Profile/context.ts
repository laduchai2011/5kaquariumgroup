import { createContext } from "react";
import { ProfileContextInterface } from "./type";

export const ProfileContext = createContext<ProfileContextInterface| undefined>(undefined);