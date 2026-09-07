/** Visible PIN length. Better Auth requires 8+ chars, so we pad on the wire. */
export const PIN_LENGTH = 6;
const PIN_PAD = "sb";

/** Live-preview roster only. Published desks keep the PIN you already chose. */
export const PREVIEW_DESK_PIN = "123456";

export function isValidPin(value: string): boolean {
  return new RegExp(`^\\d{${PIN_LENGTH}}$`).test(value);
}

export function pinToPassword(pin: string): string {
  return `${pin}${PIN_PAD}`;
}

export function deskHandle(name: string): string {
  const slug =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 16) || "desk";
  const rand = Math.random().toString(36).slice(2, 8);
  return `${slug}.${rand}@desk.strikebook.app`;
}

export function toneFromName(name: string): number {
  let n = 0;
  for (let i = 0; i < name.length; i++) n = (n + name.charCodeAt(i)) % 5;
  return n;
}

export function isTestDeskName(name: string | null | undefined): boolean {
  return (name ?? "").trim().toLowerCase() === "test";
}
