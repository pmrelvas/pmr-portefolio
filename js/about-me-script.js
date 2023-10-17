const aboutMeTitleEl = document.getElementById('about-me-title');
const titleDiameterMin = 50;
const titleDiameterStd = 200;
const titleMaxFontSizeRem = 9;
const titleMinFontSizeRem = 0.2;

window.addEventListener('scroll', () => {

    // explode about me page title
    if (window.scrollY < experienceEl.offsetTop) {
        let aboutMeTitleContainerFactor = 1.5 * (window.scrollY - aboutMeEl.offsetTop);
        let aboutMeTitleFactor = 0.02 * (window.scrollY - aboutMeEl.offsetTop);
        let titleDiameter = Math.max(
          titleDiameterMin,
          titleDiameterStd + aboutMeTitleContainerFactor
        ) + 'px';
        aboutMeTitleEl.style.height = titleDiameter;
        aboutMeTitleEl.style.width = titleDiameter;
        aboutMeTitleEl.style.fontSize = Math.min(
          titleMaxFontSizeRem,
          Math.max(titleMinFontSizeRem, 1.5 + aboutMeTitleFactor)
        ) + 'rem';
    }
});