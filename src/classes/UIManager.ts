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

  //Shows the specified panel's text while hiding others.
  static showText(panel: number): void {
    const panels = document.querySelectorAll(
      `${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`,
    );

    panels.forEach((p, index) => {
      (p as HTMLElement).style.opacity = index === panel - 1 ? "1" : "0";
    });
  }

  //Sets the background color for all panels and the body, and hides the top panel.
  static setPanelBackgroundColour(colour: string): void {
    const panels = document.querySelectorAll(
      `body, ${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`,
    );

    panels.forEach((p) => {
      (p as HTMLElement).style.backgroundColor = colour;
    });
  }

  //Updates the text color of all text within the specified panel.
  static setPanelTextColor(colour: string): void {
    const panels = document.querySelectorAll(
      `${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`,
    );

    panels.forEach((p) => {
      (p as HTMLElement).style.color = colour;
    });
  }

  //Highlights the specified header link and de-highlights others.
  static headerLinks(highlightLink: number | false): void {
    if (highlightLink === false) highlightLink = -1; // Unhighlight all links

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

  // Shows the specified panel and updates the UI elements based on the panel's properties.
  static showPanel(panel: number): void {
    this.toggleTopPanel(panel === 0 ? 1 : 0);

    const panelProperty = CONFIG.panelProperties.find((p) => p.id === panel);

    if (panelProperty) {
      this.showText(panel);
      this.setPanelBackgroundColour(panelProperty.bgColor);
      this.setPanelTextColor(panelProperty.textColor);
      this.headerLinks(panelProperty.headerLink);
    } else {
      console.error(`Panel with ID ${panel} not found.`);
    }
  }
}
