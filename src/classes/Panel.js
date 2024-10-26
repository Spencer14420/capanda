import { Utils } from "../utils/utils.js";

//Provides methods to manipulate Panel properties like height, position, and styles.
export class Panel {
    constructor(element, index) {
      this.element = element;
      this.index = index;
    }
  
    getHeight() {
      return this.element.offsetHeight;
    }
  
    getYPosition() {
      return Utils.getElementY(this.element);
    }
  
    setMarginTop(marginTop) {
      this.element.style.marginTop = `${marginTop}px`;
    }
  
    setBackgroundColor(color) {
      this.element.style.backgroundColor = color;
    }
  
    setOpacity(opacity) {
      this.element.style.opacity = opacity;
    }
  }