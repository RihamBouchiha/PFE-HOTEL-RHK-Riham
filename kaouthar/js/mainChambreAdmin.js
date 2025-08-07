document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeForm = document.getElementById('addEmployeeForm');

    addEmployeeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const capacite = document.getElementById('capacite').value;
        const disponibilite = document.getElementById('disponibilite').value;
        const type = document.getElementById('type').value;
        const prix = document.getElementById('prix').value;

        fetch('http://localhost:5502/chambre_types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                capacite,
                disponibilite,
                type,
                prix
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la réservation.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Type de chambre ajouté avec succès :', data);
            addEmployeeForm.reset();
            $('#addEmployeeModal').modal('hide');
            fetchChambreTypes();
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de la réservation :', error);
            alert('Une erreur est survenue lors de l\'ajout de la réservation.');
        });
    });

    const editChambreForm = document.getElementById('editChambreForm');
    editChambreForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idChambre = document.getElementById('edit_id_chambre').value;
        const capacite = document.getElementById('edit_capacite').value;
        const disponibilite = document.getElementById('edit_disponibilite').value;
        const type = document.getElementById('edit_type').value;
        const prix = document.getElementById('edit_prix').value;

        try {
            const response = await fetch(`http://localhost:5502/chambre_types/${idChambre}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    capacite,
                    disponibilite,
                    type,
                    prix
                })
            });

            if (!response.ok) {
                throw new Error('La mise à jour de la chambre a échoué.');
            }

            const data = await response.json();
            console.log('Chambre mise à jour avec succès :', data);
            document.getElementById('editChambreModal').style.display = 'none';
            fetchChambreTypes();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la chambre :', error);
            alert('Erreur lors de la mise à jour de la chambre : ' + error.message);
        }
    });

    editChambreModal.style.display = 'none';

    function fetchChambreTypes() {
        fetch('http://localhost:5502/chambre_types')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('reservationTableBody');
            tbody.innerHTML = '';
            data.forEach(chambreType => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="custom-checkbox">
                        <input type="checkbox" id="checkbox${chambreType.id_chambre_type}" name="option[]" value="${chambreType.id_chambre_type}">
                        <label for="checkbox${chambreType.id_chambre_type}"></label></span>
                    </td>
                    <td>${chambreType.id_chambre_type}</td>
                    <td>${chambreType.capacite}</td>
                    <td>${chambreType.disponibilite}</td>
                    <td>${chambreType.type}</td>
                    <td>${chambreType.prix}</td>
                 
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
                tbody.appendChild(row);

                const deleteButton = row.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => {
                    const confirmationModal = document.getElementById('confirmationModal');
                    confirmationModal.style.display = 'block';

                    document.getElementById('confirmDelete').addEventListener('click', () => {
                        const idToDelete = chambreType.id_chambre_type;
                        fetch(`http://localhost:5502/chambre_types/${idToDelete}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('La suppression de la ligne a échoué.');
                            }
                            row.remove(); // Supprime la ligne du tableau
                            confirmationModal.style.display = 'none'; // Ferme le modal de confirmation
                        })
                        .catch(error => console.error('Erreur lors de la suppression de la ligne :', error));
                    });

                    document.getElementById('cancelDelete').addEventListener('click', () => {
                        confirmationModal.style.display = 'none'; // Ferme le modal de confirmation
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
        .catch(error => console.error('Erreur lors de la récupération des données des types de chambre :', error));
    }

    fetchChambreTypes();
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
              const chambreHtml = `
                <div class="chambre" data-id="${chambre.id_chambre_type}">
                    <img src="${imageUrl}" alt="Image de la chambre">
                    <div class="infos">
                        <h3>${chambre.type}</h3>
                        <p>Capacité: ${chambre.capacite}</p>
                        <p>Disponibilité: ${chambre.disponibilite }</p>
                          <hr class="separator">
                    //  
                        <p class="align-right">${chambre.prix} MAD <br> Par nuit</p>
                        <div class="BtnContainer">
                            
                        </div>
                    </div>
                </div>
            `;

            // Ajouter la chambre au conteneur
            $('#chambres-container').append(chambreHtml);
        });
    });
});

// Événement de clic pour fermer le modal
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        document.getElementById('confirmationModal').style.display = 'none';
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