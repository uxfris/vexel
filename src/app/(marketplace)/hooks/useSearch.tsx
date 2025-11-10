"use client";

import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  open: boolean;
  searchToggle: () => void;
  close: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const searchToggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <SearchContext.Provider value={{ open, searchToggle, close }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useContext must be used within a SearchProvider");
  }
  return context;
};
