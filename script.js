const tracks = [
  { title: "ZAAZAA", artist: "Frenna ft. Shallipopi", src: "music/zaazaa.mp3" },
  { title: "Kainama", artist: "Harmonize x Burna Boy x Diamond Platnumz", src: "music/kainama.mp3" },
  { title: "Chop My Money Remix", artist: "P-Square ft. Akon, May-D", src: "music/chop-my-money.mp3" }
];

const audio = new Audio();
let index = 0;

const $ = (id) => document.getElementById(id);
const titleEl = $("title"), artistEl = $("artist"), progress = $("progress");
const currentEl = $("current"), durationEl = $("duration");
const playBtn = $("play"), volume = $("volume"), list = $("playlist");

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function load(i) {
  index = (i + tracks.length) % tracks.length;
  audio.src = tracks[index].src;
  titleEl.textContent = tracks[index].title;
  artistEl.textContent = tracks[index].artist;
  [...list.children].forEach((li, n) => li.classList.toggle("active", n === index));
}

function play() { audio.play(); playBtn.textContent = "⏸"; }
function pause() { audio.pause(); playBtn.textContent = "▶"; }

tracks.forEach((t, i) => {
  const li = document.createElement("li");
  li.textContent = `${t.title} - ${t.artist}`;
  li.onclick = () => { load(i); play(); };
  list.appendChild(li);
});

playBtn.onclick = () => (audio.paused ? play() : pause());
$("next").onclick = () => { load(index + 1); play(); };
$("prev").onclick = () => { load(index - 1); play(); };
volume.oninput = () => (audio.volume = volume.value);
progress.oninput = () => (audio.currentTime = (progress.value / 100) * audio.duration);

audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentEl.textContent = fmt(audio.currentTime);
};
audio.onloadedmetadata = () => (durationEl.textContent = fmt(audio.duration));
audio.onended = () => { load(index + 1); play(); };

load(0);