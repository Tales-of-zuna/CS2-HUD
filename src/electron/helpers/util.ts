import {
  app,
  ipcMain,
  Notification,
  shell,
  WebContents,
  WebFrameMain,
} from "electron";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export let userHasCustomHud: boolean;

/* Tells our electron script if we are in development mode or not */
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
// Using generics to set the type of key which determines the handler type
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(key, (event) => {
    // Verify the url the user is accessing the fil from
    if (event.senderFrame) {
      validateEventFrame(event.senderFrame);
    }
    return handler();
  });
}
export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void,
) {
  ipcMain.on(key, (event, payload) => {
    // Verify the url the user is accessing the fil from
    if (event.senderFrame) {
      validateEventFrame(event.senderFrame);
    }
    return handler(payload);
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key],
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
  // verify when in dev mode
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  // if request comes from something other than our index.html file
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Frame URL Error: possible malicious event");
  }
}

function createMissingDir(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

// Ensure we have a userData folder and a Huds folder to store custom built huds
export function checkDirectories() {
  const userData = app.getPath("userData");
  const customHudDir = path.join(app.getPath("home"), "ESN-Huds");
  [customHudDir, userData].forEach(createMissingDir);

  /* Check to see if the user has a custom hud loaded */
  const customHudData = path.join(
    app.getPath("home"),
    "ESN-Huds/build/index.html",
  );

  if (fs.existsSync(customHudData)) {
    userHasCustomHud = true;
  } else {
    userHasCustomHud = false;
  }
}

export function showNotification(body: string) {
  new Notification({
    title: "ESN:",
    body,
  }).show();
}

export function esnsDirectory() {
  const customHudDir = path.join(app.getPath("home"), "ESN-Huds");
  shell.openPath(customHudDir); // ✅ Correct way to open the folder
}
