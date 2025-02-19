import * as I from "./types";
// import { MapConfig } from "../HUD/Radar/LexoRadar/maps";
export const port = 1349;
export const apiUrl = `http://localhost:${port}`;

export async function apiV2(url: string, method = "GET", body?: any) {
  const options: RequestInit = {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  let data: any = null;
  // return fetch(`${apiUrl}api/${url}`, options)
  return fetch(`${apiUrl}${url}`, options).then((res) => {
    data = res;
    return res.json().catch((_e) => data && data.status < 300);
  });
}

const api = {
  match: {
    getAll: async (): Promise<I.Match[]> => apiV2(`/matches`),
    getCurrent: async (): Promise<I.Match> => apiV2(`/current_match`),
  },
  camera: {
    get: (): Promise<{
      availablePlayers: { steamid: string; label: string }[];
      uuid: string;
    }> => apiV2("camera"),
  },
  teams: {
    getOne: async (id: string): Promise<I.Team> => apiV2(`/teams/${id}`),
    getAll: (): Promise<I.Team[]> => apiV2(`/teams`),
  },
  players: {
    getAll: async (steamids?: string[]): Promise<I.Player[]> =>
      apiV2(steamids ? `/players?steamids=${steamids.join(";")}` : `/players`),
    getAvatarURLs: async (
      steamid: string
    ): Promise<{ custom: string; steam: string }> =>
      apiV2(`/players/avatar/steamid/${steamid}`),
  },
  tournaments: {
    get: () => apiV2("/tournament"),
  },
  // maps: {
  //   get: (): Promise<{ [key: string]: MapConfig }> => apiV2("radar/maps"),
  // },
};

export default api;
