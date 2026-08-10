import type { ShortenResult } from "../types";

export const ITEMS_PER_PAGE = 5;
export const HISTORY_KEY = "jsonviz_shorten_history";

export const getHistory = (): ShortenResult[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveHistory = (items: ShortenResult[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 50)));
};

export const isValidUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
