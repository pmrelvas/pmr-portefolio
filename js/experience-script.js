// animate timeline line on show
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('experience-timeline-animation');
    }
  });
});

timelineObserver.observe(document.getElementById('exp-timeline-line'));

// animate timeline items on show
const timelineItemsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('exp-timeline-item-animation');
    }
  });
});

document.querySelectorAll('.exp-timeline-item').forEach((element) => {
  timelineItemsObserver.observe(element);
});

// toggle snake game
const View = {
  EXPERIENCE_TIMELINE: 0,
  SNAKE_GAME: 1
}
let view = View.EXPERIENCE_TIMELINE;
const btnToggleGameView = document.getElementById('btn-experience-toggle-game');
const elExperienceTime = document.getElementById('experience-timeline');
const elSnakeSide = document.getElementById('snake-side');
btnToggleGameView.addEventListener('click', toggleGameView);

function toggleGameView() {
  if (view === View.EXPERIENCE_TIMELINE) {
    view = View.SNAKE_GAME;
    elExperienceTime.style.display = 'none';
    elSnakeSide.style.display = 'block';
    btnToggleGameView.style.color = 'white';
  } else {
    view = View.EXPERIENCE_TIMELINE;
    elExperienceTime.style.display = 'block';
    elSnakeSide.style.display = 'none';
    btnToggleGameView.style.color = '#2C80FF';
  }
}