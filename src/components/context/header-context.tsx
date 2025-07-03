"use client";

import { createContext, useContext, useState } from "react";

interface HeaderContextType {
  showBackButton: boolean;
  setShowBackButton: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <HeaderContext.Provider value={{ showBackButton, setShowBackButton }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used within HeaderProvider");
  return context;
};
