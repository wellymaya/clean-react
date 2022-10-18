import { createContext } from 'react';

type ContextProps = {
  isLoading: boolean;
  errorMessage: boolean;
};

export default createContext<ContextProps>({} as ContextProps);
