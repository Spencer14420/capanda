let scrollPoints = [];
const numPanels = 5 //Total number of panels, including top image, counted starting at 1

const setPositions = () => {
  let panelHeight = panel => document.querySelector(`.panel${panel}`).offsetHeight;
  let headerHeight = document.querySelector("nav").clientHeight;

  let largestPanelHeight = Math.max(
    document.querySelector("#value-panel").clientHeight, 
    document.querySelector("#leadership-panel").clientHeight, 
    document.querySelector("#dedication-panel").clientHeight, 
    document.querySelector("#focus-panel").clientHeight
    );

  //Set transition points, position of panels, and visibility of header links
  let firstTransition = 200;
  scrollPoints = [firstTransition]; //Position of first transition when scrolling down
  let extraneousArea = scrollPoints[0] + headerHeight;
  const raiseBy = 400; //Raise each panel by this number of pixels
  for (let i = 2; i <= numPanels; i++) {
    let scrollPoint = (scrollPoints[i-2] + panelHeight(i));
    scrollPoints.push(scrollPoint);
  
    let navbar = document.querySelector(".navbar-nav");
    let panel = document.querySelector(`.panel${i}`);
  
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
  const selectors = ['value', 'leadership', 'dedication', 'focus'];
  selectors.forEach(selector => {
    const panel = document.querySelector(`#${selector}-panel`);
    const topBottom = (window.innerHeight - panel.clientHeight + headerHeight) /2;

    document.querySelector(`#${selector}`).style.height = `${topBottom}px`;
    document.querySelector(`#${selector}`).style.marginTop = `-${topBottom}px`;
  });
}

window.addEventListener('load', setPositions);
window.onresize = setPositions;

//toggleTopPanel(0) hides the top panel and toggleTopPanel(1) makes it visible
function toggleTopPanel(state) {
  const opacity = state === 1 ? '1' : '0';
  const pointerEvents = state === 1 ? 'none' : 'auto';

  const topPanel = document.querySelector('.top-panel');
  topPanel.style.opacity = opacity;

  const panel2 = document.querySelector('.panel2');
  panel2.style.opacity = '0';
  panel2.style.pointerEvents = pointerEvents;
}


//Changes the text colour of the selected panel
function textColour(colour, panel) {
  const text = $(`.panel${panel} p:not(#openingpara), .panel${panel} h1:not(#openingpara)`);
  if (colour === 'white') {
    text.addClass('text-white');
  } else {
    text.removeClass('text-white');
  }
}

//Changes the text colour via textColour() and opacity to make the selected panel visible
function showText(panel) {
  const panels = document.querySelectorAll('.panel2, .panel3, .panel4, .panel5');
  textColour(panel % 2 ? 'white' : 'black', panel + 1);
  panels.forEach(p => p.style.opacity = '0');
  panels[panel - 1].style.opacity = '1';
}

//Changes the background colour
function changeColour(colour) {
  const panels = document.querySelectorAll('body, .panel2, .panel3, .panel4, .panel5');
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

$(window).scroll(() => {

  //True if the top of the panel is above the bottom of the header
  let panelTopHigh = [
    document.querySelector(".panel2").getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false,
    document.querySelector(".panel3").getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false,
    document.querySelector(".panel4").getBoundingClientRect().y < document.querySelector("nav").clientHeight ? true : false
  ];

  //True if the bottom of the panel is above the bottom of the screen
  let panelBottomHigh = [
    document.querySelector(".panel2").getBoundingClientRect().bottom < window.innerHeight ? true : false,
    document.querySelector(".panel3").getBoundingClientRect().bottom < window.innerHeight ? true : false,
    document.querySelector(".panel4").getBoundingClientRect().bottom < window.innerHeight ? true : false
  ];

  const screenTop = window.scrollY;

  if (screenTop < scrollPoints[0]) {
    toggleTopPanel(1);
    headerLinks(-1);
  } else if (screenTop >= scrollPoints[0] && screenTop < scrollPoints[1]) {
    changeColour('#0e2c57');
    showText(1);
    headerLinks(0);
  } else if (screenTop >= scrollPoints[1] && screenTop < scrollPoints[2]) {
    changeColour('white');
    showText(2);
    headerLinks(1);
  } else if (screenTop >= scrollPoints[2] && screenTop < scrollPoints[3]) {
    changeColour('#14171c');
    showText(3);
    headerLinks(2);
  } else if (screenTop >= scrollPoints[3]) {
    changeColour('#ededed');
    showText(4);
    headerLinks(3);
  }
});
