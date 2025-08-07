document.addEventListener('DOMContentLoaded', () => {
    const boutonRetour = document.querySelector('.aller-en-haut');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const reservationBtn = document.querySelector('.reservationbtn a');

    // Fonction pour aller en haut
    boutonRetour.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    reservationBtn.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5502/kaouthar/indexKaouthar.html'; 
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
//pour changer le type du curseur: nom hotel en bas
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
//pour changer le type du curseur: monter en haut
document.addEventListener('DOMContentLoaded', () => {
    const allerEnHaut = document.querySelector('.aller-en-haut');

    
    allerEnHaut.addEventListener('mouseover', () => {
        allerEnHaut.style.cursor = 'pointer';
    });

    
    allerEnHaut.addEventListener('mouseout', () => {
        allerEnHaut.style.cursor = 'auto';
    });

 
    allerEnHaut.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
//pour politique de confidentialité
document.addEventListener('DOMContentLoaded', () => {
    const privacyPolicy = document.querySelector('.privacy-policy');

    privacyPolicy.addEventListener('mouseover', () => {
        privacyPolicy.style.cursor = 'pointer';
    });

    privacyPolicy.addEventListener('mouseout', () => {
        privacyPolicy.style.cursor = 'auto';
    });

    privacyPolicy.addEventListener('click', () => {
        
        window.location.href = "indexRiham2.html";

    });
});



//scroll images 
document.addEventListener('DOMContentLoaded', function () {
    const section2 = document.getElementById('section2');
    const imageContent = document.querySelector('.image-content');
    const slideshowImages = document.querySelectorAll('.slideshow-image');

    let currentImageIndex = 0;
    const images = [
        'css/imagesRiham1/spa4.webp',
    'css/imagesRiham1/spa3.avif',
        'css/imagesRiham1/spa5.jpg',
      
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

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled-down');
        } else {
            header.classList.remove('scrolled-down');
        }
    });
});
//event fluide
document.addEventListener('DOMContentLoaded', function () {
    
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

/*reservationBtn.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5502/kaouthar/indexKaouthar.html'; 
});

//verification coté client
//verification heure nombre
document.addEventListener('DOMContentLoaded', function () {
    const heureDebutInput = document.getElementById('heure_debut');
    const minuteDebutInput = document.getElementById('minute_debut');
    const heureFinInput = document.getElementById('heure_fin');
    const minuteFinInput = document.getElementById('minute_fin');

    function validateNumericInput(input) {
      const inputValue = input.value.trim();
      const numericRegex = /^[0-9]+$/;

      if (!numericRegex.test(inputValue)) {
        alert("Vous ne pouvez saisir que des chiffres.");
        input.value = "";  
      } else {
        const numericValue = parseInt(inputValue);
        if (input.id === 'heure_debut' && (numericValue < 0 || numericValue > 18)) {
            alert("Les heures doivent être comprises entre 00 et 18.");
          input.value = "";
        } else if (input.id === 'minute_debut' && (numericValue < 0 || numericValue > 59)) {
            alert("Les minutes doivent être comprises entre 00 et 59.");
          input.value = "";
        } else if (input.id === 'heure_fin') {
          const heureDebutValue = parseInt(heureDebutInput.value);
          if (numericValue <= heureDebutValue) {
            alert("L'heure de fin doit être supérieure à l'heure de début.");
            input.value = "";
          }
        }
      }
    }

    heureDebutInput.addEventListener('input', function () {
      console.log("Heure début input changed");
      validateNumericInput(heureDebutInput);
    });

    minuteDebutInput.addEventListener('input', function () {
      console.log("Minute début input changed");
      validateNumericInput(minuteDebutInput);
    });

    heureFinInput.addEventListener('input', function () {
      console.log("Heure fin input changed");
      validateNumericInput(heureFinInput);
    });

    minuteFinInput.addEventListener('input', function () {
      console.log("Minute fin input changed");
      validateNumericInput(minuteFinInput);
    });
  });

  function validateForm(event) {
    event.preventDefault();
    // Votre logique de validation supplémentaire ici...
    // Si tout est correct, soumettez le formulaire
    document.getElementById("reservationForm").submit();
  }

  // Fonction pour afficher l'alerte
  function showAlert(message) {
    console.log("Show alert: " + message);
    document.getElementById("alertMessage").innerHTML = message;
    document.getElementById("customAlert").style.display = "block";
  }

  // Fonction pour fermer l'alerte
  document.querySelector('.close').addEventListener('click', function () {
    console.log("Close button clicked");
    document.getElementById("customAlert").style.display = "none";
  });*/

  //ajax
  function validFormulaire(event) {
    event.preventDefault(); 
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const jour = document.getElementById("jour").value;
    const heure_debut = document.getElementById("heure_debut").value;
    const heure_fin = document.getElementById("heure_fin").value;
    const type = document.getElementById("type").value;

    const dataToSend = {
        nom:nom,
        prenom:prenom,
        jour: jour,
        heure_debut: heure_debut,
        heure_fin: heure_fin,
        type: type
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/reservations_spa", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 201) {
            window.location.href = "http://127.0.0.1:5502/riham/confirmationSpa.html";
        } else {
            alert("Erreur lors de l'ajout de la réservation de spa. Veuillez réessayer.");
        }
    });

    xhr.send(JSON.stringify(dataToSend));
}

function showConfirmationModal(data) {
    const modal = document.getElementById("confirmationModal");
    const span = document.getElementsByClassName("close")[0];
    
    document.getElementById("modal-nom").textContent = data.nom;
    document.getElementById("modal-prenom").textContent = data.prenom;
    document.getElementById("modal-date_heure_debut").textContent = data.date_heure_debut;
    document.getElementById("modal-date_heure_fin").textContent = data.date_heure_fin;
    document.getElementById("modal-heure_debut").textContent = data.heure_debut; 
    document.getElementById("modal-heure_fin").textContent = data.heure_fin; 
    document.getElementById("modal-jour").textContent = data.jour;
    document.getElementById("modal-type").textContent = data.type;
  
    modal.style.display = "block";
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
