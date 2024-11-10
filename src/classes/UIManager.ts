import { Utils } from "../utils/utils";
import { Panel } from "./Panel";
import { CONFIG } from "../constants/config";

//Responsible for managing UI-related operations such as panel visibility, text color, and header link highlighting.
export class UIManager {
  static toggleTopPanel(state: number): void {
    const topPanel = document.querySelector(".top-panel") as HTMLElement | null;
    if (topPanel) {
      Utils.setElementStyle(topPanel, {
        opacity: state === 1 ? "1" : "0",
      });
    }

    const panel2Element = document.querySelector(
      ".panel2",
    ) as HTMLElement | null;
    if (panel2Element) {
      const panel2 = new Panel(panel2Element, 2);
      Utils.setElementStyle(panel2.element, {
        opacity: "0",
        pointerEvents: state === 1 ? "none" : "auto",
      });
    }
  }

  //Updates the text color of all text within the specified panel.
  static textColour(colour: string, panel: number): void {
    const textElements = document.querySelectorAll(
      `${CONFIG.panelPrefix}${panel} p:not(#openingpara), ${CONFIG.panelPrefix}${panel} h1:not(#openingpara)`,
    );
    textElements.forEach((element) => {
      (element as HTMLElement).classList.toggle(
        "text-white",
        colour === "white",
      );
    });
  }

  //Shows the specified panel's text while hiding others.
  static showText(panel: number): void {
    const panels = document.querySelectorAll(
      `${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`,
    );

    this.textColour(panel % 2 ? "white" : "black", panel + 1);
    panels.forEach((p, index) => {
      (p as HTMLElement).style.opacity = index === panel - 1 ? "1" : "0";
    });
  }

  //Sets the background color for all panels and the body, and hides the top panel.
  static setPanelBackgroundColour(colour: string): void {
    const panels = document.querySelectorAll(
      `body, ${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`,
    );

    this.toggleTopPanel(0);
    panels.forEach((p) => {
      (p as HTMLElement).style.backgroundColor = colour;
    });
  }

  //Highlights the specified header link and de-highlights others.
  static headerLinks(highlightLink: number): void {
    const headerLinks = document.querySelector(".navbar-nav")?.children;
    if (headerLinks) {
      Array.from(headerLinks).forEach((link, index) => {
        (link as HTMLElement).classList.toggle(
          "text-danger",
          index === highlightLink,
        );
        (link as HTMLElement).classList.toggle(
          "text-dark",
          index !== highlightLink,
        );
      });
    }
  }
}
