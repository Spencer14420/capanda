export const CONFIG = {
    firstTransition: 200, //Minimum amount to scroll before the first transision occurs.
    topHighOffset: 50, //Minimum amount to scroll before each subsequent transition occurs
    bottomHighOffset: 100, //Minimum amount of blank space below each panel before transition can occur
    minTopBottomSpace: 100, //Minimum space required above and below the tallest panel to consider the screen "large"
    shortScreenAddition: 300, //Pushes the panels down by this amount on short screens
    largeScreenAddition: 50, //Pushes the panels down by this amount on large screens
    panelPrefix: ".panel",
    colors: {
      blue: "#0e2c57",
      white: "#ededed",
      black: "#14171c",
    },
  };