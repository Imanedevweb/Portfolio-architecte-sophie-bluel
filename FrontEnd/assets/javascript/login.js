// Sélection des éléments du tableau de connexion
const form = document.getElementById('logIn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const erreurMsg = document.getElementById('erreur-message');


// Ajout de l'écouteur d'événement pour le formulaire
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});
