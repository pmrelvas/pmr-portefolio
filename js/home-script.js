const homeThunderLightening = document.getElementById('home-thunder-lightening');
const titleFullStack = document.getElementById('title-full-stack');
const titleName = document.getElementById('title-name');
const imgPmrPhoto = document.getElementById('img-pmr-photo');

const onThunderClick = () => {
  homeThunderLightening.classList.add('thunder-animation');

  setTimeout(() => {
    homeThunderLightening.classList.remove('thunder-animation');
  }, 2000);
}

titleFullStack.addEventListener('click', onThunderClick);
titleName.addEventListener('click', onThunderClick);
imgPmrPhoto.addEventListener('click', onThunderClick);
