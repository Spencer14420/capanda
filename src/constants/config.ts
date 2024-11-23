export interface Config {
  firstTransition: number;
  topHighOffset: number;
  bottomHighOffset: number;
  minTopBottomSpace: number;
  shortScreenAddition: number;
  largeScreenAddition: number;
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
  shortScreenAddition: window.screen.height, // Pushes the panels down by this amount on short screens.
  largeScreenAddition: 25, // Pushes the panels down by this amount on large screens.
  panelPrefix: ".panel",
  colors: {
    blue: "#0e2c57",
    white: "#ededed",
    black: "#14171c",
  },
};
