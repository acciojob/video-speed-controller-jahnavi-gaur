// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const rewind = document.querySelector('.rewind');
const skipButtons = document.querySelectorAll('.skip');
const inputs = document.querySelectorAll('.controls input');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Play/Pause toggle
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Rewind button
function skipRewind() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Skip buttons (forward 25s)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Volume and playback speed
function handleUpdate() {
  video[this.name] = this.value;
  if(this.name === 'playbackRate'){
    document.querySelector('.speed-bar').textContent = this.value + '×';
  }
}

// Progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
rewind.addEventListener('click', skipRewind);

skipButtons.forEach(button => button.addEventListener('click', skip));
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
