const songs = [
  'assets/songs/song1.mp3',
  'assets/songs/song2.mp3',
  'assets/songs/song3.mp3',
  'assets/songs/song3.mp3'
];
let globalsongIndex = 0;
let playbtn = document.getElementById("playbtn");
let forwardbtn = document.getElementById("forward");
let backwardbtn = document.getElementById("back");


forwardbtn.addEventListener('click', function () {
    audioplayer.src = globalsongIndex < songs.length - 1 ? songs[++globalsongIndex] : songs[0];
    audioplayer.play();
    playbtn.src = "assets/pause-solid.svg";
});

backwardbtn.addEventListener('click', function () {
    audioplayer.src = globalsongIndex > 0 ? songs[--globalsongIndex] : songs[0];
    audioplayer.play();
    playbtn.src = "assets/pause-solid.svg";
});
let audioplayer = new Audio();

let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");
let musicProgress = document.getElementById("music-progress");

let songDetails = document.getElementById("songdetails");
let songDetailsImg = songDetails.querySelector("img");
let songDetailsTitle = songDetails.querySelector("p");

let cards = document.querySelectorAll(".card");

// Hover Effect for Cards
cards.forEach(card => {
  card.addEventListener('mouseover', function () {
    const secondImg = this.querySelectorAll("img")[1];
    if (secondImg) {
      secondImg.style.opacity = "1"; // Show play button on hover
    }
  });

  card.addEventListener('mouseout', function () {
    const secondImg = this.querySelectorAll("img")[1];
    if (secondImg) {
      secondImg.style.opacity = "0"; // Hide play button when not hovering
    }
  });

  // Play Song on Click
  card.addEventListener('click', function () {
    const id = this.id; // Get the card's id
    const lastCharacter = id.slice(-1); // Extract the last character
    const songIndex = lastCharacter - 1; // Get the corresponding song index
    globalsongIndex = songIndex;
    audioplayer.src = songs[songIndex]; // Update the audio source
    audioplayer.play(); // Play the audio

    playbtn.src = "assets/pause-solid.svg"; // Change play button to pause

    const coverImg = this.querySelector("img").src; // Get cover image from the clicked card
    const songTitle = this.querySelector("p").textContent; // Get song title from the clicked card

    songDetailsImg.src = coverImg; // Update the cover image in #songdetails
    songDetailsTitle.textContent = songTitle; // Update the song title in #songdetails
  });
});

// Toggle Play/Pause
playbtn.addEventListener('click', function () {
  if (audioplayer.paused) {
    audioplayer.play();
    this.src = "assets/pause-solid.svg";
  } else {
    audioplayer.pause();
    this.src = "assets/play-solid.svg";
  }
});

// Update Current Time, Duration, and Progress Bar
audioplayer.addEventListener("timeupdate", function () {
  const currentMinutes = Math.floor(audioplayer.currentTime / 60);
  const currentSeconds = Math.floor(audioplayer.currentTime % 60)
    .toString()
    .padStart(2, "0");
  const durationMinutes = Math.floor(audioplayer.duration / 60);
  const durationSeconds = Math.floor(audioplayer.duration % 60)
    .toString()
    .padStart(2, "0");

  // Update time display
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

  // Update progress bar
  musicProgress.value = (audioplayer.currentTime / audioplayer.duration) * 100 || 0;
});

// Seek Song with Progress Bar
musicProgress.addEventListener("input", function () {
  audioplayer.currentTime = (this.value / 100) * audioplayer.duration;
});
