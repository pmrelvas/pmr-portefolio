const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');
const btnToggleSidenav = document.getElementById('btn-toggle-sidenav');
const navEl = document.getElementById('nav');
let currentPage = 'home';

btnToggleSidenav.addEventListener('click', onToggleSidenavClick);

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
