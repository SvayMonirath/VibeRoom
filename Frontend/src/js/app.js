const app = document.getElementById('app');

function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    })
    .then(html => app.innerHTML = html)
    .catch(() => app.innerHTML = '<h1 class="text-white text-4xl">404 - Page Not Found</h1>');
}

function router() {
  const hash = location.hash.replace('#', '') || 'landing';
  loadPage(hash);
}

// Listen for hash change and page load
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
