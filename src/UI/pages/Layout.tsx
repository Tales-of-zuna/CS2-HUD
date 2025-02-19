import { Sidebar } from "./Sidebar";
import { AppFrame, MainPanel } from "./MainPanel";
import { useThemes } from "../hooks";
import { NavLogo } from "./Sidebar/NavLogo";
import { RouteSelect } from "./Sidebar/RouteSelect";
import { Drawer } from "../components/Drawer";
import { AccountToggle } from "./Sidebar/AccountControls";
import { useState } from "react";
export const Layout = () => {
  const { theme } = useThemes();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerContent = (
    <div
      className="relative flex size-full flex-col justify-between bg-background-secondary py-2"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <div>
        <NavLogo />
        <RouteSelect />
      </div>
      <AccountToggle />
    </div>
  );
  return (
    <div
      className={`${theme} flex h-screen w-screen flex-col bg-background-secondary text-text`}
    >
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
      {/* Top Bar */}
      <AppFrame toggleDrawer={() => setDrawerOpen(!drawerOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex flex-1 flex-col">
          {/* Main Section Top Bar */}
          {/* <div className="h-12 bg-zinc-600 p-4">
            <h2>Main Section Top Bar</h2>
          </div> */}

          {/* Main Section Middle (Scrollable) */}
          <MainPanel />

          {/* Main Section Bottom Bar */}
          {/* <div className="h-12 bg-zinc-600 p-4">
            <h2>Main Section Bottom Bar</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};
