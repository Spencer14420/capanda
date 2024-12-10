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

  // Gets a CSRF token from the server
  static async getCsrfToken(): Promise<string | null> {
    const apiEndpoint = "./api.php?action=getCSRFToken";

    try {
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        console.error(`Error, status: ${response.status}`);
        return null;
      }

      const data = await response.json();

      if (data && data.token) {
        return data.token;
      } else {
        console.error("Token not found in the response.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching the CSRF token:", error);
      return null;
    }
  }

  // Sets the CSRF token in the contact form input field
  static async setCsrfToken(): Promise<void> {
    const csrfTokenInput = document.getElementById(
      "SpCsrfToken",
    ) as HTMLInputElement;
    if (!csrfTokenInput) {
      console.error('Input element with id "SpCsrfToken" not found.');
      return;
    }

    try {
      const token = await Utils.getCsrfToken();
      if (!token) {
        console.error("Failed to fetch a valid CSRF token.");
        return;
      }

      csrfTokenInput.value = token;
    } catch (error) {
      console.error("Error setting the CSRF token:", error);
    }
  }

  //Reloads turnstile and regenerates the CSRF token for the contact form
  static refreshContactForm(): (responseData: Record<string, any>) => void {
    return (responseData: Record<string, any>) => {
      this.updateTurnstileWidget();
      this.setCsrfToken();
    };
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
