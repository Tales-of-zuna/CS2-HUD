import { MdLogout } from "react-icons/md";
import Patreon from "../../assets/patreon.svg";

export const Plan = () => {
  return (
    <div
      id="Plan"
      className="relative flex items-center justify-between rounded-lg bg-background-primary text-xs text-text"
    >
      <button
        className="relative flex size-full items-center justify-center rounded-l-lg bg-border px-3 py-2 transition-colors hover:bg-primary"
        onClick={() =>
          window.electron.openExternalLink("https://www.patreon.com/JTMythic")
        }
      >
        <p className="text-center font-bold">Support on Patreon</p>
        <img
          className="flex size-4 items-center justify-center"
          src={Patreon}
          alt="Patreon"
        />
      </button>
      <button className="relative flex h-full items-center overflow-hidden rounded-r-lg p-1 transition-colors hover:bg-red-400">
        <MdLogout className="size-5 shrink-0" />
      </button>
    </div>
  );
};
