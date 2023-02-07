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
  scrollPoints = [200]; //Position of first transition when scrolling down
  let extraneousArea = scrollPoints[0] + headerHeight;
  for (let i = 2; i <= numPanels; i++) {
    let scrollPoint = scrollPoints[i-2] + panelHeight(i);
    scrollPoints.push(scrollPoint);

    if (window.innerHeight - headerHeight <= largestPanelHeight) {
      document.querySelector(".navbar-nav").style.display = "none";
      document.querySelector(`.panel${i}`).style.top = `${extraneousArea - window.innerHeight*0.9}px`; //Position the panels near the top of the screen if the largest panel would be placed too high
    } else {
      document.querySelector(".navbar-nav").style.display = "flex";
      document.querySelector(`.panel${i}`).style.top = `-${(panelHeight(i) + window.innerHeight - 2*extraneousArea)/2}px`; //Place the middle of the text in the middle of the screen
    }
  }

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

function hideTopPanel() {
  $('.top-panel').css('opacity', '0');
  $('.panel2').css({
    'opacity': '0',
    'pointer-events': 'auto',
  });
}

function showTopPanel() {
  $('.top-panel').css('opacity', '1');
  $('.panel2').css({
    'opacity': '0',
    'pointer-events': 'none',
  });
}

function textColour(colour, panel) {
  const text = $(`.panel${panel} p:not(#openingpara), .panel${panel} h1:not(#openingpara)`);
  if (colour === 'white') {
    text.addClass('text-white');
  } else {
    text.removeClass('text-white');
  }
}

function showText(panel) {
  if (panel === 1) {
    textColour('white', 2);
    $('.panel3, .panel4, .panel5').css('opacity', '0');
    $('.panel2').css('opacity', '1');
  } else if (panel === 2) {
    textColour('black', 4);
    $('.panel2, .panel4, .panel5').css('opacity', '0');
    $('.panel3').css('opacity', '1');
  } else if (panel === 3) {
    textColour('white', 4);
    $('.panel2, .panel3, .panel5').css('opacity', '0');
    $('.panel4').css('opacity', '1');
  } else if (panel === 4) {
    textColour('black', 5);
    $('.panel2, .panel3, .panel4').css('opacity', '0');
    $('.panel5').css('opacity', '1');
  }
}

function changeColour(colour) {
  const panels = $('body, .panel2, .panel3, .panel4, .panel5');
  hideTopPanel();
  if (colour === 'blue') {
    panels.css('background-color', '#0e2c57');
  } else if (colour === 'white') {
    panels.css('background-color', 'white');
  } else if (colour === 'black') {
    panels.css('background-color', '#14171c');
  } else if (colour === 'grey') {
    panels.css('background-color', '#ededed');
  }
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
  const screenTop = window.scrollY;

  if (screenTop < scrollPoints[0]) {
    showTopPanel();
    headerLinks(-1);
  } else if (screenTop >= scrollPoints[0] && screenTop < scrollPoints[1]) {
    changeColour('blue');
    showText(1);
    headerLinks(0);
  } else if (screenTop >= scrollPoints[1] && screenTop < scrollPoints[2]) {
    changeColour('white');
    showText(2);
    headerLinks(1);
  } else if (screenTop >= scrollPoints[2] && screenTop < scrollPoints[3]) {
    changeColour('black');
    showText(3);
    headerLinks(2);
  } else if (screenTop >= scrollPoints[3]) {
    changeColour('grey');
    showText(4);
    headerLinks(3);
  }
});