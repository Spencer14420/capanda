export class Modal {
  element: HTMLElement;
  showButton: HTMLElement | null;
  closeButton: HTMLElement | null;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLElement;
    this.showButton = document.querySelector(
      `[data-bs-target="${selector}"]`,
    ) as HTMLElement | null;
    this.closeButton = this.element.querySelector(`${selector} .btn-close`);

    this.initializeEventListeners();
  }

  public show(): void {
    this.element.style.display = "block";
    this.element.setAttribute("aria-hidden", "false");
    this.element.setAttribute("aria-modal", "true");

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    document.body.classList.add("modal-open");

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade"; // Add only fade initially
    document.body.appendChild(backdrop);

    // Force a reflow to ensure the browser processes the "fade" state
    void this.element.offsetHeight;

    this.element.classList.add("show");
    backdrop.classList.add("show");
  }

  public hide(): void {
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
    }, transitionDuration);
  }

  private initializeEventListeners(): void {
    if (this.showButton) {
      this.showButton.addEventListener("click", () => {
        this.show();
      });
    }
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => {
        this.hide();
      });
    }
  }
}
