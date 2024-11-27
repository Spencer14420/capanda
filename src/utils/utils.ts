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

  //Calculates an additional value based on available area and panel height, used for positioning logic.
  static calculateAddition(
    useableArea: number,
    largestPanelHeight: number,
  ): number {
    return useableArea < largestPanelHeight + CONFIG.minTopBottomSpace * 2
      ? CONFIG.shortScreenAddition
      : CONFIG.largeScreenAddition;
  }

  // Renders the turnstile widget size based on the screen width.
  static updateTurnstileWidget(): void {
    const container = document.querySelector(
      "#turnstile-container",
    ) as HTMLElement;

    if (!container) {
      return;
    }

    const screenWidth = window.innerWidth;
    const widgetSize =
      screenWidth < CONFIG.turnstileCompactSize ? "compact" : "normal";

    if (container.getAttribute("data-size") === widgetSize) {
      return;
    }

    // Re-render the Turnstile widget with the new size
    container.innerHTML = "";
    turnstile.render(container, {
      sitekey: CONFIG.turnstileSiteKey,
      size: widgetSize,
    });
  }

  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timeoutId: number | undefined;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}
