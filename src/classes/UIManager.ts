import { CONFIG } from "../constants/config";
import { Utils } from "../utils/utils";

//Responsible for managing UI-related operations such as panel visibility, text color, and header link highlighting.
export class UIManager {
  private static readonly topPanel = document.querySelector(
    ".top-panel",
  ) as HTMLElement | null;
  private static readonly panels = document.querySelectorAll(
    ".panel:not(.top-panel)",
  );
  private static readonly navbarLinks =
    document.querySelector(".navbar-nav")?.children;

  // Shows the specified panel and updates the UI elements based on the panel's properties.
  public static showPanel(panel: number): void {
    this.showTopPanel(panel === 0 ? true : false);

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

  private static showTopPanel(state: boolean): void {
    if (this.topPanel) {
      Utils.setElementStyle(this.topPanel, {
        opacity: state ? "1" : "0",
      });
    }
  }

  //Shows the specified panel's text while hiding others.
  private static showText(panel: number): void {
    this.panels.forEach((p, index) => {
      (p as HTMLElement).style.opacity = index === panel - 1 ? "1" : "0";
    });
  }

  //Sets the background color for all panels and the body, and hides the top panel.
  private static setPanelBackgroundColour(colour: string): void {
    document.body.style.backgroundColor = colour;
    this.panels.forEach((p) => {
      (p as HTMLElement).style.backgroundColor = colour;
    });
  }

  //Updates the text color of all text within the specified panel.
  private static setPanelTextColor(colour: string): void {
    this.panels.forEach((p) => {
      (p as HTMLElement).style.color = colour;
    });
  }

  //Highlights the specified header link and de-highlights others.
  private static headerLinks(highlightLink: number | false): void {
    if (highlightLink === false) highlightLink = -1; // Unhighlight all links

    if (this.navbarLinks) {
      Array.from(this.navbarLinks).forEach((link, index) => {
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
