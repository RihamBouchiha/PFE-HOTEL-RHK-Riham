
//scroll images 
document.addEventListener('DOMContentLoaded', function () {
    const section1 = document.getElementById('section2');
    const imageContent = document.querySelector('.image-content');
    const slideshowImages = document.querySelectorAll('.slideshow-image');
  
    let currentImageIndex = 0;
    const images = [
        'css/imagesHiba/pfeeee.jpg',
        'css/imagesHiba/pferest2.jpg',
        'css/imagesHiba/restau.jpg',
    ];
  
    function changeImage() {
        slideshowImages.forEach(image => {
            image.style.opacity = 0;
        });
  
        setTimeout(() => {
            slideshowImages[currentImageIndex].src = images[currentImageIndex];
            slideshowImages[currentImageIndex].style.opacity = 1;
            currentImageIndex = (currentImageIndex + 1) % images.length;
        },10); 
    }
  
    changeImage();
    setInterval(changeImage, 3750);
  });
  function validateForm(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre automatiquement

    // Récupérer les valeurs des champs du formulaire
    const date_heure_debut = document.getElementById("jour").value + " " + document.getElementById("heure_debut").value + ":" + document.getElementById("minute_debut").value;
const date_heure_fin = document.getElementById("jour").value + " " + document.getElementById("heure_fin").value + ":" + document.getElementById("minute_fin").value;
const jour = document.getElementById("jour").value;
const type = document.getElementById("type").value;
const nom = document.getElementById("nom").value;
const prenom = document.getElementById("prenom").value;


    // Créer un objet contenant les données à envoyer
    const dataToSend = {
        nom: nom,
        prenom: prenom,
        date_heure_debut: date_heure_debut,
        date_heure_fin: date_heure_fin,
        jour: jour,
        type: type
    };

    // Envoyer les données via une requête AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/reservationn_table", true); // Assurez-vous de spécifier le bon chemin vers votre endpoint de réservation
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 201) {
            // Succès
            console.log(xhr.responseText);
            // Ajoutez ici du code pour gérer la réponse du serveur, par exemple afficher un message de succès à l'utilisateur
            window.location.href = "http://127.0.0.1:5502/hiba/confirmation.html";
        } else {
            // Erreur
            console.error("Erreur lors de l'envoi des données");
        }
    });

    // Convertir l'objet JavaScript en chaîne JSON et envoyer les données
    xhr.send(JSON.stringify(dataToSend));

}
document.getElementById('t').addEventListener('click', () => {
    window.location.href = "conf_res_table.html?" + new URLSearchParams(dataToSend).toString();
});

// Fonction pour afficher le modal de confirmation
function showConfirmationModal(data) {
    // Récupérer les éléments du modal
    const modal = document.getElementById("confirmationModal");
    const span = document.getElementsByClassName("close")[0];
    
    // Remplir les informations dans le modal
    document.getElementById("modal-nom").textContent = data.nom;
    document.getElementById("modal-prenom").textContent = data.prenom;
    document.getElementById("modal-date_heure_debut").textContent = data.date_heure_debut;
    document.getElementById("modal-date_heure_fin").textContent = data.date_heure_fin;
    document.getElementById("modal-jour").textContent = data.jour;
    document.getElementById("modal-type").textContent = data.type;
  
    // Afficher le modal
    modal.style.display = "block";
  
    // Fermer le modal lorsque l'utilisateur clique sur la croix
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // Fermer le modal lorsque l'utilisateur clique en dehors du modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }


  


