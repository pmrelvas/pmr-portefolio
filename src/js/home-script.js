const homeThunderLightening = document.getElementById('home-thunder-lightening');
const titleFullStack = document.getElementById('title-full-stack');
const titleName = document.getElementById('title-name');
const homeTitle = document.getElementById('home-title');
const initialHomeTitleTop = document.getElementById('home-title').getBoundingClientRect().top;
const imgPmrPhoto = document.getElementById('img-pmr-photo');
const imgMountainLeft = document.getElementById('img-home-mountain-left');
const imgMountainRight = document.getElementById('img-home-mountain-right');
const aboutMeTop = document.getElementById('about-me').getBoundingClientRect().top;

const onThunderClick = () => {
  homeThunderLightening.classList.add('thunder-animation');

  setTimeout(() => {
    homeThunderLightening.classList.remove('thunder-animation');
  }, 2000);
};

titleFullStack.addEventListener('click', onThunderClick);
titleName.addEventListener('click', onThunderClick);
imgPmrPhoto.addEventListener('click', onThunderClick);

window.addEventListener('scroll', () => {
  homeTitle.style.top = Math.min(aboutMeTop, initialHomeTitleTop + 1.4 * window.scrollY) + 'px';
  imgMountainLeft.style.left = -2 * window.scrollY + 'px';
  imgMountainRight.style.right = -2 * window.scrollY + 'px';
});