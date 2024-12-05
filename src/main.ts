import { CONFIG } from "./constants/config";
import { ContactForm } from "spemailhandler";
import { derivedValues } from "./constants/derivedValues";
import { PanelManager } from "./classes/PanelManager";
import { PanelManagerNew } from "./classes/PanelManager";
import { UIManager } from "./classes/UIManager";
import { Modal } from "sp14420-modal";
import { Utils } from "./utils/utils";

document.addEventListener("DOMContentLoaded", () => {
  initializePage();
});

function initializePage(): void {
  // Initialize the contact form
  const contactForm = new ContactForm(
    "api.php?action=sendMessage",
    "SpCsrfToken",
    Utils.refreshContactForm(),
  );

  // Initialize modal and buttons
  const modal = new Modal("#contact");
  initializeLearnMoreButton();
  initializeContactButton();
  initializePanels();
}

function initializeLearnMoreButton(): void {
  const learnmoreBtn = document.querySelector("#learnmore-btn");
  const firstSection = document.querySelector("#value") as HTMLElement;

  if (learnmoreBtn instanceof HTMLButtonElement && firstSection) {
    learnmoreBtn.addEventListener("click", () => {
      firstSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}

function initializeContactButton(): void {
  const contactBtn = document.querySelector<HTMLButtonElement>(
    `[data-showModal="#contact"]`,
  );

  if (contactBtn) {
    let isPreloading = false;
    let isLoaded = false;

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

    ["mouseenter", "touchstart", "click"].forEach((event) => {
      contactBtn.addEventListener(event, loadCsrfAndTurnstile, {
        passive: event === "touchstart",
      });
    });
  }
}

function initializePanels(): void {
  const panelManagerNew = new PanelManagerNew();

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

  // Dynamically update panel styles and UI elements based on the scroll position
  window.addEventListener("scroll", () => {
    updatePanelsOnScroll(panelManager);
  });
}

function updatePanelsOnScroll(panelManager: PanelManager): void {
  const navElement = document.querySelector("nav") as HTMLElement | null;
  if (!navElement) return;

  const panelTopHigh: boolean[] = [];
  const panelBottomHigh: boolean[] = [];

  for (let i = 2; i <= derivedValues.numPanels - 1; i++) {
    const panel = panelManager.getPanel(i);
    if (!panel) continue;

    const { y, bottom } = panel.element.getBoundingClientRect();
    const navHeight = navElement.clientHeight;

    panelTopHigh.push(y < navHeight - CONFIG.topHighOffset);
    panelBottomHigh.push(bottom < window.innerHeight - CONFIG.bottomHighOffset);
  }

  const screenTop = window.scrollY;
  const showPanelIndex = determinePanelToShow(
    screenTop,
    panelTopHigh,
    panelBottomHigh,
  );
  UIManager.showPanel(showPanelIndex);
}

function determinePanelToShow(
  screenTop: number,
  panelTopHigh: boolean[],
  panelBottomHigh: boolean[],
): number {
  if (screenTop < CONFIG.firstTransition) return 0;
  if (screenTop >= CONFIG.firstTransition && !panelTopHigh[0]) return 1;
  if (panelTopHigh[0] && !panelTopHigh[1] && panelBottomHigh[0]) return 2;
  if (panelTopHigh[1] && !panelTopHigh[2] && panelBottomHigh[1]) return 3;
  if (panelTopHigh[2] && panelBottomHigh[2]) return 4;
  return 0; // Default case to avoid undefined behavior
}
