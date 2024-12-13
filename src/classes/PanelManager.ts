import { CONFIG } from "../constants/config";
import { derivedValues } from "../constants/derivedValues";
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
    derivedValues.screenIsSmall = viewportHeight < this.getTallestPanelHeight();

    this.panels.forEach((panel, i) => {
      if (i === 0) {
        // First panel starts at the top of the page
        panel.setYPosition(0);
      } else {
        const previousPanel = this.panels[i - 1];

        // Determine the base scroll requirement for the current panel
        const baseScroll = i === 1 ? CONFIG.firstTransition : previousPanel.y;

        // Calculate the surrounding area above the current panel
        const surroundingArea = derivedValues.screenIsSmall
          ? viewportHeight
          : (viewportHeight - panel.height) / 2;

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

  private getTallestPanelHeight(): number {
    return this.panels.reduce((max, panel) => Math.max(max, panel.height), 0);
  }

  public getPanels(): Panel[] {
    return this.panels;
  }
}
