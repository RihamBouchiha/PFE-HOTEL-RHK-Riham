function processPayment() {
    const titulaire = document.getElementById('titulaire').value;
    const numeroCarte = document.getElementById('numero-carte').value;
    const cvv = document.getElementById('cvv').value;
    const validite = document.getElementById('validite').value; 
    const dataToSende = {
        titulaire_carte: titulaire, 
        numero_carte: numeroCarte, 
        cvv: cvv,
        validite_carte: validite, 
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5502/paiements", true); 
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
            let data = JSON.parse(xhr.response);
            document.getElementById('titulaire').value = "";
            document.getElementById('numero-carte').value = "";
            document.getElementById('cvv').value = "";
            document.getElementById('validite').value = "";
            window.location.href = "/riham/indexRiham1.html";
        } else {
            alert(xhr.response);
        }
    });
    xhr.addEventListener("error", () => {
        alert("Erreur lors de la requête de paiement");
    });
    xhr.send(JSON.stringify(dataToSende));
}


function chargerDetailsChambre(reservation) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5502/chambre_types/${reservation.id_chambre_type}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails du type de chambre');
                }
                return response.json();
            })
            .then(chambreType => {
                if (!chambreType || !chambreType.type || !chambreType.prix) {
                    throw new Error('Détails du type de chambre non trouvés');
                }
                reservation.type_chambre = chambreType.type;
                reservation.prix_chambre = chambreType.prix; 
                resolve(reservation);
            })
            
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

function calculerTotal(reservation) {
    return reservation.prix * reservation.nombre_chambre;
}

function mettreAJourTotal(total) {
    var totalElement = document.getElementById('totalAmount');
    totalElement.textContent = total.toFixed(2) + ' MAD';
}

function chargerReservationsChambre() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var reservations = JSON.parse(xhr.responseText);
                var derniereReservation = reservations[reservations.length - 1];
                afficherReservationChambre(derniereReservation);
            } else {
                console.error('Erreur lors de la récupération des réservations de chambre :', xhr.status);
            }
        }
    };
    xhr.open('GET', 'http://localhost:5502/reservations-chambre', true);
    xhr.send();
}

function afficherReservationChambre(reservation) {
    var reservationSection = document.getElementById('reservationSection');
    reservationSection.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.textContent = 'Votre Réservation';
    reservationSection.appendChild(h2);

    var br = document.createElement('br');
    reservationSection.appendChild(br);

    var h3 = document.createElement('h3');
    h3.textContent = 'La Facture';
    reservationSection.appendChild(h3);

    var ul = document.createElement('ul');

    var liArrivee = document.createElement('li');
    liArrivee.textContent = 'Date Arrivée: ' + formatDate(reservation.date_arrivee);
    var liDepart = document.createElement('li');
    liDepart.textContent = 'Date Départ: ' + formatDate(reservation.date_depart);
    var liPersonnes = document.createElement('li');
    liPersonnes.textContent = 'Nombre de Personnes: ' + reservation.nombres_personnes; // Mettre à jour le nombre de personnes
    var liChambre = document.createElement('li');
    liChambre.textContent = 'Nombre de Chambre: ' + reservation.nombre_chambre;

    ul.appendChild(liArrivee);
    ul.appendChild(liDepart);
    ul.appendChild(liPersonnes);
    ul.appendChild(liChambre);

    reservationSection.appendChild(ul);

    var hr = document.createElement('hr');
    hr.className = 'separator';
    reservationSection.appendChild(hr);

    var liTypeChambre = document.createElement('li');
    liTypeChambre.textContent = 'Type de Chambre: ' + reservation.type_chambre;
    var liPrixChambre = document.createElement('li');
    liPrixChambre.textContent = 'Prix de la Chambre: ' + reservation.prix+ ' MAD';
    
    ul.appendChild(liTypeChambre);
    ul.appendChild(liPrixChambre); 

    reservationSection.appendChild(ul);

    var hr = document.createElement('hr');
    hr.className = 'separator';
    reservationSection.appendChild(hr);

    var h4Total = document.createElement('h4');
    h4Total.className = 'h_4';
    h4Total.textContent = 'Total : ';
    reservationSection.appendChild(h4Total);

    var h4Prix = document.createElement('h4');
    h4Prix.className = 'prix';
    var total = calculerTotal(reservation); // Calcul du total
    h4Prix.textContent = total.toFixed(2) + ' MAD'; // Affichage du total
    reservationSection.appendChild(h4Prix);

    mettreAJourTotal(total);
}


function formatDate(dateStr) {
    var date = new Date(dateStr);
    var formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
}

document.addEventListener('DOMContentLoaded', function() {
    chargerReservationsChambre();
});
