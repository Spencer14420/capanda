import { CONFIG } from "../constants/config";
import { Panel } from "./Panel";

export class PanelManager {
  private panels: Panel[];

  constructor() {
    this.panels = this.initializePanels();

    // Wait for the page to fully load before calculating heights and positions
    window.addEventListener("load", () => {
      this.updateAllHeights();
      this.positionPanels();
    });

    this.addResizeListener();
  }

  private initializePanels(): Panel[] {
    return CONFIG.panelProperties.map((_, i) => new Panel(i));
  }

  private updateAllHeights(): void {
    this.panels.forEach((panel) => panel.updateHeight());
  }

  private positionPanels(): void {
    const viewportHeight = window.innerHeight;
    const navbarHeight = document.querySelector("nav")?.offsetHeight ?? 0;

    this.panels.forEach((panel, i) => {
      if (i === 0) {
        // First panel starts at the top of the page
        panel.setYPosition(0);
      } else {
        const previousPanel = this.panels[i - 1];

        // Calculate the surrounding area above and below the current panel
        const surroundingArea = (viewportHeight - panel.height) / 2;

        // Determine the base scroll requirement for the current panel
        const baseScroll = i === 1 ? CONFIG.firstTransition : previousPanel.y;

        // Calculate the extra vertical shift for the panel
        const verticalShift = panel.properties.verticalShift ?? 0;

        // Compute the final y position
        const y = baseScroll + surroundingArea + verticalShift;

        panel.setYPosition(y);
      }
    });

    this.setFooterPosition();
  }

  private setFooterPosition(): void {
    const lastPanel = this.panels[this.panels.length - 1];
    const lastPanelBottom = lastPanel.y + lastPanel.height;
    const footer = document.querySelector("footer") as HTMLElement | null;

    if (footer) {
      footer.style.top = `${lastPanelBottom}px`;
    }
  }

  private addResizeListener(): void {
    window.addEventListener("resize", () => {
      this.updateAllHeights();
      this.positionPanels();
    });
  }

  public getPanels(): Panel[] {
    return this.panels;
  }
}
