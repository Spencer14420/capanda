import { Utils } from '../utils/utils.js';
import { Panel } from './Panel.js';
import { CONFIG } from '../constants/config.js';

//Responsible for managing UI-related operations such as panel visibility, text color, and header link highlighting.
export class UIManager {
    static toggleTopPanel(state) {
      const topPanel = document.querySelector(".top-panel");
      Utils.setElementStyle(topPanel, {
        opacity: state === 1 ? "1" : "0",
      });
  
      const panel2 = new Panel(document.querySelector(".panel2"), 2);
      Utils.setElementStyle(panel2.element, {
        opacity: "0",
        pointerEvents: state === 1 ? "none" : "auto",
      });
    }
  
    //Updates the text color of all text within the specified panel.
    static textColour(colour, panel) {
      const textElements = document.querySelectorAll(
        `${CONFIG.panelPrefix}${panel} p:not(#openingpara), ${CONFIG.panelPrefix}${panel} h1:not(#openingpara)`
      );
      textElements.forEach((element) => {
        element.classList.toggle("text-white", colour === "white");
      });
    }
  
    //Shows the specified panel's text while hiding others.
    static showText(panel) {
      const panels = document.querySelectorAll(
        `${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`
      );
      UIManager.textColour(panel % 2 ? "white" : "black", panel + 1);
      panels.forEach((p, index) => (p.style.opacity = index === panel - 1 ? "1" : "0"));
    }
  
    //Sets the background color for all panels and the body, and hides the top panel.
    static setPanelBackgroundColour(colour) {
      const panels = document.querySelectorAll(
        `body, ${CONFIG.panelPrefix}2, ${CONFIG.panelPrefix}3, ${CONFIG.panelPrefix}4, ${CONFIG.panelPrefix}5`
      );
      UIManager.toggleTopPanel(0);
      panels.forEach((p) => (p.style.backgroundColor = colour));
    }
  
    //Highlights the specified header link and de-highlights others.
    static headerLinks(highlightLink) {
      const headerLinks = document.querySelector(".navbar-nav").children;
      [...headerLinks].forEach((link, index) => {
        link.classList.toggle("text-danger", index === highlightLink);
        link.classList.toggle("text-dark", index !== highlightLink);
      });
    }
}