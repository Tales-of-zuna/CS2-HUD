import { Outlet } from "react-router-dom";

export const PageContainer = () => {
  return (
    <div
      id="PageContainer"
      className="relative flex h-full w-full items-center justify-center overflow-y-auto bg-background-primary px-4 shadow-2xl lg:rounded-tl-lg"
    >
      <Outlet />
    </div>
  );
};
