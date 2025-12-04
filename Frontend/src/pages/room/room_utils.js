const BACKEND_URL = 'http://localhost:5001/api/v1';

// TODO[X]: Fetch Room Name
// TODO[X]: Fetch Room Vibe
const roomName = document.getElementById('room-name');
const roomVibe = document.getElementById('room-vibe');
export async function fetchRoomInfo() {

    const params = new URLSearchParams(window.location.search);
    const room_id = params.get('room_id');

    try {
        const res = await fetch(`${BACKEND_URL}/rooms/get_room/${room_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if(!res.ok){
            console.error("→ Error fetching room info:", data.message);
        } else {
            console.log("→ Fetched room info:", data);
            roomName.textContent = data.room.title;
            roomVibe.textContent = data.room.vibe;
        }

    } catch (err) {
        console.error('Error fetching room info:', err);
    }

}

// TODO[]: SHOW SETTING BTN

const settingBtn = document.getElementById('setting-btn');
const settingContent = document.getElementById('setting-content');

const queueBtn = document.getElementById('queue-btn');
const chatBtn = document.getElementById('chat-btn');

const queueContent = document.getElementById('queue-content');
const chatContent = document.getElementById('chat-content');

const underline = document.getElementById('underline');

settingBtn?.addEventListener('click', () => {
    settingContent.classList.remove('hidden');
    chatContent.classList.add('hidden');
    queueContent.classList.add('hidden');
    underline.classList.add('hidden');
});


// TODO[]: Fetch listener count

// TODO[X]: Implement leave room button redirect to main page
const leaveRoomBtn = document.getElementById('leave-room-btn');
leaveRoomBtn?.addEventListener('click', () => {
    window.location.href = '../Main/main.html';
});



queueBtn.addEventListener('click', () => {
    queueContent.classList.remove('hidden');
    settingContent.classList.add('hidden');
    chatContent.classList.add('hidden');
    underline.classList.remove('hidden');
    underline.style.left = '0%';
});

chatBtn.addEventListener('click', () => {
    chatContent.classList.remove('hidden');
    settingContent.classList.add('hidden');
    queueContent.classList.add('hidden');
    underline.classList.remove('hidden');
    underline.style.left = '50%';
});



// TODO[]: Implement Show Music name
// TODO[]: Implement Show Music artist
// TODO[]: Implement Add to Queue
// TODO[]: Implement play song synchronization
// TODO[]: Implement pause song synchronization
// TODO[]: Implement previous song functionality synchronization
// TODO[]: Implement skip song functionality synchronization
// TODO[]: Implement song progress bar synchronization

// TODO[]: Implement sending chat message

