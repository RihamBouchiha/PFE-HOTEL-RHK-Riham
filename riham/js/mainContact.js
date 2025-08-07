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

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetURL = this.getAttribute('href'); // Récupérer l'URL cible à partir de l'attribut href

            window.location.href = targetURL; // Rediriger vers l'URL cible
        });
    });
});

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
//changer les images section2 
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


//evenement lorsque j'appuye sur decouvrez plus de spa
/*document.addEventListener('DOMContentLoaded', () => {
    const decouvrezPlus = document.querySelector('.decouvrezplus-spa');

    decouvrezPlus.addEventListener('mouseover', () => {
        decouvrezPlus.style.cursor = 'pointer';
    });

    decouvrezPlus.addEventListener('mouseout', () => {
        decouvrezPlus.style.cursor = 'auto';
    });

    decouvrezPlus.addEventListener('click', () => {
       
        window.location.href = 'indexRiham3.html';
    });
});*/

/*
//evenement lorsque j'appuye sur decouvrez plus de restauration
document.addEventListener('DOMContentLoaded', () => {
    const decouvrezPlusRestauration = document.querySelector('.decouvrezplus-restauration');

    decouvrezPlusRestauration.addEventListener('mouseover', () => {
        decouvrezPlusRestauration.style.cursor = 'pointer';
    });

    decouvrezPlusRestauration.addEventListener('mouseout', () => {
        decouvrezPlusRestauration.style.cursor = 'auto';
    });

    decouvrezPlusRestauration.addEventListener('click', () => {
        
        window.location.href = 'votre-page-de-decouverte-restauration.html';
    });
});
//fonction qui permet de changer les images de spa

document.addEventListener('DOMContentLoaded', function () {
    let currentImageIndex = 0;
    const images = [
        'css/imagesRiham1/spa2.jpg',
        'css/imagesRiham1/spa1.jpg',
        'css/imagesRiham1/spa.jpg',
    ];

    const imageElement = document.querySelector('.image-content-section4 img');

    function changeImage() {
        
        imageElement.classList.add('fade-out');

        
        setTimeout(function () {
          
            imageElement.src = images[currentImageIndex];
            imageElement.classList.remove('fade-out');
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }, 1000); 
    }
    imageElement.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;

    
    setInterval(changeImage, 5000); 
});*/

document.addEventListener('DOMContentLoaded', () => {
    const hotelText = document.querySelector('.hotel-nom');

    hotelText.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

   
    hotelText.addEventListener('mouseover', () => {
        hotelText.style.cursor = 'pointer';
    });

    hotelText.addEventListener('mouseout', () => {
        hotelText.style.cursor = 'auto';
    });
});

//scroll images 
document.addEventListener('DOMContentLoaded', function () {
    const section2 = document.getElementById('section2');
    const imageContent = document.querySelector('.image-content');
    const slideshowImages = document.querySelectorAll('.slideshow-image');

    let currentImageIndex = 0;
    const images = [
        'css/imagesRiham1/table.jpg',
        'css/imagesRiham1/piscine.jpg',
        'css/imagesRiham1/une4.jpg',
      
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

//btn ajax


    

    

function validFormulaire(event) {
    event.preventDefault(); 

    const sujet = document.getElementById("sujet").value;
    const titre = document.getElementById("titre").value;
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const pays = document.getElementById("pays").value;
    const commentaires = document.getElementById("commentaires").value;

    const dataToSend = {
        sujet: sujet,
        titre: titre,
        prenom: prenom,
        nom: nom,
        email: email,
        telephone : telephone,
        pays: pays,
        commentaires: commentaires
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/contacttttt", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 201) {
        } else {
            alert("Erreur lors de l'ajout de la réservation de spa. Veuillez réessayer.");
        }
    });

    xhr.send(JSON.stringify(dataToSend));
}













