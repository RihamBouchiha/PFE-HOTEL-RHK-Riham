document.addEventListener('DOMContentLoaded', () => {
    
    const tableBody = document.querySelector('table tbody');
    // Écouteur d'événements pour le bouton de suppression
    tableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            const reservationId = row.getAttribute('id').split('-')[1];
            fetch(`http://localhost:5502/reservation-salle/${reservationId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La suppression de la réservation de salle a échoué.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                row.remove(); // Supprimer la ligne du tableau HTML
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la réservation de salle :', error);
                alert('Une erreur est survenue lors de la suppression de la réservation de salle.');
            });
        }
    });
// document.getElementById('modifierCHambre').addEventListener('click', () => {
//     location.reload(); // Recharge la page lorsque le bouton Modifier est cliqué
// });

document.getElementById('r').addEventListener('click', () => {
    location.reload(); // Recharge la page lorsque le bouton Modifier est cliqué
});

    // Récupérer les réservations et afficher dans le tableau
    fetch('http://localhost:5502/reservations-salle')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = '';
            data.forEach((reservation, index) => {
                const heureDebut = parseTime(reservation.date_heure_debut);
                const heureFin = parseTime(reservation.date_heure_fin);

                const heureDebutFormatee = formatTime(heureDebut);
                const heureFinFormatee = formatTime(heureFin);
                const jourFormate = formatDate(reservation.jour);

                const row = document.createElement('tr');
                const color = index % 2 === 0 ? 'white' : '#e0e0e0'; // Alterne les couleurs
                row.style.backgroundColor = color;
                row.innerHTML = `
                    <th><span class="custom-checkbox">
                        <input type="checkbox" id="checkbox${reservation.id_reservation_salle}" name="option[]" value="${reservation.id_reservation_salle}">
                        <label for="checkbox${reservation.id_reservation_salle}"></label></span>
                    </th>
                    <td>${reservation.id_reservation_salle}</td>
                    <td>${heureDebutFormatee}</td>
                    <td>${heureFinFormatee}</td>
                    <td>${jourFormate}</td>
                    <td>${reservation.type}</td>
                    <td>
                        <button class="edit-btn" data-toggle="modal" data-tooltip="tooltip" title="Edit">
                            <i class="material-icons">&#xE254;</i>
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn btn-red" data-toggle="modal" data-tooltip="tooltip" title="Delete">
                            <i class="material-icons">&#xE872;</i>
                        </button>
                    </td>
                `;
                row.setAttribute('id', `reservation-${reservation.id_reservation_salle}`);
                tbody.appendChild(row);

                // Ajouter l'écouteur d'événement de suppression ici après l'ajout du bouton de suppression
                const deleteButton = row.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => {
                    const reservationId = reservation.id_reservation_salle;
                    fetch(`http://localhost:5502/reservation-salle/${reservationId}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('La suppression de la réservation de salle a échoué.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data.message);
                        row.remove(); // Supprimer la ligne du tableau HTML
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression de la réservation de salle :', error);
                        alert('Une erreur est survenue lors de la suppression de la réservation de salle.');
                    });
                });

                const editButton = row.querySelector('.edit-btn');
                editButton.addEventListener('click', () => {
                    const idChambre = row.cells[1].textContent;
                    const capacite = row.cells[2].textContent;
                    const disponibilite = row.cells[3].textContent;
                    const type = row.cells[4].textContent;
                    const prix = row.cells[5].textContent;

                    document.getElementById('edit_id_chambre').value = idChambre;
                    document.getElementById('edit_capacite').value = capacite;
                    document.getElementById('edit_disponibilite').value = disponibilite;
                    document.getElementById('edit_type').value = type;
                    document.getElementById('edit_prix').value = prix;

                    document.getElementById('editChambreModal').style.display = 'block';
                });
            
            
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des réservations de table:', error));
     
        
    });


function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDate(dateString) {
    return dateString.substring(0, 10); // Garder uniquement les 10 premiers caractères (YYYY-MM-DD)
}

function submitForm(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre automatiquement

    // Récupérer les valeurs des champs du formulaire
    const date_heure_debut = document.getElementById("date_heure_debut").value;
    const date_heure_fin = document.getElementById("date_heure_fin").value;
    const jour = document.getElementById("jour").value;
    const type = document.getElementById("type").value;

    // Créer un objet contenant les données à envoyer
    const dataToSend = {
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
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de la réservation.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Réservation ajoutée avec succès :', data);
        // Réinitialiser le formulaire et masquer le modal
        document.getElementById("addEmployeeForm").reset();
        $('#addEmployeeModal').modal('hide');
        // Actualiser la liste des réservations après l'ajout
        fetchReservationTable(); // Vous devez implémenter cette fonction pour actualiser la liste des réservations
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout de la réservation :', error);
        location.reload();
    });
}


document.getElementById('modifierCHambre').addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    
    // Récupération des données du formulaire d'édition
    const id_reservation_salle = document.getElementById('edit_id_chambre').value;
    const date_heure_debut = document.getElementById('edit_capacite').value;
    const date_heure_fin = document.getElementById('edit_disponibilite').value;
    const jour = document.getElementById('edit_type').value;
    const type = document.getElementById('edit_prix').value;
    
    // Construction de l'objet à envoyer
    const data = {
        date_heure_debut: date_heure_debut,
        date_heure_fin: date_heure_fin,
        jour: jour,
        type: type
    };

    // Envoi de la requête PUT pour modifier la réservation
    fetch(`http://localhost:5502/reservation-salle/${id_reservation_salle}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La modification de la réservation a échoué.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // Mettre à jour les informations dans le tableau
        const row = document.getElementById(`reservation-${id_reservation_salle}`);
        row.cells[2].textContent = date_heure_debut;
        row.cells[3].textContent = date_heure_fin;
        row.cells[4].textContent = jour;
        row.cells[5].textContent = type;
        
        // Fermer le modal d'édition
        document.getElementById('editChambreModal').style.display = 'none';
    })
    .catch(error => {
        console.error('Erreur lors de la modification de la réservation :', error);
        alert('Une erreur est survenue lors de la modification de la réservation.');
    });
});

//   BUTTON close 
var closeButton = document.querySelector("#editChambreModal .close");
closeButton.addEventListener("click", function() {
     var modal = document.getElementById("editChambreModal");
     modal.style.display = "none";
 });

 var closeButton = document.querySelector("#addEmployeeModal .close");
closeButton.addEventListener("click", function() {
    var modal = document.getElementById("addEmployeeModal");
     modal.style.display = "none";

 });