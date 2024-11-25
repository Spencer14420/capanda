export class Modal {
  private element: HTMLElement;
  private modalContent: HTMLElement;
  private showButton: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private outsideClickHandler: (event: MouseEvent) => void;
  private isTransitioning: boolean = false;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLElement;
    if (!this.element) {
      throw new Error(`Modal element with selector "${selector}" not found.`);
    }

    this.modalContent = this.element.querySelector(
      ".modal-content",
    ) as HTMLElement;
    if (!this.modalContent) {
      throw new Error(`Modal content element not found inside "${selector}".`);
    }

    this.showButton = document.querySelector(
      `[data-bs-target="${selector}"]`,
    ) as HTMLElement | null;
    this.closeButton = this.element.querySelector(".btn-close");

    this.outsideClickHandler = this.handleOutsideClick.bind(this);

    this.initializeEventListeners();
  }

  public show(): void {
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    this.element.style.display = "block";
    this.element.setAttribute("aria-hidden", "false");
    this.element.setAttribute("aria-modal", "true");

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    document.body.classList.add("modal-open");

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade";
    document.body.appendChild(backdrop);

    void this.element.offsetHeight;

    this.element.classList.add("show");
    backdrop.classList.add("show");

    document.addEventListener("click", this.outsideClickHandler);

    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }

  public hide(): void {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.element.classList.remove("show");

    const backdrop = document.querySelector(".modal-backdrop.fade.show");
    if (backdrop) {
      backdrop.classList.remove("show");
    }

    const transitionDuration =
      parseFloat(getComputedStyle(this.element).transitionDuration) * 1000;

    setTimeout(() => {
      this.element.style.display = "none";
      this.element.setAttribute("aria-hidden", "true");
      this.element.removeAttribute("aria-modal");

      if (backdrop) {
        backdrop.remove();
      }

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.classList.remove("modal-open");

      document.removeEventListener("click", this.outsideClickHandler);

      this.isTransitioning = false;
    }, transitionDuration);
  }

  private initializeEventListeners(): void {
    if (this.showButton) {
      this.showButton.addEventListener("click", () => this.show());
    } else {
      console.warn("Show button not found.");
    }

    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.hide());
    } else {
      console.warn("Close button not found.");
    }
  }

  private handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the click is outside the modal content
    if (!this.modalContent.contains(target)) {
      this.hide();
    }
  }
}
