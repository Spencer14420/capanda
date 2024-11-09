import { CONFIG } from "../constants/config.js";

//Contains helper methods for DOM manipulation and calculations.
export class Utils {
  //Returns the Y-coordinate of an element relative to the document, taking into account the current scroll position.
  static getElementY(el) {
    return el.getBoundingClientRect().y + window.scrollY;
  }

  // Applies a set of styles to a given element by iterating over the styles object.
  static setElementStyle(element, styles) {
    if (!element) return;
    Object.entries(styles).forEach(([key, value]) => {
      element.style[key] = value;
    });
  }

  //Calculates an additional value based on available area and panel height, used for positioning logic.
  static calculateAddition(useableArea, largestPanelHeight) {
    return useableArea < largestPanelHeight + CONFIG.minTopBottomSpace * 2
      ? CONFIG.shortScreenAddition
      : CONFIG.largeScreenAddition;
  }
}
