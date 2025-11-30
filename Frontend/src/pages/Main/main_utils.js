const BACKEND_URL = 'http://localhost:5001/';
let audio = new Audio();
let currentSongPath = null;

function playSong(path) {
    if (!path) return;

    const fullPath = `${BACKEND_URL}${path}`;

    if (currentSongPath === fullPath) {
        audio.paused ? audio.play() : audio.pause();
        return;
    }

    if (!audio.paused) audio.pause();
    audio = new Audio(fullPath);
    audio.play();
    currentSongPath = fullPath;
}

function displaySongs(songs) {
    const container = document.getElementById('song-container');
    container.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className =
            "music-container flex flex-col items-center gap-4 p-3 bg-white/5 rounded-lg cursor-pointer sm:flex-col xl:flex-col 2xl:flex-row hover:bg-white/10 transition duration-300 ";

        songDiv.innerHTML = `
            <div class="relative w-full flex flex-col items-center group">

                <!-- Cover -->
                <img src="${BACKEND_URL}${song.cover_image_path}"
                    width="150" height="150"
                    class="rounded-md transition duration-300 group-hover:blur-sm group-hover:brightness-50" />

                <!-- Text -->
                <div class="mt-2 text-center transition duration-300 group-hover:blur-sm group-hover:opacity-40">
                    <div class="text-white font-medium text-2xl">${song.title}</div>
                    <div class="text-white font-extralight">${song.artist}</div>
                </div>

                <!-- PLAY ICON (hidden until hover) -->
                <div class="absolute inset-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="70" height="70" fill="white"
                        viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>

            </div>
        `;


        songDiv.addEventListener('click', () => playSong(song.audio_file_path));
        container.appendChild(songDiv);
    });
}

async function loadSongs() {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`${BACKEND_URL}api/v1/musics/get_random/5`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
        console.error("Failed to load songs");
        return;
    }

    const data = await res.json();
    displaySongs(data.songs);
}

async function fetchUser() {
    const usernameEL = document.getElementById('usernameDisplay');
    const token = localStorage.getItem('accessToken');

    if (!token) {
        usernameEL.textContent = 'Guest';
        return;
    }

    const res = await fetch(`${BACKEND_URL}api/v1/utils/get_user`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        usernameEL.textContent = 'Guest';
        return;
    }

    const user = await res.json();
    usernameEL.textContent = user.username;
}

export { loadSongs, fetchUser };
