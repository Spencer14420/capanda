type ScrollPosition = "start" | "center" | "end" | "nearest";

export class ScrollButton {
  clickElement: HTMLElement;
  scrollToElement: HTMLElement;
  scrollPosition: ScrollPosition;

  constructor(
    clickElement: HTMLElement,
    scrollToElement: HTMLElement,
    scrollPosition: ScrollPosition = "start",
  ) {
    this.clickElement = clickElement;
    this.scrollToElement = scrollToElement;
    this.scrollPosition = scrollPosition;

    this.clickElement.addEventListener("click", () => {
      this.scrollToElement.scrollIntoView({
        behavior: "smooth",
        block: scrollPosition,
      });
    });
  }
}
