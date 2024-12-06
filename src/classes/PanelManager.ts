import { CONFIG } from "../constants/config";
import { Panel } from "./Panel";

export class PanelManager {
  private panels: Panel[];

  constructor() {
    this.panels = this.initializePanels();
    this.positionPanels();
    this.addResizeListener();
  }

  private initializePanels(): Panel[] {
    return CONFIG.panelProperties.map((_, i) => new Panel(i));
  }

  private positionPanels(): void {
    const viewportHeight = window.innerHeight;

    this.panels.forEach((panel, i) => {
      if (i === 0) {
        // First panel starts at the top of the page
        panel.setYPosition(0);
      } else {
        const previousPanel = this.panels[i - 1];

        // The current panel is centered when the top of the previous panel is at the top of the viewport
        const centeredY =
          previousPanel.y +
          previousPanel.height -
          viewportHeight / 2 +
          panel.height / 2;

        panel.setYPosition(centeredY);
      }
    });
    this.setFooterPosition();
  }

  // Places the footer just below the last panel
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
      this.positionPanels();
    });
  }

  public getPanels(): Panel[] {
    return this.panels;
  }
}
