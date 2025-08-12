import type { Media } from "$lib";

const LAST_WATCHED_KEY = "last_watched";

export function lastWatched(): Media[] {
  const res = localStorage.getItem(LAST_WATCHED_KEY);
  if (res == null) {
    return [];
  }

  return JSON.parse(res);
}

export function justWatched(newMedia: Media) {
  const oldList = lastWatched().filter((m): boolean => {
    return m.id != newMedia.id;
  });
  const newList = [newMedia, ...oldList];
  console.log(newList);
  localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(newList));
}

export function removeLastWatched() {
  const list = lastWatched();
  list.shift();
  localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(list));
}
