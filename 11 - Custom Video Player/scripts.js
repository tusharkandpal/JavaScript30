// Get the elements
const video = document.querySelector('.viewer');

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');

const ranges = [...document.querySelectorAll('.player__slider')];
const skipButtons = [...document.querySelectorAll('button[data-skip]')];

// Functions
function togglePlay(e) {
    if (video.paused)
    {
        video.play();
        toggle.textContent = '❚ ❚';
    }
    else
    {
        video.pause();
        toggle.textContent = '►';
    }
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function updateTime() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

ranges.map( range => {
    range.addEventListener('change', handleRangeUpdate)
    range.addEventListener('mousemove', handleRangeUpdate)
})
skipButtons.map( button => button.addEventListener('click', updateTime));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
