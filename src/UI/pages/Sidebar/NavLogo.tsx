import { NavLink } from "react-router-dom";

export const NavLogo = () => {
  return (
    <div className="relative flex h-16 w-full shrink-0 items-center justify-center border-b border-border">
      <NavLink
        id="HomeLogo"
        to="/"
        className="relative flex h-16 w-full items-center justify-center rounded-lg p-2"
      >
        <span className="noDrag text-5xl font-bold text-primary-light">O</span>
        <span className="noDrag text-5xl font-bold text-text">H</span>
      </NavLink>
    </div>
  );
};
