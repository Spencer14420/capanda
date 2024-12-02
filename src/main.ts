import { CONFIG } from "./constants/config";
import { ContactForm } from "spemailhandler";
import { derivedValues } from "./constants/derivedValues";
import { PanelManager } from "./classes/PanelManager";
import { UIManager } from "./classes/UIManager";
import { Modal } from "sp14420-modal";
import { Utils } from "./utils/utils";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the contact form
  const contactForm = new ContactForm(
    "api.php?action=sendMessage",
    "SpCsrfToken",
    Utils.refreshContactForm(),
  );
});

// Contact Modal
const modal = new Modal("#contact");

//Learn more button
const learnmoreBtn = document.querySelector(
  "#learnmore-btn",
) as HTMLButtonElement;
const firstSection = document.querySelector("#value") as HTMLElement;

if (learnmoreBtn && firstSection) {
  learnmoreBtn.addEventListener("click", () => {
    firstSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Contact Us button
const contactBtn = document.querySelector<HTMLButtonElement>(
  `[data-showModal="#contact"]`,
);

if (contactBtn) {
  let isPreloading = false;
  let isLoaded = false;

  // Load the CSRF token and the Turnstile widget
  const loadCsrfAndTurnstile = async () => {
    if (isLoaded || isPreloading) return; // Prevent redundant calls
    isPreloading = true;
    try {
      await Utils.setCsrfToken(); // Async function to set CSRF token
      Utils.updateTurnstileWidget(); // Synchronous function to update Turnstile widget
      isLoaded = true;
    } catch (error) {
      console.error("CSRF and Turnstile loading failed:", error);
    } finally {
      isPreloading = false;
    }
  };

  contactBtn.addEventListener("mouseenter", loadCsrfAndTurnstile);
  contactBtn.addEventListener("touchstart", loadCsrfAndTurnstile, {
    passive: true,
  });
  contactBtn.addEventListener("click", loadCsrfAndTurnstile);
}

const panelManager = new PanelManager();

// Set panel positions when the page loads or the window is resized
window.addEventListener("load", () => {
  //panelManager.setPositions();
});

const debouncedResize = Utils.debounce(function () {
  //panelManager.setPositions();
  Utils.updateTurnstileWidget();
}, 200);
window.addEventListener("resize", debouncedResize);

//Dynamically update panel styles and UI elements based on the scroll position.
// window.addEventListener("scroll", () => {
//   const panelTopHigh: boolean[] = [];
//   const panelBottomHigh: boolean[] = [];
//   const navElement = document.querySelector("nav") as HTMLElement | null;

//   for (let i = 2; i <= derivedValues.numPanels - 1; i++) {
//     const panel = panelManager.getPanel(i);
//     if (!panel || !navElement) {
//       continue;
//     }

//     panelTopHigh.push(
//       panel.element.getBoundingClientRect().y <
//         navElement.clientHeight - CONFIG.topHighOffset,
//     );

//     panelBottomHigh.push(
//       panel.element.getBoundingClientRect().bottom <
//         window.innerHeight - CONFIG.bottomHighOffset,
//     );
//   }

//   const screenTop: number = window.scrollY;

//   //Based on the scroll position, determine which panel to highlight and what colors to set.
//   if (screenTop < CONFIG.firstTransition) {
//     UIManager.toggleTopPanel(1);
//     UIManager.headerLinks(-1);
//   } else if (screenTop >= CONFIG.firstTransition && !panelTopHigh[0]) {
//     UIManager.setPanelBackgroundColour(CONFIG.colors.blue);
//     UIManager.showText(1);
//     UIManager.headerLinks(0);
//   } else if (panelTopHigh[0] && !panelTopHigh[1] && panelBottomHigh[0]) {
//     UIManager.setPanelBackgroundColour(CONFIG.colors.white);
//     UIManager.showText(2);
//     UIManager.headerLinks(1);
//   } else if (panelTopHigh[1] && !panelTopHigh[2] && panelBottomHigh[1]) {
//     UIManager.setPanelBackgroundColour(CONFIG.colors.black);
//     UIManager.showText(3);
//     UIManager.headerLinks(2);
//   } else if (panelTopHigh[2] && panelBottomHigh[2]) {
//     UIManager.setPanelBackgroundColour(CONFIG.colors.white);
//     UIManager.showText(4);
//     UIManager.headerLinks(3);
//   }
// });
