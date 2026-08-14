import { API_URL } from "./api";

let cache = null;
let inflight = null;

export function peekSettings() {
  return cache;
}

export function getSettingsCached() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = fetch(`${API_URL}/settings`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load settings");
      return response.json();
    })
    .then((data) => {
      cache = data;
      inflight = null;
      return data;
    })
    .catch((error) => {
      inflight = null;
      throw error;
    });

  return inflight;
}
