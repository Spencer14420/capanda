import { Utils } from "../utils/utils";
import { Config } from "../constants/config";
import { CONFIG } from "../constants/config";
import { derivedValues } from "../constants/derivedValues";

type PanelProperties = Config["panelProperties"][number];

export class PanelNew {
  public properties: PanelProperties;
  public y: number = 0;
  public height: number;
  private element: HTMLElement;

  constructor(index: number) {
    if (index < 0 || index >= CONFIG.panelProperties.length) {
      throw new Error(`Invalid index: ${index}`);
    }

    this.properties = CONFIG.panelProperties[index];

    const panel = derivedValues.panels[index];
    if (!(panel instanceof HTMLElement)) {
      throw new Error(`Expected HTMLElement, but got ${typeof panel}`);
    }

    this.element = panel;
    this.setYPosition(0);
    this.height = this.element.offsetHeight;
  }

  public setYPosition(y: number): void {
    this.element.style.top = `${y}px`;
    this.y = y;
  }

  public getBoundingClientRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

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
