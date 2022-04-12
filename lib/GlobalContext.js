import { createContext, useState } from "react";

export const GlobalContext = createContext(undefined);
const GlobalContextProvider = ({ children }) => {
  const [doRefrash, setDoRefrash] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        doRefrash,
        setDoRefrash,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
