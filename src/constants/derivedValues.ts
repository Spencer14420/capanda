export interface DerivedValues {
  panels: NodeListOf<Element>;
  numPanels: number;
  screenIsSmall: boolean;
}

export const derivedValues: DerivedValues = {
  panels: document.querySelectorAll(".panel"),
  numPanels: document.querySelectorAll(".panel").length,
  screenIsSmall: false,
};
