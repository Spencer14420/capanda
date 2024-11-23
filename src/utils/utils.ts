import { CONFIG } from "../constants/config";

//Contains helper methods for DOM manipulation and calculations.
export class Utils {
  //Returns the Y-coordinate of an element relative to the document, taking into account the current scroll position.
  static getElementY(el: HTMLElement): number {
    return el.getBoundingClientRect().y + window.scrollY;
  }

  // Applies a set of styles to a given element by iterating over the styles object.
  static setElementStyle(
    el: HTMLElement | null,
    styles: { [key: string]: string },
  ): void {
    if (!el) return;
    Object.entries(styles).forEach(([key, value]) => {
      (el.style as any)[key] = value;
    });
  }
}
