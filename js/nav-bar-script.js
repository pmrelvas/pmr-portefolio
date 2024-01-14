const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');
const btnToggleSidenav = document.getElementById('btn-toggle-sidenav');
const stToggleTheme = document.getElementById('st-theme-switcher');
const navEl = document.getElementById('nav');
const iconThemeSun = document.getElementById('i-theme-sun');
const iconThemeMoon = document.getElementById('i-theme-moon');
let currentPage = 'home';

btnToggleSidenav.addEventListener('click', onToggleSidenavClick);
stToggleTheme.addEventListener('change', () => {
  if (stToggleTheme.checked) {
    document.body.classList.replace('light-theme', 'dark-theme');
    iconThemeMoon.classList.replace('hidden', 'visible');
    iconThemeSun.classList.replace('visible', 'hidden');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    iconThemeMoon.classList.replace('visible', 'hidden');
    iconThemeSun.classList.replace('hidden', 'visible');
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
