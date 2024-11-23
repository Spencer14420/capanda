export interface Config {
  firstTransition: number;
  topHighOffset: number;
  bottomHighOffset: number;
  minTopBottomSpace: number;
  shortScreenAddition: number;
  largeScreenAddition: number;
  turnstileCompactSize: number;
  turnstileSiteKey: string;
  panelPrefix: string;
  colors: {
    [key: string]: string;
  };
}

export const CONFIG: Config = {
  firstTransition: 200, // Minimum amount to scroll before the first transition occurs.
  topHighOffset: 50, // Minimum amount to scroll before each subsequent transition occurs.
  bottomHighOffset: 100, // Minimum amount of blank space below each panel before transition can occur.
  minTopBottomSpace: 80, // Minimum space required above and below the tallest panel to consider the screen "large".
  shortScreenAddition: 300, // Pushes the panels down by this amount on short screens.
  largeScreenAddition: 25, // Pushes the panels down by this amount on large screens.
  turnstileCompactSize: 350, // Width at which the turnstile widget switches to compact mode.
  turnstileSiteKey: "0x4AAAAAAAyvgzXqVhbwOBo6", // Site key for the Turnstile widget.
  panelPrefix: ".panel",
  colors: {
    blue: "#0e2c57",
    white: "#ededed",
    black: "#14171c",
  },
};
