// ----------------------------------------------------------
// nav bar
const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');

let currentPage = 'home';
let navBar = document.getElementsByClassName('nav')[0];
const headerEl = document.getElementById('header');
const aboutMeEl = document.getElementById('about-me');
const aboutMeTitleEl = document.getElementById('about-me-title');
const experienceEl = document.getElementById('experience');
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

    // change navbar color on about me page
    if (currentPage === 'about-me') {
      navLinkEl.classList.add('nav-link-accent');
    } else {
      navLinkEl.classList.remove('nav-link-accent');
    }

    if (window.scrollY < experienceEl.offsetTop) {
        let aboutMeTitleContainerFactor = 0.5 * (window.scrollY - aboutMeEl.offsetTop);
        let aboutMeTitleFactor = 0.05 * (window.scrollY - aboutMeEl.offsetTop);
        aboutMeTitleEl.style.height = 15 + aboutMeTitleContainerFactor + 'rem';
        aboutMeTitleEl.style.width = 15 + aboutMeTitleContainerFactor + 'rem';
        aboutMeTitleEl.style.fontSize = Math.min(9, 1.5 + aboutMeTitleFactor) + 'rem';
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