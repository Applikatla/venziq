export const COMMAND_OPEN_EVENT = 'venziq-open-command'
export const HELP_OPEN_EVENT = 'venziq-open-help'

/** Open the command palette from anywhere (e.g. the nav trigger). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_OPEN_EVENT))
}

/** Open the keyboard / features help overlay. */
export function openHelp() {
  window.dispatchEvent(new Event(HELP_OPEN_EVENT))
}
