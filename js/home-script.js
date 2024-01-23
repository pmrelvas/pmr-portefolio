const homeThunderLightening = document.getElementById('home-thunder-lightening');
const titleFullStack = document.getElementById('title-full-stack');
const titleName = document.getElementById('title-name');

const onTitleClick = () => {
  homeThunderLightening.classList.add('thunder-animation');

  setTimeout(() => {
    homeThunderLightening.classList.remove('thunder-animation');
  }, 2000);
}

titleFullStack.addEventListener('click', onTitleClick);
titleName.addEventListener('click', onTitleClick);
