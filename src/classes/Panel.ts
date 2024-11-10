import { Utils } from "../utils/utils.js";

//Provides methods to manipulate Panel properties like height, position, and styles.
export class Panel {
  element: HTMLElement;
  index: number;

  constructor(element: HTMLElement, index: number) {
    this.element = element;
    this.index = index;
  }

  getHeight() {
    return this.element.offsetHeight;
  }

  getYPosition() {
    return Utils.getElementY(this.element);
  }

  setMarginTop(marginTop: number): void {
    this.element.style.marginTop = `${marginTop}px`;
  }

  setBackgroundColor(color: string): void {
    this.element.style.backgroundColor = color;
  }

  setOpacity(opacity: number): void {
    this.element.style.opacity = opacity.toString();
  }
}
