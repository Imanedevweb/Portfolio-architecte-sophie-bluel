
const headertop = document.getElementById ('homepageEdit');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById ('logoutBtn');
const categorysBtn = document.getElementById('categories-filter');
const iconEdit = document.querySelector ('#Icon-Edit')

// Fonction pour récupérer les identifiants
const getUserCredentials = () => {
  return {
      email: email.value,
      password: password.value
  };
};

// si l'utilisatuer est connecté

function isConnected() {
  // Récupère le token du localStorage
  const token = localStorage.getItem('token');
  
  // Vérifie si le token existe et renvoie true ou false
  return token !== null;
}


 // Vérifier l'état de connexion et mettre à jour les boutons
function updateAuthButtons() {
  if (isConnected()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
      iconEdit.style.display ='flex';
      headertop.style.display="block";
      categorysBtn.style.display="none"

  } else {
      loginBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
      iconEdit.style.display = 'none';
      headertop.style.display = "none";
      categorysBtn.style.display = "block";
  }
}
// Fonction pour envoyer les identifiants et se connecter
async function login() {
  const identifiants = getUserCredentials();

  try {
      const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(identifiants)
      });

      // On récupère les données
      const data = await response.json();

      if (!response.ok) {
          throw new Error('Erreur lors de la connexion');
      } else {
        // On vérifie que les données sont présentes
        console.log(data);
        
        // On récupère le token d'authentification
        const token = data.token;

        // Stocker le token dans le localStorage
        localStorage.setItem('token', token);
        
        // Redirection vers la page index.html
        window.location.replace("index.html");
    }
} catch (error) {
    console.log("erreur", error);
    erreurMsg.textContent = "Connexion échouée. Veuillez vérifier vos identifiants.";
}
}



// Fonction pour se déconnecter
function logout() {
  // Supprimer le token du localStorage
  localStorage.removeItem('token');

  // Rediriger vers la page de connexion
  window.location.replace("index.html");
}


