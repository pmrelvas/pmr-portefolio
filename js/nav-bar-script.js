const navLinkElms = document.querySelectorAll('.nav-link');
const fullPageElms = document.querySelectorAll('.full-page');

let currentPage = 'home';
let navBar = document.getElementsByClassName('nav')[0];
const headerEl = document.getElementById('header');
const aboutMeEl = document.getElementById('about-me');
const experienceEl = document.getElementById('experience');
const experienceTimelineContainerEl = document.getElementById('experience-timeline-container');
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

    // TODO: refactor this to an Intersection Observer
    // change navbar color on about me page
    if (currentPage === 'about-me') {
      navLinkEl.classList.add('nav-link-accent');
    } else {
      navLinkEl.classList.remove('nav-link-accent');
    }
  });
});
