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
      console.log(entry.target.textContent);
      entry.target.classList.add('exp-timeline-item-animation');
    }
  });
});

document.querySelectorAll('.exp-timeline-item').forEach((element) => {
  timelineItemsObserver.observe(element);
});
