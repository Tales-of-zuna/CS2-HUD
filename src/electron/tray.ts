import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./helpers/index.js";

export function createTray(mainWindow: BrowserWindow) {
  /* 
  Tray Icon
  to add template icons for mac os: 
  new Tray(path.join(getAssetPath(), process.platform === 'darwin' ? "iconTemplate.png" : "icon.png"));
  */

  const tray = new Tray(path.join(getAssetPath(), "icon.png"));

  tray.setContextMenu(
    /* Tray menu items */
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]),
  );
}
