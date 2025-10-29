// utils/authBus.ts
export const AUTH_EVENT = "auth:changed";

export function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
}
