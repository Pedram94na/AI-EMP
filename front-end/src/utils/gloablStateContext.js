import React, { createContext, useState, useContext } from "react";

const GlobalStateContext = createContext(); 

export const useGlobalState = () => useContext(GlobalStateContext);
export const GlobalStateProvider = ({ children }) => {
  const [signupClicked, setSignup] = useState(false); 
  const [signinClicked, setSignin] = useState(false);

  return (
    <GlobalStateContext value={{ signupClicked, setSignup, signinClicked, setSignin }}>
      {children}
    </GlobalStateContext>
  );
};
