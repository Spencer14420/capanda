let scrollPoints = [];
const numPanels = 5 //Total number of panels, including top image, counted starting at 1
const panelPrefix = ".panel";

const setPositions = () => {
  const headerHeight = document.querySelector("nav").clientHeight;
  const panelHeight = panel => document.querySelector(`${panelPrefix+panel}`).offsetHeight;
  const selectors = ['value', 'leadership', 'dedication', 'focus'];
  const panels = [
    document.querySelector(`#${selectors[0]}-panel`), 
    document.querySelector(`#${selectors[1]}-panel`), 
    document.querySelector(`#${selectors[2]}-panel`), 
    document.querySelector(`#${selectors[3]}-panel`)
  ];
  const largestPanelHeight = Math.max(...panels.map(panel => panel.clientHeight));
  const firstTransition = 200; //Position of first transition when scrolling down
  const extraneousArea = firstTransition + headerHeight;
  const raiseBy = 300; //Raise each panel by this number of pixels

  //Set transition points, position of panels, and visibility of header links
  scrollPoints = [firstTransition]; 
  for (let i = 2; i <= numPanels; i++) {
    let scrollPoint = (scrollPoints[i-2] + panelHeight(i));
    scrollPoints.push(scrollPoint);
  
    let navbar = document.querySelector(".navbar-nav");
    let panel = document.querySelector(`${panelPrefix+i}`);
  
    navbar.style.display = (window.innerHeight - headerHeight <= largestPanelHeight) ? "none" : "flex";
  
    panel.style.top = (window.innerHeight - headerHeight <= largestPanelHeight) ?
      `${extraneousArea - window.innerHeight*0.9}px` : //Position the panels near the top of the screen if the largest panel would be placed too high
      `-${(i === 2 ? 0 : raiseBy) + (panelHeight(i) + window.innerHeight - 2*extraneousArea)/2}px`; //Place the middle of the text in the middle of the screen
  }
  
 scrollPoints = [firstTransition, scrollPoints[1] - raiseBy, scrollPoints[2] - raiseBy, scrollPoints[3] - raiseBy, scrollPoints[4] - raiseBy]

  //Set padding for top panel (so text doesn't go under header)
  document.querySelector(".top-panel").style.paddingTop = `${headerHeight}px`;

  //Position #value element, etc. (for header links)
  //When the middle of the panel is in the middle of the screen
  //these elements should be located at the top of the screen
  selectors.forEach(selector => {
    const panel = document.querySelector(`#${selector}-panel`);
    const topBottom = (window.innerHeight - panel.clientHeight + headerHeight) /2;

    document.querySelector(`#${selector}`).style.height = `${topBottom}px`;
    document.querySelector(`#${selector}`).style.marginTop = `-${topBottom}px`;
  });

  //Set height of the body at the bottom of the last panel
  const lastPanelBottom = document.querySelector(`${panelPrefix+numPanels}`).getBoundingClientRect().bottom + window.scrollY;
  document.querySelector("body").style.height = `${lastPanelBottom}px`;
  document.querySelector("#footer").style.marginTop = `${(window.innerHeight - 2*extraneousArea)/2}px`;
}

window.addEventListener('load', setPositions);
window.onresize = setPositions;

//toggleTopPanel(0) hides the top panel and toggleTopPanel(1) makes it visible
function toggleTopPanel(state) {
  const opacity = state === 1 ? '1' : '0';
  const pointerEvents = state === 1 ? 'none' : 'auto';

  const topPanel = document.querySelector('.top-panel');
  topPanel.style.opacity = opacity;

  const panel2 = document.querySelector(`${panelPrefix}2`);
  panel2.style.opacity = '0';
  panel2.style.pointerEvents = pointerEvents;
}


//Changes the text colour of the selected panel
function textColour(colour, panel) {
  const text = document.querySelectorAll(`${panelPrefix+panel} p:not(#openingpara), ${panelPrefix+panel} h1:not(#openingpara)`);
  if (colour === 'white') {
    text.forEach(element => element.classList.add('text-white'));
  } else {
    text.forEach(element => element.classList.remove('text-white'));
  }
}

//Changes the text colour via textColour() and opacity to make the selected panel visible
function showText(panel) {
  const panels = document.querySelectorAll(`${panelPrefix}2, ${panelPrefix}3, ${panelPrefix}4, ${panelPrefix}5`);
  textColour(panel % 2 ? 'white' : 'black', panel + 1);
  panels.forEach(p => p.style.opacity = '0');
  panels[panel - 1].style.opacity = '1';
}

//Changes the background colour
function changeColour(colour) {
  const panels = document.querySelectorAll(`body, ${panelPrefix}2, ${panelPrefix}3, ${panelPrefix}4, ${panelPrefix}5`);
  toggleTopPanel(0);
  panels.forEach(p => p.style.backgroundColor = colour);
}

// Highlight header links based on which panel is visible
function headerLinks(highlightLink) {
  const headerLinks = document.querySelector(".navbar-nav").children;
  
  for (let i = 0; i < headerLinks.length; i++) {
    headerLinks[i].classList.remove("text-danger", "text-dark");
    if (i === highlightLink) {
      headerLinks[i].classList.add("text-danger")
    } else {
      headerLinks[i].classList.add("text-dark")
    }
  }
}

window.addEventListener('scroll', function() {

  //True if the top of the panel is above the bottom of the header
  let panelTopHigh = [
    document.querySelector(`${panelPrefix}2`).getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false,
    document.querySelector(`${panelPrefix}3`).getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false,
    document.querySelector(`${panelPrefix}4`).getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false
  ];

  //True if the bottom of the panel is above the bottom of the screen
  let panelBottomHigh = [
    document.querySelector(`${panelPrefix}2`).getBoundingClientRect().bottom < window.innerHeight ? true : false,
    document.querySelector(`${panelPrefix}3`).getBoundingClientRect().bottom < window.innerHeight ? true : false,
    document.querySelector(`${panelPrefix}4`).getBoundingClientRect().bottom < window.innerHeight ? true : false
  ];
  console.log(panelTopHigh)

  const screenTop = window.scrollY;

  if (screenTop < scrollPoints[0]) {
    toggleTopPanel(1);
    headerLinks(-1);
  } else if (screenTop >= scrollPoints[0] && screenTop < scrollPoints[1]) {
    changeColour('#0e2c57');
    showText(1);
    headerLinks(0);
  //} else if (screenTop >= scrollPoints[1] && screenTop < scrollPoints[2]) {
  } else if (panelTopHigh[0] === true && panelTopHigh[1] === false && panelTopHigh[2] === false) {
    changeColour('white');
    showText(2);
    headerLinks(1);
  //} else if (screenTop >= scrollPoints[2] && screenTop < scrollPoints[3]) {
  } else if (panelTopHigh[0] === true && panelTopHigh[1] === true && panelTopHigh[2] === false) {
    changeColour('#14171c');
    showText(3);
    headerLinks(2);
  //} else if (screenTop >= scrollPoints[3]) {
  } else if (panelTopHigh[0] === true && panelTopHigh[1] === true && panelTopHigh[2] === true) {
    changeColour('#ededed');
    showText(4);
    headerLinks(3);
  }
});