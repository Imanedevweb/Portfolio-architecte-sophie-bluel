/////LES VARIABLE///////////////
// Sélection de la modal
const modal = document.getElementById("modal");

// Sélection du bouton pour ouvrir la modal
const btnIconEdit = document.getElementById("Icon-Edit");

// Sélection du bouton pour fermer la modal
const buttonClose = document.getElementsByClassName("close-btn")[0];
//selection des élement de la gallery
const galleryMODAL = document.querySelector("gallery-MODAL")


////////////LES FONCTIONS

//Lorsque l'utilisateur clique sur <btnIconEdit>,la modal s'ouvre.
btnIconEdit.onclick = function() {
    showModal();
}
//quand l'utilisateur clique sur le <btnCLose>,la modal se ferme
buttonClose.onclick = function() {
    closeModal();
}

// la fonction pour afficher la modal
function showModal() {
    modal.style.display = "block";
    
}

// la fonction pour fermer la modal
function closeModal() {
    modal.style.display = "none";
}

// Lorsquel'utilisateur clique n'importe ou, la modal se ferme 
window.onclick = function(event) {
 
    if (event.target == modal) {
        closeModal();
    }
}
// Lorsque l'utilisateur clique sur <Echape>, la modal se ferme 
document.onkeydown = function(event) {
   
    if (event.key === "Escape") {
        closeModal();
    }
}    

 

/////AFFICHER LES IMAGES DANS LA MODAL
