async function fetchWorks() {
  console.log("ici");

  try {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    // récupère la div où le programme doit insérer les travaux
    const divGallery = document.querySelector(".gallery");

    // pour chaque travaux récupéré
    works.forEach((work) => {
      // créer une figure
      const figureWork = document.createElement("figure");

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
    });

    console.log(divGallery);

  } catch (error) {
    // handle the error
    console.log("erreur", error);
  }
}

fetchWorks();

//fonction pour recupérer les catégories

async function getCategories(){
  console.log ('categories');

  const response = await fetch ('http://localhost:5678/api/categories');
  const categories = await response.json();
  return categories;
}
// fonction pour afficher categories

async function displayCategoriesButtons() {
 
  
    const categories = await getCategories ();
    categories.unshift ({'id': 0, 'name': 'Tous'}); //ajout du bouton tout au tableau pour afficher tous les traveaux
    const filterCategories = document.querySelector('#categories-filter')
    filterCategories.innerHTML="";//vider les filtres existants pour eviter le doublan
      console.log ('filter')
  
    categories.forEach ((categorie) => {
      const filterElement = document.createElement ("button");
      filterElement.classList.add ('filter')
      filterElement.innerText = categorie.name;
      filterElement.addEventListener ("click", () => {});
    
      // Retirer la class active de tous les boutons
      document.querySelectorAll ('.filter').forEach(btn => btn.classList.remove ('active'));
      // Ajouter la class active au bouton cliqué
      filterElement.classList.add ('active');
      console.log ('Categorie ${categorie.name} cliquée');
      
    filterCategories.appendChild(filterElement);
    });
}  

displayCategoriesButtons ()
