export interface DerivedValues {
  panels: NodeListOf<Element>;
  numPanels: number;
}

export const derivedValues: DerivedValues = {
  panels: document.querySelectorAll(".panel"),
  numPanels: document.querySelectorAll(".panel").length,
};
