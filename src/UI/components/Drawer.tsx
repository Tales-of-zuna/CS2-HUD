import React from "react";
import { createPortal } from "react-dom";
import { useThemes } from "../hooks";

interface DialogProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

export const Drawer = ({ children, onClose, open }: DialogProps) => {
  const { theme } = useThemes();
  const className = open
    ? "translate-x-0 opacity-100 "
    : "-translate-x-full opacity-0";
  return createPortal(
    <div className={theme}>
      <div
        className={`${open ? "opacity-100" : "hidden opacity-0"} fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/70 transition-all lg:hidden`}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 z-30 flex h-screen w-32 flex-col bg-background-secondary transition-transform lg:hidden ${className} px-2`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
