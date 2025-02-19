import { NavLogo } from "./NavLogo";
import { RouteSelect } from "./RouteSelect";
import "./sidebar.css";
import { AccountToggle } from "./AccountControls";

export const Sidebar = () => {
  return (
    <section
      id="Sidebar"
      className="hidden w-28 flex-col justify-between bg-background-secondary px-2 pb-4 lg:flex"
    >
      <NavLogo />
      <RouteSelect />
      <AccountToggle />
    </section>
  );
};
