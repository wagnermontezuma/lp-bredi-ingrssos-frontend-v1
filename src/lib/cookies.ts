"use client";

import Cookies from "js-cookie";

export const cookieNames = {
  authToken: "bredi-auth-token",
} as const;

export function setCookie(name: string, value: string, days = 7) {
  Cookies.set(name, value, { expires: days });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}
