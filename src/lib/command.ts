export const COMMAND_OPEN_EVENT = 'venziq-open-command'

/** Open the command palette from anywhere (e.g. the nav trigger). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_OPEN_EVENT))
}
