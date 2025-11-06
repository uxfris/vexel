"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
