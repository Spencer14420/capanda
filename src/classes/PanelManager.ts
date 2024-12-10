import { CONFIG } from "../constants/config";
import { Panel } from "./Panel";

export class PanelManager {
  private panels: Panel[];

  constructor() {
    this.panels = this.initializePanels();

    // Wait for the page to fully load before calculating heights and positions
    window.addEventListener("load", () => {
      this.updateAllHeights();
      this.normalizeHeights();
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

  private normalizeHeights(): void {
    const maxHeight = Math.max(
      ...this.panels.slice(1).map((panel) => panel.height),
    );

    this.panels.forEach((panel, index) => {
      if (index !== 0) {
        panel.setHeight(maxHeight);
      }
    });
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

        // Calculate Y-position of the current panel
        // Align the top of the previous panel with the top of the page,
        // and center the current panel in the viewport
        const y =
          previousPanel.y +
          previousPanel.height - // Bottom of the previous panel
          viewportHeight / 2 + // Offset to center the next panel
          navbarHeight / 2; // Adjust for navbar height

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
