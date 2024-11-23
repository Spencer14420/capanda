import { CONFIG } from "../constants/config";
import { derivedValues } from "../constants/derivedValues";
import { Panel } from "./Panel";
import { Utils } from "../utils/utils";

//Responsible for managing multiple panels, including positioning, setting margins, and handling interactions.
export class PanelManager {
  transitionY: number[];
  headerHeight: number;
  navbar: HTMLElement | null;
  panels: Panel[];
  largestPanelHeight: number;
  useableArea: number;

  constructor() {
    this.transitionY = [];
    const navElement = document.querySelector("nav") as HTMLElement | null;
    this.headerHeight = navElement ? navElement.clientHeight : 0;
    this.navbar = document.querySelector(".navbar-nav") as HTMLElement | null;
    this.panels = this.getPanels();
    this.largestPanelHeight = Math.max(
      ...this.panels.map((panel) => panel.getHeight()),
    );
    this.useableArea = window.innerHeight - this.headerHeight;
  }

  //Returns a Panel object representing one of the .panel class <section> elements
  getPanel(index: number): Panel | null {
    const panelElement = document.querySelector(
      `${CONFIG.panelPrefix}${index}`,
    ) as HTMLElement | null;
    if (!panelElement) {
      console.error(`Panel ${index} not found.`);
      return null;
    }
    return new Panel(panelElement, index);
  }

  //Returns an array consisting Panel objects, each representing the inner divs of each of the .panel <section> elements
  getPanels(): Panel[] {
    const panels: Panel[] = [];

    for (let i = 2; i <= derivedValues.numPanels; i++) {
      const panelElement = document.querySelector(
        `${CONFIG.panelPrefix}${i} > div`,
      ) as HTMLElement | null;
      if (panelElement) {
        panels.push(new Panel(panelElement, i + 2));
      }
    }
    return panels;
  }

  //Calculates and sets the top margins for all panels, based on available area and panel height.
  setPanelMargins(): void {
    for (let i = 2; i <= derivedValues.numPanels; i++) {
      const panel = this.getPanel(i);
      if (!panel) {
        continue;
      }

      const panelHeight = panel.getHeight();
      const marginTop = this.calculateMarginTop(
        panelHeight,
        i,
        panel.getYPosition(),
      );
      panel.setMarginTop(marginTop);

      if (this.useableArea > this.largestPanelHeight) {
        this.transitionY.push(
          panel.element.getBoundingClientRect().y -
            this.headerHeight +
            window.scrollY +
            CONFIG.topHighOffset,
        );
      }
    }
  }

  //Calculates the top margin for a specific panel, based on its height, index, and position.
  calculateMarginTop(
    panelHeight: number,
    index: number,
    panelY: number,
  ): number {
    const addition = Utils.calculateAddition(
      this.useableArea,
      this.largestPanelHeight,
    );
    const centeredMargin = (window.innerHeight - panelHeight) / 2;

    // The first panel after the .top-panel is index === 2
    if (index === 2) {
      const centeredPosition = -(this.useableArea + panelHeight) / 2;
      return centeredPosition + CONFIG.firstTransition + addition;
    }

    const relativePosition = this.transitionY[index - 3] - panelY;
    return relativePosition + centeredMargin + addition;
  }

  //Position #value element, etc. (for header links)
  positionScrollPoints(): void {
    for (let i = 2; i <= derivedValues.numPanels; i++) {
      const panel = this.getPanel(i);
      if (!panel) {
        continue;
      }

      const scrollPoint = panel.element.querySelector(
        ".scroll-point",
      ) as HTMLElement | null;
      if (scrollPoint) {
        const scrollPositioning =
          (window.innerHeight - panel.getHeight() + this.headerHeight) / 2 -
          CONFIG.topHighOffset;
        scrollPoint.style.height = `${scrollPositioning}px`;
        scrollPoint.style.marginTop = `-${scrollPositioning}px`;
      }
    }
  }

  //Shows or hides the navbar based on the available space compared to the largest panel height.
  setNavbarVisibility(): void {
    if (this.navbar) {
      this.navbar.style.display =
        this.useableArea < this.largestPanelHeight + 50 ? "none" : "flex";
    }
  }

  setPositions(): void {
    this.setPanelMargins();
    this.setNavbarVisibility();
    this.positionScrollPoints();
  }
}
