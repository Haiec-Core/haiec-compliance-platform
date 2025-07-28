import { useKey } from "rooks";

// Remaining arguments of useKey except first two
type UseSafeShortcutOptions = Parameters<typeof useKey>[2];

function isInputElementOrEditable(element: HTMLElement): boolean {
  const inputTags = [
    "INPUT",
    "TEXTAREA",
    "SELECT",
    "OPTION",
    "BUTTON",
    "PROGRESS",
    "METER",
  ];
  const inputRoles = [
    "textbox",
    "combobox",
    "listbox",
    "slider",
    "spinbutton",
    "switch",
    "searchbox",
  ];

  return (
    element.closest("form") !== null ||
    inputTags.includes(element.tagName) ||
    element.isContentEditable ||
    inputRoles.includes(element.getAttribute("role") || "") ||
    element.getAttribute("contenteditable") === "true"
  );
}

export function useSafeShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options?: UseSafeShortcutOptions,
) {
  useKey(
    key,
    (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        isInputElementOrEditable(event.target)
      ) {
        return;
      }

      event.preventDefault();
      callback(event);
    },
    options,
  );
}
