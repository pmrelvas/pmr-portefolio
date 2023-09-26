// ----------------------------------------------------------
// nav bar
const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');

let currentPage = 'home';
window.addEventListener('scroll', () => {
  fullPageElms.forEach((fullPageEl) => {
    if (window.scrollY >= fullPageEl.offsetTop) {
      currentPage = fullPageEl.id;
    }
  });
  navLinkElms.forEach((navLinkEl) => {
    if (navLinkEl.href.includes(currentPage)) {
      navLinkEl.classList.add('active');
    } else {
      navLinkEl.classList.remove('active');
    }
  });
});

// ----------------------------------------------------------
// home parallax effect
const imgMoonEl = document.getElementById("img-moon");
const homeTitleEl = document.getElementById("home-title");
const initialHomeTitleTop = homeTitleEl.getBoundingClientRect().top;
const imgCloudEl = document.getElementById("img-cloud");
const initialCloudLeft = imgCloudEl.getBoundingClientRect().left;
const techIconsContainerEl = document.getElementById("tech-icons-container");
const initialTechIconsContainer = techIconsContainerEl.getBoundingClientRect().left;


window.addEventListener('scroll', () => {
  imgMoonEl.style.top = - 0.9 * window.scrollY + 'px';
  homeTitleEl.style.top = initialHomeTitleTop + 1.4 * window.scrollY + 'px';
  imgCloudEl.style.left = initialCloudLeft + window.scrollY + 'px';
  techIconsContainerEl.style.left = initialTechIconsContainer + window.scrollY + 'px';
});