document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('nav ul li a');
  const reservationBtn = document.querySelector('.reservationbtn a');

  // Redirection vers une autre page lorsque le bouton "Réserver" est cliqué
  reservationBtn.addEventListener('click', () => {
      window.location.href = 'http://127.0.0.1:5502/kaouthar/indexKaouthar.html'; // Remplacez par l'URL de votre page
  });

  // Fonction pour changer la barre
  window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
          header.classList.add('scrolled-down');
          navLinks.forEach(link => link.classList.add('scrolled-down'));
          reservationBtn.classList.add('scrolled-down');
      } else {
          header.classList.remove('scrolled-down');
          navLinks.forEach(link => link.classList.remove('scrolled-down'));
          reservationBtn.classList.remove('scrolled-down');
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hotelText = document.getElementById('hotelText');

 
  hotelText.addEventListener('mouseover', () => {
      hotelText.style.cursor = 'pointer';
  });

  hotelText.addEventListener('mouseout', () => {
      hotelText.style.cursor = 'auto';
  });

  
  hotelText.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});

//scroll images 
document.addEventListener('DOMContentLoaded', function () {
  const section1 = document.getElementById('section2');
  const imageContent = document.querySelector('.image-content');
  const slideshowImages = document.querySelectorAll('.slideshow-image');

  let currentImageIndex = 0;
  const images = [
      'css/imageKa/SALLE4.jpg',
      'css/imageKa/SALL3.jpg',
      'css/imageKa/salle1.jpg',
    
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

document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher le formulaire de se soumettre automatiquement

        // Récupérer les valeurs des champs du formulaire
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const jour = document.getElementById("jour").value;
        const heure_debut = document.getElementById("heure_debut").value;
        const minute_debut = document.getElementById("minute_debut").value;
        const heure_fin = document.getElementById("heure_fin").value;
        const minute_fin = document.getElementById("minute_fin").value;
        const type = document.getElementById("type").value;

        // Concaténer les valeurs des champs pour former les dates/heures complètes
        const date_heure_debut = `${jour} ${heure_debut}:${minute_debut}:00`;
        const date_heure_fin = `${jour} ${heure_fin}:${minute_fin}:00`;

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
        fetch('http://localhost:5502/reservation_salle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (response.ok) {
                console.log('Données de réservation envoyées avec succès !');
                // Redirection vers la page de confirmation
                window.location.href = "http://127.0.0.1:5502/kaouthar/confirmationSalle.html";
            } else {
                console.error('Erreur lors de l\'envoi des données de réservation.');
            }
        })
        .catch(error => console.error('Erreur lors de l\'envoi des données de réservation :', error));
    });
});










// 