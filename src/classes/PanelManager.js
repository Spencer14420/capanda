import { CONFIG } from '../constants/config.js';
import { Panel } from './Panel.js';
import { Utils } from "../utils/utils.js";

//Responsible for managing multiple panels, including positioning, setting margins, and handling interactions.
export class PanelManager {
    constructor() {
      this.transitionY = [];
      this.headerHeight = document.querySelector("nav").clientHeight;
      this.navbar = document.querySelector(".navbar-nav");
      this.selectors = ["value", "leadership", "dedication", "focus"];
      this.panels = this.getPanels();
      this.largestPanelHeight = Math.max(...this.panels.map((panel) => panel.getHeight()));
      this.useableArea = window.innerHeight - this.headerHeight;
    }
  
    getPanel(index) {
      const panelElement = document.querySelector(`${CONFIG.panelPrefix}${index}`);
      if (!panelElement) {
        console.error(`Panel ${index} not found.`);
        return null;
      }
      return new Panel(panelElement, index);
    }

    getPanels() {
      let panels = [];

      for (let i = 2; i <= CONFIG.numPanels; i++) {
        const panelElement = document.querySelector(`${CONFIG.panelPrefix}${i} > div`);
        if (panelElement !== null) {
          panels.push(new Panel(panelElement, i+2));
        }
      }
      return panels;
    }
  
    //Calculates and sets the top margins for all panels, based on available area and panel height.
    setPanelMargins() {
      for (let i = 2; i <= CONFIG.numPanels; i++) {
        const panel = this.getPanel(i);
        if (!panel) continue;
        const panelHeight = panel.getHeight();
        const marginTop = this.calculateMarginTop(panelHeight, i, panel.getYPosition());
        panel.setMarginTop(marginTop);
  
        if (this.useableArea > this.largestPanelHeight) {
          this.transitionY.push(
            panel.element.getBoundingClientRect().y - this.headerHeight + window.scrollY + CONFIG.topHighOffset
          );
        }
      }
    }
  
    //Calculates the top margin for a specific panel, based on its height, index, and position.
    calculateMarginTop(panelHeight, index, panelY) {
      return this.useableArea > panelHeight
        ? index === 2
          ? -(this.useableArea + panelHeight) / 2 + CONFIG.firstTransition + Utils.calculateAddition(this.useableArea, panelHeight)
          : this.transitionY[index - 3] - panelY + (window.innerHeight - panelHeight) / 2 + Utils.calculateAddition(this.useableArea, panelHeight)
        : -this.useableArea / 2;
    }
  
    //Shows or hides the navbar based on the available space compared to the largest panel height.
    setNavbarVisibility() {
      this.navbar.style.display = this.useableArea < this.largestPanelHeight + 50 ? "none" : "flex";
    }
  
    //Sets the heights of specific elements based on panel and window dimensions.
    setPanelHeights() {
      this.panels.forEach((panel) => {
        const topBottom =
          (window.innerHeight - panel.getHeight() + this.headerHeight) / 2 - CONFIG.topHighOffset;
  
        const targetElement = document.querySelector(`#${this.selectors[panel.index - 2]}`);
        if (!targetElement) {
          console.error(`Element with selector ${this.selectors[panel.index - 2]} not found.`);
          return;
        }
        targetElement.style.height = `${topBottom}px`;
        targetElement.style.marginTop = `-${topBottom}px`;
      });
    }
  
    setPositions() {
      this.setPanelMargins();
      this.setNavbarVisibility();
      document.querySelector(".top-panel").style.paddingTop = `${this.headerHeight}px`;
      this.setPanelHeights();
    }
}