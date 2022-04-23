let scrollPoints = [200];

function setPositions() {
  // Set panels position
  for (let i = 0; i < 4; i += 1) {
    const panel = document.querySelector(`.panel${i + 2}`);
    const screenHeight = window.innerHeight - document.querySelector('nav').offsetHeight;

    if (i > 0) {
      let addition = panel.offsetHeight / 2;
      if (screenHeight / 2 < addition) {
        addition = panel.offsetHeight;
      }
      scrollPoints[i] = scrollPoints[i - 1] + addition;
    }

    const correctTop = scrollPoints[i] + screenHeight;

    panel.style.top = `${correctTop}px`;
  }

  //First text-panel is too low on certain phones
  if (window.innerHeight >= 775 && window.innerWidth <= 450) {
    let panel = document.querySelector(".panel2");
    panel.style.top = `${parseInt(panel.style.top) - 200}px`;
  }

  // Set footer position
  const mainHeight = document.querySelector('main').offsetHeight;
  const footerHeight = document.querySelector('footer').offsetHeight;
  const bodyBottom = document.body.getBoundingClientRect().bottom;
  const lastBottom = bodyBottom - document.querySelector('.panel5').getBoundingClientRect().bottom;
  document.querySelector('main').style.height = `${mainHeight - lastBottom + footerHeight}px`;
}

$(document).ready(setPositions);
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
  const panels = $('main, body, .panel2, .panel3, .panel4, .panel5');
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
  const screenTop = $(window).scrollTop();

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
