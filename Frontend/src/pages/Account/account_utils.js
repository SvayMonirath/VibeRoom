const BACKEND_URL = 'http://localhost:5001/api/v1';
const popupText = document.getElementById("popupText");
const popupMessage = document.getElementById("popupMessage");

// Update User email or username
const updateUsernameBtn = document.getElementById("update-user-btn");
const updateUsernameInput = document.getElementById("update-username-input");
const updateEmailInput = document.getElementById("update-email-input");

async function updateUserInfo() {
    const accessToken = localStorage.getItem('accessToken');
    const updatedData = {};

    if (updateUsernameInput.value.trim() !== "") {
        updatedData.username = updateUsernameInput.value.trim();
    }
    if (updateEmailInput.value.trim() !== "") {
        updatedData.email = updateEmailInput.value.trim();
    }

    console.log("→ Updating user info with data:", updatedData);

    try {
        const res = await fetch(`${BACKEND_URL}/users/edit_user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedData),
        });

        console.log("→ Status:", res.status);

        if (!res.ok) {
            const errorData = await res.json();
            console.error("→ Error data:", errorData);
            showPopup(`Error updating user info: ${errorData.message}`, "error");
        } else {
            console.log("→ User info updated successfully");
            fetchUser();
            showPopup("User info updated successfully!", "success");
        }
    } catch (err) {
        console.error('Error updating user info:', err);
    }
}

updateUsernameBtn?.addEventListener('click', updateUserInfo);

// Get Room INFO
const numOwnedRoom = document.getElementById("num-room-created-count");

async function fetchOwnedRoomCount() {
    const accessToken = localStorage.getItem('accessToken');

    console.log("→ Fetching owned room count...");

    const res = await fetch(`${BACKEND_URL}/rooms/owned-room-count`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("→ Status:", res.status);

    const data = await res.json();

    numOwnedRoom.textContent = data.owned_room_count;
}


//  Get USER INFO
const username = document.getElementById("User-name");
const email = document.getElementById("User-email");

async function fetchUser() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('No access token found. Redirecting to login.');
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/utils/get_user`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch user data');
        } else {
            const data = await res.json();
            username.textContent = `@${data.username}`;
            email.textContent = data.email;
            updateUsernameInput.value = data.username;
            updateEmailInput.value = data.email;
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
    }
}

// SHOW POP UP
function showPopup(message, type = "success") {
    const popup = document.getElementById("popupMessage");
    const text = document.getElementById("popupText");

    // Set the text
    text.textContent = message;

    // Reset previous type classes
    popup.classList.remove(
        "bg-green-500/30", "border-green-400/40",
        "bg-red-500/30", "border-red-400/40",
        "bg-yellow-500/30", "border-yellow-400/40"
    );

    // Add classes based on type
    if (type === "success") {
        popup.classList.add("bg-green-500/30", "border-green-400/40");
    } else if (type === "error") {
        popup.classList.add("bg-red-500/30", "border-red-400/40");
    } else if (type === "warning") {
        popup.classList.add("bg-yellow-500/30", "border-yellow-400/40");
    }

    // Show popup
    popup.classList.remove("opacity-0");
    popup.classList.add("opacity-100");

    setTimeout(() => {
        popup.classList.add("opacity-0");
        popup.classList.remove("opacity-100");
    }, 7000);
}


export { fetchUser, fetchOwnedRoomCount, showPopup };
