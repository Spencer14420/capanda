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
  panelProperties: {
    id: number;
    bgColor: Config["colors"][keyof Config["colors"]];
    textColor: Config["colors"][keyof Config["colors"]];
    headerLink: number | null;
    verticalShift?: number;
  }[];
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
    pureWhite: "#ffffff",
    pureBlack: "#000000",
    red: "#aa0000",
  },
  panelProperties: [],
};

CONFIG.panelProperties = [
  {
    id: 0,
    bgColor: CONFIG.colors.blue,
    textColor: CONFIG.colors.pureWhite,
    headerLink: null,
  },
  {
    id: 1,
    bgColor: CONFIG.colors.blue,
    textColor: CONFIG.colors.pureWhite,
    headerLink: 0,
    verticalShift: CONFIG.firstTransition,
  },
  {
    id: 2,
    bgColor: CONFIG.colors.white,
    textColor: CONFIG.colors.pureBlack,
    headerLink: 1,
  },
  {
    id: 3,
    bgColor: CONFIG.colors.black,
    textColor: CONFIG.colors.pureWhite,
    headerLink: 2,
  },
  {
    id: 4,
    bgColor: CONFIG.colors.white,
    textColor: CONFIG.colors.pureBlack,
    headerLink: 3,
  },
];
