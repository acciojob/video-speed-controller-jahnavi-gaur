// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Select existing elements
const video = document.querySelector('.flex');

// ✅ Add expected class for Cypress tests
video.classList.add('player__video');

// Create custom controls dynamically (Cypress expects .toggle, .rewind, etc.)
const controls = document.createElement('div');
controls.classList.add('controls');
controls.innerHTML = `
  <div class="progress"><div class="progress__filled"></div></div>
  <button class="player__button toggle">►</button>
  <button class="player__button rewind" data-skip="-10">« 10s</button>
  <button class="player__button forward" data-skip="25">25s »</button>
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

// Play/pause toggle
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update toggle icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip backward or forward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Volume and speed controls
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

// Progress bar scrub behavior
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
