import path from "path";
import { app } from "electron";
import { isDev, userHasCustomHud } from "./util.js";

/* Determine preload path based on if we are in dev */
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}

// Path to our database file (stored in appdata for openhud)
export function getDatabasePath() {
  return path.join(app.getPath("userData"), "database.db");
}

// Needed for verifying URL
export function getUIPath() {
  return path.join(app.getAppPath() + "/dist-react/index.html");
}

// Path for Assets (images, icons, ect)
export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}

export function getCustomHudPath() {
  return path.join(app.getPath("home"), "OpenHud-Huds/build");
}

// Default HUD path
export function getDefaultHUDPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/src/assets/defaultHud"
  );
}

/* If a user has a custom HUD, use that path, otherwise use the default path */
export function getHudPath() {
  return userHasCustomHud ? getCustomHudPath() : getDefaultHUDPath();
}
