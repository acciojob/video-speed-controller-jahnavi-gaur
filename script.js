// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


// Select elements
const video = document.querySelector('.flex');
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

// Create custom controls dynamically (since we can't modify HTML)
const controls = document.createElement('div');
controls.classList.add('controls');
controls.innerHTML = `
  <div class="progress"><div class="progress__filled"></div></div>
  <button class="player__button toggle">►</button>
  <button data-skip="-10" class="player__button">« 10s</button>
  <button data-skip="25" class="player__button">25s »</button>
  <label>Volume</label>
  <input type="range" name="volume" min="0" max="1" step="0.05" value="1">
  <label>Speed</label>
  <input type="range" name="playbackRate" min="0.5" max="2" step="0.1" value="1">
`;
document.body.appendChild(controls);

// Select dynamic elements
const toggle = controls.querySelector('.toggle');
const progress = controls.querySelector('.progress');
const progressBar = controls.querySelector('.progress__filled');
const skipButtons = controls.querySelectorAll('[data-skip]');
const ranges = controls.querySelectorAll('input[type="range"]');

// Toggle play/pause
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// Update play/pause button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub (seek)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Volume and speed
function handleRangeUpdate() {
  video[this.name] = this.value;
  if (this.name === 'playbackRate') speedBar.textContent = `${this.value}×`;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
