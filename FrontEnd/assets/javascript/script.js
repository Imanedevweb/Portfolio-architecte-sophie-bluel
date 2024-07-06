// sélectionner le lougout
const logoutButton = document.getElementById('logoutBtn');

// Écouter le clic sur le bouton de déconnexion
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });

  displayAllWorks();
  displayCategoriesButtons ();
  updateAuthButtons ();
