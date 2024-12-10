import { Config } from "../constants/config";
import { CONFIG } from "../constants/config";
import { derivedValues } from "../constants/derivedValues";

type PanelProperties = Config["panelProperties"][number];

export class Panel {
  public properties: PanelProperties;
  public y: number = 0;
  private _height: number = 0;
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
    this.updateHeight();

    this.observeContentChanges();
  }

  public get height(): number {
    return this._height;
  }

  // Sets the vertical position of the panel
  public setYPosition(y: number): void {
    this.element.style.top = `${y}px`;
    this.y = y;
  }

  // Sets the height of the panel and updates internal height
  public setHeight(height: number): void {
    this.element.style.height = `${height}px`;
    this.updateHeight(); // Recalculate after setting height
  }

  // Updates the height property based on the rendered element
  public updateHeight(): void {
    this._height = Math.max(
      this.element.offsetHeight,
      this.element.scrollHeight,
      this.element.getBoundingClientRect().height,
    );
  }

  // Observes changes to the panel's content and recalculates height
  private observeContentChanges(): void {
    const observer = new MutationObserver(() => {
      this.updateHeight();
    });

    observer.observe(this.element, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  public getBoundingClientRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  public disconnectObserver(): void {
    const observer = new MutationObserver(() => {});
    observer.disconnect();
  }
}
