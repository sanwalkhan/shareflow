import React, { createContext, useContext } from "react";

export type PageType =
  | "dashboard"
  | "leave"
  | "annual"
  | "sick"
  | "recall";

type HrNavigationContextType = {
  goToDashboard: () => void;
  goToLeave: () => void;
  goToAnnual: () => void;
  goToSick: () => void;
  goToRecall: () => void;
};

const HrNavigationContext =
  createContext<HrNavigationContextType | undefined>(undefined);

export const useHrNavigation = () => {
  const ctx = useContext(HrNavigationContext);
  if (!ctx) {
    throw new Error(
      "useHrNavigation must be used inside HrNavigationProvider"
    );
  }
  return ctx;
};

export const HrNavigationProvider = HrNavigationContext.Provider;
