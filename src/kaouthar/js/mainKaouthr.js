$(document).ready(function() {
    // Tableau contenant les noms des images
    const images = ['ch1.jpg', 'e35d9a8503b194bc21a69b83b9970d9f.jpg', 'ch4.jpg', '696ccc048dde7c0655cf4abd7c36e5e1.jpg'
    ,'e8c50ce285b0a5730a23db4e1459cd3b.jpg','67f5e6fe89824acaea6fb0b46e0b06ce.jpg','ca92e4f4a076221c79087902356c15e7.jpg'];
  
    // Récupérer les chambres depuis le backend
    $.get('http://localhost:5502/chambre_types', function(data) {
        // Parcourir les données des chambres
        data.forEach(function(chambre, index) {
            // Générer l'URL de l'image correspondante
            const imageUrl = `css/imageKa/${images[index]}`;
            // 
            // Créer le code HTML pour chaque chambre
            const chambreHtml = `
                <div class="chambre" data-id="${chambre.id_chambre_type}">
                    <img src="${imageUrl}" alt="Image de la chambre">
                    <div class="infos">
                        <h3>${chambre.type}</h3>
                        <p>Capacité: ${chambre.capacite}</p>
                        <p>Disponibilité: ${chambre.disponibilite ? 'Disponible' : 'Non disponible'}</p>
                        <button class="h4"><a href="http://127.0.0.1:5502/kaouthar/indexKaouthar1.html">Découvrez plus➙</a></button>
                        <hr class="separator">
                        <h4 class="h_4">Meilleur Tarif Flexible - Réservez dès maintenant!</h4>
                        <p class="align-right">${chambre.prix} MAD <br> Par nuit</p>
                        <div class="BtnContainer">
                            <div class="inputResrvation input__btn">
                                <button type="button" class="btn" onclick="validateForm(${chambre.id_chambre_type})" data-id="${chambre.id_chambre_type}">Réserver maintenant</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Ajouter la chambre au conteneur
            $('#chambres-container').append(chambreHtml);
        });
    });
});

const displayError = (errorMessage) => {
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
};
// Fonction pour valider le formulaire de réservation
const validateForm = (idChambreType) => {
    // Récupérer les valeurs du formulaire
    const dateArrivee = document.getElementById('date_arrivee').value;
    const dateDepart = document.getElementById('date_depart').value;
    const nombrePersonnes = document.getElementById('nombres_parsonnes').value;
    const nombreChambre = document.getElementById('nombre_chambre').value;

    // Valider les champs du formulaire
    if (!dateArrivee || !dateDepart || !nombrePersonnes || !nombreChambre) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const dateArriveeObj = new Date(dateArrivee);
    const dateDepartObj = new Date(dateDepart);

    // Vérifier si la date d'arrivée est antérieure à la date de départ
    if (dateArriveeObj >= dateDepartObj) {
        displayError('La date d\'arrivée doit être antérieure à la date de départ.');
        return;
    }

    // Effacer les messages d'erreur s'il y en a
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';

    
    // Préparer les données à envoyer au serveur
    const dataToSend = {
        date_arrivee: dateArrivee,
        date_depart: dateDepart,
        nombres_personnes: nombrePersonnes,
        nombre_chambre: nombreChambre,
        id_chambre_type: idChambreType
    };

    // Envoyer les données au serveur via une requête AJAX
    fetch('http://localhost:5502/reserver-chambre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (response.ok) {
            // Si la réservation est effectuée avec succès, afficher un message de confirmation
             window.location.href = 'http://127.0.0.1:5502/hiba/indexHiba1.html';
        } else {
            // Si une erreur se produit, afficher le message d'erreur du serveur
            return response.json().then(error => {
                // Vérifier si l'erreur est liée à la disponibilité de la chambre
                if (error.message && error.message.includes('La chambre n\'est pas disponible')) {
                    // Rediriger vers la page de disponibilité
                    window.location.href = 'http://127.0.0.1:5502/kaouthar/nonDispo.html';
                } else {
                    // Sinon, afficher l'erreur normalement
                    throw new Error(error.message || 'Erreur lors de la réservation.');
                }
            });
        }
    })
    .catch(error => {
        // Afficher une alerte en cas d'erreur
        alert(error.message || 'Erreur lors de la réservation.');
    });
};



$(function() {
    // Initialisation des datepickers
    $("#date_arrivee, #date_depart").datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0, 
        beforeShowDay: function(date) {
            var today = new Date(); 
            if (date < today) {
                return [false, "disabled", "Cette date est indisponible"];
            }
            return [true, ""];
        }
    });
});