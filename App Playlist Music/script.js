//declaracion de variables
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const volumeControl = document.getElementById("volume-control"); // Nuevo: Agregado control de volumen


//data para la musica
const allSongs = [
  {
    id: 0,
    title: "Like You Do",
    artist: "Joji",
    duration: "3:36",
    src: "./Music/Joji - Like You Do.mp3",
    albumCover: "like_u_do"
  },
  {
    id: 1,
    title: "Slow Dancing In The Dark",
    artist: "Joji",
    duration: "3:37",
    src: "./Music/Joji - SLOW DANCING IN THE DARK .mp3",
    albumCover: "slow_dancing_in_the_dark"
  },
  {
    id: 2,
    title: "Glimpse of Us",
    artist: "Joji",
    duration: "3:53",
    src: "./Music/Joji -  Glimpse of Us .mp3",
    albumCover: "glimpse_of_us"
  },
  {
    id: 3,
    title: "Yeah Right",
    artist: "Joji",
    duration: "2:54",
    src: "./Music/Joji - YEAH RIGHT.mp3",
    albumCover: "yeah_right"
  },
  {
    id: 4,
    title: "Es Épico",
    artist: "Canserbero",
    duration: "6:20",
    src: "./Music/Canserbero - Es Épico.mp3",
    albumCover: "es_epico"
  },
  {
    id: 5,
    title: "As The World Caves In",
    artist: "Sarah Cothran",
    duration: "2:40",
    src: "./Music/As The World Caves In - Matt Maltese (Cover by Sarah Cothran).mp3",
    albumCover: "sarah_corthran"
  },
  {
    id: 6,
    title: "Somewhere I Belong",
    artist: "Linkin Park",
    duration: "3:45",
    src: "./Music/Somewhere I Belong (Official Music Video) [4K UPGRADE]  Linkin Park 2.mp3",
    albumCover: "somewhere_i_belog"
  },
  {
    id: 7,
    title: "One Step Closer",
    artist: "Linkin Park",
    duration: "2:56",
    src: "./Music/One Step Closer - Linkin Park.mp3",
    albumCover: "one_step_closer"
  },
  {
    id: 8,
    title: "Psychosocial",
    artist: "Slipknot",
    duration: "5:03",
    src: "./Music/Slipknot - Psychosocial .mp3",
    albumCover: "sklinot"
  },
  {
    id: 9,
    title: "Numb",
    artist: "Linkin Park",
    duration: "3:07",
    src: "./Music/Numb (Official Music Video) [4K UPGRADE]  Linkin Park 2.mp3",
    albumCover: "numb"
  },
  {
    id: 10,
    title: "In The End",
    artist: "Linkin Park",
    duration: "3:38",
    src: "./Music/In The End [Official HD Music Video] - Linkin Park 2.mp3",
    albumCover: "in the end"
  },
  {
    id: 11,
    title: "Breaking the Habit",
    artist: "Linkin Park",
    duration: "3:18",
    src: "./Music/Breaking the Habit (Official Music Video) [HD UPGRADE]  Linkin Park 3.mp3",
    albumCover: "breaking the habit"
  },
  {
    id: 12,
    title: "Papercut",
    artist: "Linkin Park",
    duration: "3:04",
    src: "./Music/01 Papercut - Linkin Park (Hybrid Theory) 2.mp3",
    albumCover: "perpecut"
  },
  {
    id: 13,
    title: "Last to Know",
    artist: "Three Days Grace",
    duration: "3:48",
    src: "./Music/Three Days Grace - Last to Know with lyrics 2.mp3",
    albumCover: "last to know"
  },
  {
    id: 14,
    title: "Never Too Late",
    artist: "Three Days Grace",
    duration: "3:31",
    src: "./Music/Three Days Grace - Never Too Late 2.mp3",
    albumCover: "never to late"
  },
  {
    id: 15,
    title: "I Hate Everything About You",
    artist: "Three Days Grace",
    duration: "3:39",
    src: "./Music/Three Days Grace - I Hate Everything About You (Official Video) 2.mp3",
    albumCover: "i hate"
  },
  {
    id: 16,
    title: "It's All Over",
    artist: "Three Days Grace",
    duration: "4:09",
    src: "./Music/It's All Over.mp3",
    albumCover: "its over"
  },
  {
    id: 17,
    title: "I Don't Care' feat. Adam Gontier",
    artist: "Apocalyptica",
    duration: "3:39",
    src: "./Music/Apocalyptica - 'I Don't Care' feat. Adam Gontier (Official Video) 2.mp3",
    albumCover: "apocaliptica"
  },
];
// Conexión con la data y reproductor
const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};
//boton de player 
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  // Actualiza la imagen de la carátula del álbum
  const albumArt = document.getElementById("player-album-art");
  albumArt.querySelector("img").src = `imagenes/${song.albumCover}.png`;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};
//boton de pausa
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};
//boton de cambiar canciones
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};
//boton de cambiar a la musica anterior
const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};
//boton aleatorio
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};
//boton para eliminar cancion
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(userData?.songs);
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }

};
volumeControl.addEventListener('input', function () {
  // Obtiene el valor del control de volumen y ajusta el volumen del reproductor de audio
  var volumeValue = volumeControl.value / 100;
  audio.volume = volumeValue;
});

audio.volume = volumeControl.value / 100;

//funcion para retornar la cancion luego de ser eliminada
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
  audio.volume = volumeControl.value / 100;
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
      <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

// ...

document.getElementById('search-btn').addEventListener('click', function() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const playlist = document.getElementById('playlist-songs');
  const songs = playlist.getElementsByTagName('li');

  for (const song of songs) {
      const title = song.textContent.toLowerCase();
      if (title.includes(searchInput)) {
          song.style.display = 'block';
      } else {
          song.style.display = 'none';
      }
  }
});


const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData.currentSong);

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong()
    setPlayerDisplay()
    highlightCurrentSong()
    setPlayButtonAccessibleText()
  }
});

renderSongs(userData?.songs);
setPlayButtonAccessibleText();

const songProgressBar = document.getElementById("song-progress");
const timeBar = document.querySelector(".time-bar");

const updateProgressBar = () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  songProgressBar.value = progress;

  const percentage = (progress / 100) * 100;
  timeBar.style.background = `linear-gradient(to right, #3498db ${percentage}%, #ecf0f1 ${percentage}%)`;
  timeBar.style.borderRadius = `20px`;
};

const handleProgressBarChange = () => {
  const progress = songProgressBar.value / 100;
  audio.currentTime = audio.duration * progress;

  const percentage = (songProgressBar.value / 100) * 100;
  timeBar.style.background = `linear-gradient(to right, #3498db ${percentage}%, #ecf0f1 ${percentage}%)`;
  timeBar.style.borderRadius = `20px`;
};

const handleVolumeControlChange = () => {
  const volumeValue = volumeControl.value / 100;
  audio.volume = volumeValue;
  const volumePercentage = (volumeControl.value / 100) * 100;
  volumeControl.style.background = `linear-gradient(to right, #3498db ${volumePercentage}%, #ecf0f1 ${volumePercentage}%)`;
  volumeControl.style.borderRadius = `20px`;
};

audio.addEventListener("timeupdate", updateProgressBar);
songProgressBar.addEventListener("input", handleProgressBarChange);

volumeControl.addEventListener("input", handleVolumeControlChange);

const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const updateTimers = () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalTimeDisplay.textContent = formatTime(audio.duration);
};

audio.addEventListener("timeupdate", () => {
  updateProgressBar();
  updateTimers();
});

songProgressBar.addEventListener("input", () => {
  handleProgressBarChange();
  updateTimers(); // Actualiza el tiempo al mover la barra
});

