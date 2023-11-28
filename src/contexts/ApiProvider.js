import { createContext, useContext } from "react";
import MicroblogApiClient from "../MicroblogApiClient";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const api = new MicroblogApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
}

export default ApiProvider