import { createContext } from 'react';
import type { context_type } from './type';

export const Context = createContext<context_type | undefined>(undefined);
