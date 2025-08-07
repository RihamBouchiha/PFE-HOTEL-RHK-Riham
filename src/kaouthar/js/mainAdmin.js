document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour afficher la fenêtre modale de confirmation de suppression
    const showConfirmationModal = () => {
        document.getElementById('confirmationModal').style.display = 'block';
    };

    // Récupération des réservations depuis le backend et création du tableau
    fetch('http://localhost:5502/reservations-chambre')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = '';
            data.forEach(reservation => {
                const dateDepart = new Date(reservation.date_depart);
                const dateArrivee = new Date(reservation.date_arrivee);
                const formatDateDepart = `${dateDepart.getFullYear()}-${(dateDepart.getMonth() + 1).toString().padStart(2, '0')}-${dateDepart.getDate().toString().padStart(2, '0')}`;
                const formatDateArrivee = `${dateArrivee.getFullYear()}-${(dateArrivee.getMonth() + 1).toString().padStart(2, '0')}-${dateArrivee.getDate().toString().padStart(2, '0')}`;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th><span class="custom-checkbox">
                        <input type="checkbox" id="checkbox${reservation.id_reser_chambre}" name="option[]" value="${reservation.id_reser_chambre}">
                        <label for="checkbox${reservation.id_reser_chambre}"></label></span>
                    </th>
                    <td>${reservation.id_reser_chambre}</td>
                    <td>${formatDateDepart}</td>
                    <td>${formatDateArrivee}</td>
                    <td>${reservation.nombres_personnes}</td>
                    <td>${reservation.nombre_chambre}</td>
                    <td>${reservation.type_chambre}</td>
                    <td>
                        <button class="delete-btn btn-red" data-toggle="modal" data-tooltip="tooltip" title="Delete">
                            <i class="material-icons">&#xE872;</i>
                        </button>
                    </td>
                    <td>
                        <button class="edit-btn" data-toggle="modal" data-tooltip="tooltip" title="Edit">
                            <i class="material-icons">&#xE254;</i>
                        </button>
                    </td>
                `;
                row.setAttribute('id', `reservation-${reservation.id_reser_chambre}`);
                tbody.appendChild(row);

                // Gestion de l'événement de clic sur le bouton de suppression
                const deleteButton = row.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => {
                    // Afficher la fenêtre modale de confirmation
                    showConfirmationModal();

                    // Gestion de l'événement de clic sur le bouton de confirmation
                    document.getElementById('confirmDelete').addEventListener('click', () => {
                        // Suppression de la ligne
                        row.remove();
                        const reservationId = reservation.id_reser_chambre;
                        fetch(`http://localhost:5502/reservat-chambre/${reservationId}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('La suppression de la réservation a échoué.');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data.message); 
                        })
                        .catch(error => {
                            console.error('Erreur lors de la suppression de la réservation :', error);
                            alert('Une erreur est survenue lors de la suppression de la réservation.');
                        });

                        // Cacher la fenêtre modale de confirmation
                        document.getElementById('confirmationModal').style.display = 'none';
                    });
                });

                // Gestion de l'événement de clic sur le bouton d'édition
                const editButton = row.querySelector('.edit-btn');
                editButton.addEventListener('click', () => {
                    // Récupération des données de la ligne
                    const idChambre = row.cells[1].textContent;
                    const capacite = row.cells[2].textContent;
                    const disponibilite = row.cells[3].textContent;
                    const type = row.cells[4].textContent;
                    const prix = row.cells[5].textContent;

                    // Pré-remplissage du formulaire d'édition
                    document.getElementById('edit_id_chambre').value = idChambre;
                    document.getElementById('edit_capacite').value = capacite;
                    document.getElementById('edit_disponibilite').value = disponibilite;
                    document.getElementById('edit_type').value = type;
                    document.getElementById('edit_prix').value = prix;
// 
                    // Afficher le modal d'édition
                    document.getElementById('editChambreModal').style.display = 'block';
                });
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des réservations de chambre:', error));

    // Gestion de la soumission du formulaire d'édition de chambre
    document.getElementById('modifierCHambre').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupération des données du formulaire
        const idReservation = document.getElementById('edit_id_chambre').value;
        const dateDepart = document.getElementById('edit_capacite').value;
        const dateArrivee = document.getElementById('edit_disponibilite').value;
        const nombresPersonnes = document.getElementById('edit_type').value;
        const nombreChambres = document.getElementById('edit_prix').value;
        
        // Construction de l'objet à envoyer
        const data = {
            date_depart: dateDepart,
            date_arrivee: dateArrivee,
            nombres_personnes: nombresPersonnes,
            nombre_chambre: nombreChambres
        };

        // Envoie de la requête PUT pour modifier la réservation
        fetch(`http://localhost:5502/modifier-reservation-chambre/${idReservation}`, {
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
            const row = document.getElementById(`reservation-${idReservation}`);
            row.cells[2].textContent = dateDepart;
            row.cells[3].textContent = dateArrivee;
            row.cells[4].textContent = nombresPersonnes;
            row.cells[5].textContent = nombreChambres;
            
            // Fermer le modal d'édition
            document.getElementById('editChambreModal').style.display = 'none';
        })
        .catch(error => {
            console.error('Erreur lors de la modification de la réservation :', error);
            alert('Une erreur est survenue lors de la modification de la réservation.');
        });
    });
});

// Gestion de l'événement de clic sur le bouton de confirmation de suppression
document.getElementById('confirmDelete').addEventListener('click', () => {
    // Suppression de la réservation
    console.log('La réservation a été supprimée avec succès.');
    // Cacher la fenêtre modale de confirmation
    document.getElementById('confirmationModal').style.display = 'none';
});


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
            
            // Créer le code HTML pour chaque chambre
            const chambreHtml = `
                <div class="chambre" data-id="${chambre.id_chambre_type}">
                    <img src="${imageUrl}" alt="Image de la chambre">
                    <div class="infos">
                        <h3>${chambre.type}</h3>
                        <p>Capacité: ${chambre.capacite}</p>
                        <p>Disponibilité: ${chambre.disponibilite }</p>
                          <hr class="separator">
                     
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
const validateForm = (idChambreType) => {
  const isInteger = (value) => {
      return /^\d+$/.test(value);
  };

  const dateArrivee = document.getElementById('date_arrivee').value;
  const dateDepart = document.getElementById('date_depart').value;
  const nombrePersonnes = document.getElementById('nombres_parsonnes').value;
  const nombreChambre = document.getElementById('nombre_chambre').value;

  const verificationMessageDateArrivee = document.getElementById('verificationMessageDateArrivee');
  const verificationMessageDateDepart = document.getElementById('verificationMessageDateDepart');
  const verificationMessageNombrePersonnes = document.getElementById('verificationMessageNombrePersonnes');

  verificationMessageDateArrivee.innerText = '';
  verificationMessageDateDepart.innerText = '';
  verificationMessageNombrePersonnes.innerText = '';

  if (!dateArrivee || !dateDepart || !nombrePersonnes) {
      verificationMessageDateArrivee.innerText = 'Veuillez remplir tous les champs';
  } else if (!isInteger(nombrePersonnes)) {
      verificationMessageNombrePersonnes.innerText = 'Veuillez saisir un nombre entier pour le nombre de personnes';
  } else {
      const dataToSend = {
          date_arrivee: dateArrivee,
          date_depart: dateDepart,
          nombres_personnes: nombrePersonnes,
          nombre_chambre: nombreChambre,
          id_chambre_type: idChambreType 
      };
      
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5502/reserver-chambre", true); 
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("load", () => {
          if (xhr.status == 200) {
              let data = JSON.parse(xhr.response);
             
              document.getElementById('date_arrivee').value = "";
              document.getElementById('date_depart').value = "";
              document.getElementById('nombres_parsonnes').value = "";
              document.getElementById('nombre_chambre').value = "";
              
              window.location.href = "http://127.0.0.1:5502/kaouthar/indexAdmin.html";
          } else {
              alert(xhr.response);
          }
      });
      xhr.addEventListener("error", () => {
          alert("Erreur lors de la requête de réservation");
      });
      xhr.send(JSON.stringify(dataToSend));
  }
};

document.addEventListener('DOMContentLoaded', function () {
  var dateArriveeField = document.getElementById('date_arrivee');
  var dateDepartField = document.getElementById('date_depart');

  var today = new Date(); 

  var pickerArrivee = new Pikaday({
      field: dateArriveeField,
      toString(date) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      },
      onSelect: function (date) {
             },
      minDate: today 
  });

  var pickerDepart = new Pikaday({
      field: dateDepartField,
      toString(date) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      },
      onSelect: function (date) {
            },
      minDate: today 
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
    //  FJFJFJ  
 });