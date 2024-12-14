export interface Config {
  firstTransition: number;
  topHighOffset: number;
  bottomHighOffset: number;
  smallScreenThreshold: number;
  turnstileCompactSize: number;
  turnstileSiteKey: string;
  panelPrefix: string;
  colors: {
    [key: string]: string;
  };
  panelProperties: {
    id: number; // Unique identifier for the panel
    bgColor: Config["colors"][keyof Config["colors"]]; // Background color of the panel
    textColor: Config["colors"][keyof Config["colors"]]; // Text color of the panel
    headerLink: number | null; // Which header link to highlight when the panel is active
    verticalShift?: number; // An addition to the "top" style property of the panel
    fullHeight?: boolean; // Whether the panel takes up the full height of the viewport
  }[];
}

export const CONFIG: Config = {
  firstTransition: 200, // Minimum amount to scroll before the first transition occurs.
  topHighOffset: 50, // Minimum amount to scroll before each subsequent transition occurs.
  bottomHighOffset: 100, // Minimum amount of blank space below each panel before transition can occur.
  smallScreenThreshold: 100, // Viewport must be this many pixels taller than the tallest panel to not be "small".
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
    fullHeight: true,
  },
  {
    id: 1,
    bgColor: CONFIG.colors.blue,
    textColor: CONFIG.colors.pureWhite,
    headerLink: 0,
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
