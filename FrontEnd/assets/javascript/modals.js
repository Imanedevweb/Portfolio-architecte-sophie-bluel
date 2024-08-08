/////////////////////////////////LES VARIABLES///////////////
// Sélection de la modal
const modal = document.getElementById("modal");
const modalcreer = document.getElementById("modal-creer");
// Sélection du bouton pour ouvrir la modal
const btnIconEdit = document.getElementById("Icon-Edit");

// Sélection des boutons pour fermer les modales
const buttonClose = document.querySelectorAll(".close-btn");
const buttonBack = document.querySelector(".back-btn");

// Sélection des éléments de la galerie
const addphotoBtn = document.getElementById("add-photoBtn");


/////////////// GESTION POUR LA FERMETURE DES MOADALES////////////////
// Lorsque l'utilisateur clique sur btnIconEdit, la modal s'ouvre.
btnIconEdit.onclick = function () {
    modal.showModal();
}

// Quand l'utilisateur clique sur le bouton "close-btn", la modale active se ferme.
buttonClose.forEach(btn => {
    btn.onclick = function () {
        modal.close();
        modalcreer.close();
        resetForm();
    }
});

// Lorsque l'utilisateur clique sur addphotoBtn, la première modal se ferme et la deuxième s'ouvre.
addphotoBtn.onclick = function () {
    modal.close();
    modalcreer.showModal();
}

// Lorsque l'utilisateur clique sur le bouton "back-btn", la deuxième modale se ferme et la première s'ouvre.
buttonBack.onclick = function () {
    modalcreer.close();
    modal.showModal();
    resetForm();;
}
// Fermer la Modale en cliquant en dehors de celle-ci et sur ESC.
window.addEventListener("click", function (event) {
    if (event.target === modal)
        modal.close();
    if (event.target === modalcreer) {
        modalcreer.close();
        resetForm();
    }

});

window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        modal.close();
        modalcreer.close();
        resetForm();
    }
});

////////////////AFFICHER LES IMAGES DANS LA MODAL///////////
function displayProjectsModal(work) {
    const divGalleryModal = document.querySelector(".gallery-modal");
    if (!divGalleryModal) return;

    const figureWorkModal = document.createElement("figure");
    console.log(work)
    figureWorkModal.setAttribute('data-id', work.id);


    const imgWorkModal = document.createElement("img");
    imgWorkModal.src = work.imageUrl;
    imgWorkModal.alt = work.title;

    const btnDelete = document.createElement("button");
    const IconDelete = document.createElement("i");

    // Rajout du bouton de suppression avec l'icône
    IconDelete.classList.add("fa-solid", "fa-trash-can")
    btnDelete.classList.add('btn-delete');
    btnDelete.appendChild(IconDelete);

    // Ajouter de l'événement de suppression
    btnDelete.onclick = function () {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
        if (confirmDelete) {
            deleteWork(work.id);
            // Suppression de l'image de la modale
            divGalleryModal.removeChild(figureWorkModal);
            //Suppression de la page d'accueil
            const workhome = document.getElementById('work-' + work.id)
            workhome.remove()
        }
    };

    figureWorkModal.appendChild(imgWorkModal, btnDelete);
    figureWorkModal.appendChild(btnDelete);
    divGalleryModal.appendChild(figureWorkModal);
};
async function deleteWork(workId) {
    // Envoie une requête DELETE à l'API pour supprimer le travail spécifié
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Utilise le token stocké pour l'authentification
        },
    });

    // Si la réponse n'est pas OK, lance une exception
    if (!response.ok) throw new Error("Échec de la suppression du travail"); // Gère les réponses non réussies
}

// Fonction pour afficher les travaux dans la modal
async function displayAllWorksModal() {
    const works = await fetchWorks();
    // Récupère la div où le programme doit insérer les travaux
    const gallery = document.querySelector(".gallery-modal");
    if (!gallery) return;
    gallery.innerHTML = ""; // Vider la galerie avant d'ajouter les nouveaux travaux

    // Pour chaque travaux récupéré
    works.forEach((work) => {
        displayProjectsModal(work);
    });
    // Ajouter une ligne horizontale à la fin de toutes les images
    const borderline = document.createElement('hr');
    borderline.style.borderTop = '1px solid border: 1px solid #B3B3B3';
    borderline.style.marginTop = '20px'
    gallery.appendChild(borderline);

}
document.addEventListener("DOMContentLoaded", () => {
    displayAllWorksModal();
})

//////////////////////////////FONCTIONS POUR LE FORMULAIRE D'AJOUT DES TRAVAUX - Modal2
//selection du formulaire
const formAddWork = document.getElementById('formAddWork');
const addWorkBtn = document.getElementById('addWorkBtn');
//Chargement de l'image
document.getElementById("file").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImage = document.getElementById("previewImage");
            console.log(e.target.result)
            previewImage.src = e.target.result;
            previewImage.style.display = "block";

        }
        // Masquer les autres éléments

        document.querySelector('.fa-image').classList.add('hidden');
        document.querySelector('.labelFile').classList.add('hidden');
        document.querySelector('.containerAddPhoto p').classList.add("hidden");
        reader.readAsDataURL(file);
    }
}
);
function resetForm() {
    document.getElementById("previewImage").style.display = "none";
    document.querySelector('.fa-image').classList.remove('hidden');
    document.querySelector('.labelFile').classList.remove('hidden');
    document.querySelector('.containerAddPhoto p').classList.remove("hidden");
    document.getElementById("title").value = "";
    document.getElementById("categoryInput").selectedIndex = 0;

}

// Fonction pour charger les catégories depuis l'API et les afficher dans le sélecteur
async function SelectCategories() {
    const categorySelect = document.getElementById("categoryInput");
    if (!categorySelect) {
        console.error("L'élément categoryInput n'a pas été trouvé.");
        return;
    }
    categorySelect.innerHTML = ""; // Vide les options existantes

    try {
        const categories = await getCategories();

        // Ajoute une option par défaut
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Choisissez une catégorie";
        categorySelect.appendChild(defaultOption);

        // Ajoute les catégories au sélecteur
        categories.forEach((category) => {
            const Option = document.createElement("option");
            Option.value = category.id;
            Option.textContent = category.name;
            categorySelect.appendChild(Option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
    }
}
SelectCategories();

// fonction pour ajouter le projet
formAddWork.addEventListener('submit', async function (event) {
    event.preventDefault()
    const data = new FormData(event.target)
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, //authentification avec le token
            },
            body: data,

        });

        if (!response.ok) throw new Error('Échec de l\'ajout du travail');

        const newWork = await response.json();
        console.log("le projet à bien été rajouté");

        await displayAllWorksModal(newWork); // Ajouter à la modale
        await displayWork(newWork); // Ajouter à la page d'accueil
        modalcreer.close(); // Fermer la modale après l'ajout

        // Réinitialiser le formulaire et les éléments visuels
        formAddWork.reset();
        document.getElementById("previewImage").style.display = "none";
        document.querySelector('.fa-image').classList.remove('hidden');
        document.querySelector('.labelFile').classList.remove('hidden');
        document.querySelector('.containerAddPhoto p').classList.remove("hidden");
    } catch (error) {
        console.error('Erreur:', error);
    }
});

// Vérifie l'état du bouton de soumission en fonction de la complétude du formulaire
document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title");
    const categorySelect = document.getElementById("categoryInput");
    const fileInput = document.getElementById("file");

    function updateButtonState() {
        if (titleInput && categorySelect && fileInput && addWorkBtn) {
            if (
                titleInput.value.trim() !== "" &&
                categorySelect.value &&
                fileInput.files.length > 0
            ) {
                addWorkBtn.disabled = false; // Active le bouton si toutes les conditions sont remplies
                addWorkBtn.style.backgroundColor = "#1d6154";
                addWorkBtn.style.color = "white";
            } else {
                addWorkBtn.disabled = true; // Désactive le bouton si une condition n'est pas remplie
                addWorkBtn.style.backgroundColor = "#a7a7a7";
                addWorkBtn.style.color = "white";
            }
        }
    }

    if (titleInput) titleInput.addEventListener("input", updateButtonState);
    if (categorySelect)
        categorySelect.addEventListener("change", updateButtonState);
    if (fileInput) fileInput.addEventListener("change", updateButtonState);


    updateButtonState();
});
