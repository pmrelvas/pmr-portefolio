const aboutMeCircleEl = document.getElementById('about-me-circle');
const aboutMeEl = document.getElementById('about-me');
const experienceEl = document.getElementById('experience');
const circleDiameterMin = 0;
const circleDiameterStd = 100;

window.addEventListener('scroll', () => {
    // explode about me page title
    if (window.scrollY < experienceEl.offsetTop) {
        let aboutMeCircleContainerFactor = 1.5 * (window.scrollY - aboutMeEl.offsetTop);
        let circleDiameter = Math.max(
          circleDiameterMin,
          circleDiameterStd + aboutMeCircleContainerFactor
        ) + 'px';
        aboutMeCircleEl.style.height = circleDiameter;
        aboutMeCircleEl.style.width = circleDiameter;
    }
});

const webDevObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('about-me-web-dev-animation');
    }
  });
});
webDevObserver.observe(document.getElementById('about-me-web-dev'));

const roboticsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('about-me-robotics-animation');
    }
  });
});
roboticsObserver.observe(document.getElementById('about-me-robotics'));