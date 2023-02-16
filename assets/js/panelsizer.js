const numPanels = 5; //Total number of panels, including top image, counted starting at 1
const firstTransition = 200; //Position of first transition when scrolling down
const topHighOffset = 50; //Panels won't transition until the top of the panel is *this number of pixels* above the bottom of the header
const bottomHighOffset = 100; //Panels won't transition until the bottom of the panel is *this number of pixels* above the bottom of the screen
const minTopBottomSpace = 100; //Extra space is added if there would be less than *this number of pixels* at the top and bottom of the panel when a transition occurs.
const shortScreenAddition = 300; //Push panels down by *this number of pixels* on short screens (define by minTopBottomSpace)
const largeScreenAddition = 50; //Push panels down by *this number of pixels* on non-short screens
const panelPrefix = ".panel";
const blue = "#0e2c57";
const white = "#ededed";
const black = "#14171c";
const getElementY = (el) => el.getBoundingClientRect().y + window.scrollY;

const setPositions = () => {
  let transitionY = [];
  const headerHeight = document.querySelector("nav").clientHeight;
  const navbar = document.querySelector(".navbar-nav");
  const panelHeight = (panel) =>
    document.querySelector(`${panelPrefix + panel}`).offsetHeight;
  const selectors = ["value", "leadership", "dedication", "focus"];
  const panels = [
    document.querySelector(`#${selectors[0]}-panel`),
    document.querySelector(`#${selectors[1]}-panel`),
    document.querySelector(`#${selectors[2]}-panel`),
    document.querySelector(`#${selectors[3]}-panel`),
  ];
  const largestPanelHeight = Math.max(
    ...panels.map((panel) => panel.clientHeight)
  );
  const useableArea = window.innerHeight - headerHeight;
  const shortScreen = useableArea < largestPanelHeight + minTopBottomSpace * 2;

  //Set transition points, position of panels, and visibility of header links
  let addition = shortScreen ? shortScreenAddition : largeScreenAddition;
  for (let i = 2; i <= numPanels; i++) {
    let panel = document.querySelector(`${panelPrefix + i}`);
    let panelH = panelHeight(i);

    panel.style.marginTop = "0px";

    //If the height of the screen is shorter than the largest panel
    if (useableArea > largestPanelHeight) {
      panel.style.marginTop = `${
        i === 2
          ? -(useableArea + panelH) / 2 + firstTransition + addition
          : transitionY[i - 3] -
            getElementY(panel) +
            (window.innerHeight - panelH) / 2 +
            addition
      }px`;

      //The point in which the next panel will show per panelTopHigh();
      transitionY.push(
        panel.getBoundingClientRect().y -
          document.querySelector("nav").clientHeight +
          window.scrollY +
          topHighOffset
      );
    } else {
      panel.style.marginTop = `${-useableArea / 2}px`;
    }
  }

  //Hide header links on short screens
  if (useableArea < largestPanelHeight + 50) {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "flex";
  }

  //Set padding for top panel (so text doesn't go under header)
  document.querySelector(".top-panel").style.paddingTop = `${headerHeight}px`;

  //Position #value element, etc. (for header links)
  //When the middle of the panel is in the middle of the screen
  //these elements should be located at the top of the screen
  selectors.forEach((selector) => {
    const panel = document.querySelector(`#${selector}-panel`);
    const topBottom =
      (window.innerHeight - panel.clientHeight + headerHeight) / 2 -
      topHighOffset;

    document.querySelector(`#${selector}`).style.height = `${topBottom}px`;
    document.querySelector(`#${selector}`).style.marginTop = `-${topBottom}px`;
  });
};

window.addEventListener("load", setPositions);
window.onresize = setPositions;

//toggleTopPanel(0) hides the top panel and toggleTopPanel(1) makes it visible
function toggleTopPanel(state) {
  const opacity = state === 1 ? "1" : "0";
  const pointerEvents = state === 1 ? "none" : "auto";

  const topPanel = document.querySelector(".top-panel");
  topPanel.style.opacity = opacity;

  const panel2 = document.querySelector(`${panelPrefix}2`);
  panel2.style.opacity = "0";
  panel2.style.pointerEvents = pointerEvents;
}

//Changes the text colour of the selected panel
function textColour(colour, panel) {
  const text = document.querySelectorAll(
    `${panelPrefix + panel} p:not(#openingpara), ${
      panelPrefix + panel
    } h1:not(#openingpara)`
  );
  if (colour === "white") {
    text.forEach((element) => element.classList.add("text-white"));
  } else {
    text.forEach((element) => element.classList.remove("text-white"));
  }
}

//Changes the text colour via textColour() and opacity to make the selected panel visible
function showText(panel) {
  const panels = document.querySelectorAll(
    `${panelPrefix}2, ${panelPrefix}3, ${panelPrefix}4, ${panelPrefix}5`
  );
  textColour(panel % 2 ? "white" : "black", panel + 1);
  panels.forEach((p) => (p.style.opacity = "0"));
  panels[panel - 1].style.opacity = "1";
}

//Changes the background colour
function changeColour(colour) {
  const panels = document.querySelectorAll(
    `body, ${panelPrefix}2, ${panelPrefix}3, ${panelPrefix}4, ${panelPrefix}5`
  );
  toggleTopPanel(0);
  panels.forEach((p) => (p.style.backgroundColor = colour));
}

// Highlight header links based on which panel is visible
function headerLinks(highlightLink) {
  const headerLinks = document.querySelector(".navbar-nav").children;

  for (let i = 0; i < headerLinks.length; i++) {
    headerLinks[i].classList.remove("text-danger", "text-dark");
    if (i === highlightLink) {
      headerLinks[i].classList.add("text-danger");
    } else {
      headerLinks[i].classList.add("text-dark");
    }
  }
}

window.addEventListener("scroll", function () {
  let panelTopHigh = [];
  let panelBottomHigh = [];
  for (let i = 2; i <= numPanels - 1; i++) {
    //True if the top of the panel is above the bottom of the header, plus topHighOffset
    panelTopHigh.push(
      document.querySelector(`${panelPrefix + i}`).getBoundingClientRect().y <
        document.querySelector("nav").clientHeight - topHighOffset
    );
    //True if the bottom of the panel is above the bottom of the screen, by at least bottomHighOffset
    panelBottomHigh.push(
      document.querySelector(`${panelPrefix + i}`).getBoundingClientRect()
        .bottom <
        window.innerHeight - bottomHighOffset
    );
  }

  const screenTop = window.scrollY;

  if (screenTop < firstTransition) {
    toggleTopPanel(1);
    headerLinks(-1);
  } else if (screenTop >= firstTransition && panelTopHigh[0] === false) {
    changeColour(blue);
    showText(1);
    headerLinks(0);
  } else if (
    panelTopHigh[0] === true &&
    panelTopHigh[1] === false &&
    panelTopHigh[2] === false &&
    panelBottomHigh[0] === true
  ) {
    changeColour(white);
    showText(2);
    headerLinks(1);
  } else if (
    panelTopHigh[1] === true &&
    panelTopHigh[2] === false &&
    panelBottomHigh[1] === true
  ) {
    changeColour(black);
    showText(3);
    headerLinks(2);
  } else if (panelTopHigh[2] === true && panelBottomHigh[2] === true) {
    changeColour(white);
    showText(4);
    headerLinks(3);
  }
});
