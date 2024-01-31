const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');
const btnToggleSidenav = document.getElementById('btn-toggle-sidenav');
const stToggleTheme = document.getElementById('st-theme-switcher');
const navEl = document.getElementById('nav');
const iconThemeSun = document.getElementById('i-theme-sun');
const iconThemeMoon = document.getElementById('i-theme-moon');
const activeThemeKey = "activeTheme";
const darkTheme = "dark-theme";
const lightTheme = "light-theme";
let currentPage = 'home';
const imgCloud = document.getElementById('img-cloud');
const imgTechIcons = document.querySelectorAll('.tech-icon');
const img5dpoRobot = document.getElementById('img-5dpo-robot');

btnToggleSidenav.addEventListener('click', onToggleSidenavClick);
stToggleTheme.addEventListener('change', () => {
  setTheme(stToggleTheme.checked ? darkTheme : lightTheme);
});

document.addEventListener("DOMContentLoaded", (event) => {
  let activeTheme = localStorage.getItem(activeThemeKey);
  if (!activeTheme) {
    activeTheme = darkTheme;
  }
  if (activeTheme == darkTheme) {
    stToggleTheme.click();
  }
});

window.addEventListener('scroll', () => {
  fullPageElms.forEach((fullPageEl) => {
    if (window.scrollY >= fullPageEl.offsetTop) {
      currentPage = fullPageEl.id;
    }
  });
  navLinkElms.forEach((navLinkEl) => {
    // highlight current page nav item
    if (navLinkEl.href.includes(currentPage)) {
      navLinkEl.classList.add('active');
    } else {
      navLinkEl.classList.remove('active');
    }
  });
});

function setTheme(theme) {
  switch (theme) {
    case lightTheme:
      document.body.classList.replace(darkTheme, lightTheme);
      iconThemeMoon.classList.replace('visible', 'hidden');
      iconThemeSun.classList.replace('hidden', 'visible');
      localStorage.setItem(activeThemeKey, lightTheme);
      imgCloud.classList.replace('img-white', 'img-black');
      imgTechIcons.forEach(imgTechIcon => imgTechIcon.classList.replace('img-white', 'img-black'));
      img5dpoRobot.classList.replace('img-white', 'img-black');
      break;
    case darkTheme:
    default:
      document.body.classList.replace(lightTheme, darkTheme);
      iconThemeMoon.classList.replace('hidden', 'visible');
      iconThemeSun.classList.replace('visible', 'hidden');
      localStorage.setItem(activeThemeKey, darkTheme);
      imgCloud.classList.replace('img-black', 'img-white');
      imgTechIcons.forEach(imgTechIcon => imgTechIcon.classList.replace('img-black', 'img-white'));
      img5dpoRobot.classList.replace('img-black', 'img-white');
      break;
  }
}

function onToggleSidenavClick() {
  const isDataVisible = navEl.getAttribute('data-visible');
  if (isDataVisible === 'false') {
    navEl.setAttribute('data-visible', true);
    navEl.setAttribute('aria-expanded', true);
  } else if (isDataVisible === 'true') {
    navEl.setAttribute('data-visible', false);
    navEl.setAttribute('aria-expanded', false);
  }
}
