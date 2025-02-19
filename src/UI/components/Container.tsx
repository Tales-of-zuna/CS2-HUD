import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container flex h-full flex-col items-center overflow-x-hidden">
      {children}
    </div>
  );
};
