const routes = [
  {
    path: /^\/$/, // Home page
    handler: () => `<h1>Home</h1><p>Welcome to the homepage.</p>`
  },
  {
    path: /^\/about\/(\d+)$/, // Dynamic about route: /about/123
    handler: (id) => `<h1>About Page</h1><p>ID: ${id}</p>`
  }
];

// Load the route content
function router() {
  const path = window.location.pathname;
  const app = document.getElementById("app");

  for (const route of routes) {
    const match = path.match(route.path);
    if (match) {
      // match[1], [2], ... là các group từ regex
      const params = match.slice(1);
      app.innerHTML = route.handler(...params);
      return;
    }
  }

  // Not found
  app.innerHTML = "<h1>404 - Page Not Found</h1>";
}

// Handle navigation
function navigate(event) {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    window.history.pushState(null, null, href);
    router();
  }
}

// Init
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", navigate);
  router();
});
