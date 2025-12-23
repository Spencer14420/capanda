import { CONFIG } from "../constants/config";
import { Utils } from "../utils/utils";

//Responsible for managing UI-related operations such as panel visibility, text colour, and header link highlighting.
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
    this.showTopPanel(panel === 0);

    const panelProperty = CONFIG.panelProperties.find((p) => p.id === panel);

    if (panelProperty) {
      this.showText(panel);
      this.setPanelBackgroundColour(panelProperty.bgColor);
      this.setPanelTextColour(panelProperty.textColor);
      this.highlightNavbarLink(panelProperty.headerLink);
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

  public static showAllPanels(): void {
    this.showTopPanel(true);

    this.showAllText();

    if (CONFIG.unifiedBgColor) {
      this.setPanelBackgroundColour(CONFIG.unifiedBgColor);
    } else {
      console.error("No unifiedBgColor has been set");
    }

    if (CONFIG.unifiedTextColor) {
      this.setPanelTextColour(CONFIG.unifiedTextColor);
    } else {
      console.error("No unifiedTextColor has been set");
    }
  }

  //Shows the specified panel's text while hiding others.
  private static showText(panel: number): void {
    this.panels.forEach((p, index) => {
      (p as HTMLElement).classList.toggle("active-panel", index === panel - 1);
    });
  }

  private static showAllText(): void {
    this.panels.forEach((p) => {
      (p as HTMLElement).classList.add("active-panel");
    });
  }

  //Sets the background colour for all panels and the body, and hides the top panel.
  private static setPanelBackgroundColour(colour: string): void {
    document.body.style.backgroundColor = colour;
    this.panels.forEach((p) => {
      (p as HTMLElement).style.backgroundColor = colour;
    });
  }

  //Updates the text colour of all text within the specified panel.
  private static setPanelTextColour(colour: string): void {
    this.panels.forEach((p) => {
      (p as HTMLElement).style.color = colour;
    });
  }

  //Highlights the specified header link and de-highlights others.
  private static highlightNavbarLink(highlightLink: number | null): void {
    if (this.navbarLinks) {
      Array.from(this.navbarLinks).forEach((link, index) => {
        (link as HTMLElement).classList.toggle(
          "nav-link-highlighted",
          highlightLink !== null && index === highlightLink,
        );
      });
    }
  }
}
