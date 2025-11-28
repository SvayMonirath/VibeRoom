async function fetchUser() {
    const usernameEL = document.getElementById('usernameDisplay');
    const token = localStorage.getItem('accessToken');

    if(!token) {
        console.error('No access token found');
        usernameEL.textContent = 'Guest';
        return;
    }

    try {
        const res = await fetch('http://localhost:5001/api/v1/utils/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!res.ok) {
            const text = await res.text();
            console.error('Failed to fetch user data:', text);
            usernameEL.textContent = 'Guest';
            return;
        }
        const user = await res.json();
        usernameEL.textContent = user.username;
    } catch (error) {
        console.error('Error fetching user data:', error);
        usernameEL.textContent = 'Guest';
    }
}

// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
    fetchUser();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    mobileMenuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    mobileSearchBtn?.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => document.getElementById('mobileSearch')?.focus(), 50);
        } else {
            document.getElementById('mobileSearch')?.focus();
        }
    });

    profileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        if (!profileMenu.classList.contains('hidden')) profileMenu.classList.add('hidden');
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = '../login/login.html'; // Adjust the redirect path as needed
    });
});
