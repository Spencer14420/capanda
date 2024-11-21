type ScrollPosition = "start" | "center" | "end" | "nearest";

export class ScrollButton {
  private clickElement: HTMLElement;
  private scrollToElement: HTMLElement;
  private scrollPosition: ScrollPosition;

  constructor(
    clickElement: HTMLElement,
    scrollToElement: HTMLElement,
    scrollPosition: ScrollPosition = "start",
  ) {
    this.clickElement = clickElement;
    this.scrollToElement = scrollToElement;
    this.scrollPosition = scrollPosition;

    this.clickElement.addEventListener("click", (event) =>
      this.handleClick(event),
    );
  }

  private handleClick(event: MouseEvent): void {
    // Prevent the default behavior for anchor tags,
    // unless the user intends to open the link in a new tab
    // by holding the Meta key (cmd on MacOS) or the Ctrl key
    if (this.clickElement instanceof HTMLAnchorElement) {
      if (event.metaKey || event.ctrlKey) {
        return;
      }
      event.preventDefault();
    }

    this.scrollToElement.scrollIntoView({
      behavior: "smooth",
      block: this.scrollPosition,
    });
  }
}
