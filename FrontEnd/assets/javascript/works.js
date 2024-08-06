const globalWorks = null;

//fonction pour récupérer les travaux
async function fetchWorks() {
  console.log("ici");
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
  } catch (error) {
    console.log("erreur", error);
  }
}

// Fonction pour afficher un travail

function displayWork(work) {
  const divGallery = document.querySelector(".gallery")

  // créer une figure
  const figureWork = document.createElement("figure");
  figureWork.id = 'work-' + work.id;
  // créer une image 
  const imgWork = document.createElement("img");

  // ajouter comme attribut la source est l'attribut imageUrl et le alt, le titre du travail
  imgWork.src = work.imageUrl;
  imgWork.alt = work.title;

  // insérer l'image dans la figure
  figureWork.append(imgWork);

  // créer un figcaption 
  const figcaptionWork = document.createElement("figcaption");

  // mettre le titre du projet dans le figcaption
  figcaptionWork.innerHTML = work.title;

  // insérer le figcaption dans la figure
  figureWork.append(figcaptionWork);

  // insérer la figure dans la galerie
  divGallery.append(figureWork);
}


// Fonction pour afficher les traveaux dans la page d'accueil

async function displayAllWorks() {
  const works = await fetchWorks();
  // récupère la div où le programme doit insérer les travaux
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Vider la galerie avant d'ajouter les nouveaux traveaux 

  // pour chaque travaux récupéré
  works.forEach((work) => {
    displayWork(work);
  });
}



//  CATEGORYS
//fonction pour recupérer les catégories

async function getCategories() {
  console.log('categories');
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log("erreur", error)
  }
}

// Fonction pour afficher les boutons des categories

async function displayCategoriesButtons() {

  const categories = await getCategories();
  categories.unshift({ 'id': 0, 'name': 'Tous' }); //ajout du bouton tout au tableau pour afficher tous les traveaux
  const filterCategories = document.querySelector('#categories-filter')
  filterCategories.innerHTML = "";//vider les filtres existants pour eviter le doublon
  console.log('filter')

  categories.forEach((category) => {
    const btnElement = document.createElement("button");
    btnElement.classList.add('filter')
    btnElement.innerText = category.name;
    btnElement.id = `category-${category.id}`// Ajouter l'id pour le filtrage
    btnElement.dataset.categoryId = category.id;
    btnElement.addEventListener("click", async (event) => {
      await filterCategoryById(category.id); // Filtrer les travaux par catégorie

      // Retirer la class active de tous les boutons

      document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));

      // Ajouter la class active au bouton cliqué
      btnElement.classList.add('active');
      console.log('Categorie ${categorie.name} cliquée');
    });

    filterCategories.appendChild(btnElement);
  });
}

// Fonction pour filter traveaux par catégorie

async function filterCategoryById(categoryId) {
  const works = await fetchWorks();
  const divGallery = document.querySelector('.gallery');
  divGallery.innerHTML = ""; // Vider la galerie avant d'ajouter les travaux filtrés  

  if (categoryId !== 0) {
    const filterWorks = works.filter(work => work.categoryId == categoryId);
    filterWorks.forEach(work => {
      displayWork(work);
    });

  } else {
    works.forEach((work) => {
      displayWork(work);

    });
  }
}
