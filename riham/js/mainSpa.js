//fonction de hoover
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));
//fonction de menu 
document.addEventListener("DOMContentLoaded", function() {
  let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");

  toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };
});
//fct de menu
document.addEventListener("DOMContentLoaded", function() {
    let container = document.querySelector(".container");
    let list = document.querySelectorAll(".navigation li");

    function activateLink() {
        list.forEach((item) => {
            item.classList.remove("active");
        });
        this.classList.add("active");
    }

    container.addEventListener("click", function(event) {
        if (event.target.closest(".navigation li")) {
            activateLink.call(event.target.closest(".navigation li"));
        }
    });
});

//get
document.addEventListener('DOMContentLoaded', () => {
  function fetchReservationTable() {
      $.ajax({
          url: '/reservations-spa',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              displayReservations(data);
          },
          error: function(xhr, status, error) {
              console.error('Erreur lors de la récupération des réservations de spa:', error);
              alert('Une erreur est survenue lors de la récupération des réservations de spa.');
          }
      });
  }

  function displayReservations(reservations) {
      const tableBody = document.getElementById('reservationTableBody');
      tableBody.innerHTML = '';

      reservations.forEach(reservation => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td></td>
              <td>${reservation.jour}</td>
              <td>${reservation.heure_debut}</td>
              <td>${reservation.heure_fin}</td>
              <td>${reservation.type}</td>
              <td>Modifier</td>
              <td>Supprimer</td>
          `;
          tableBody.appendChild(row);
      });
  }

  fetchReservationTable();
});

/*
//post 
document.addEventListener('DOMContentLoaded', () => {
  // Lier l'événement de soumission de formulaire
  const addEmployeeForm = document.getElementById('addEmployeeForm');
  addEmployeeForm.addEventListener('submit', submitForm);
});

function submitForm(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre automatiquement

  // Récupérer les valeurs des champs du formulaire
  const jour = document.getElementById("jour").value;
  const heure_debut = document.getElementById("heure_debut").value;
  const heure_fin = document.getElementById("heure_fin").value;
  const type = document.getElementById("type").value;

  // Créer un objet contenant les données à envoyer
  const dataToSend = {
      jour: jour,
      heure_debut: heure_debut,
      heure_fin: heure_fin,
      type: type
  };

  // Envoyer les données via une requête AJAX
  fetch('/reservations_spa', {
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
      alert('Une erreur est survenue lors de l\'ajout de la réservation.');
  });
}
*/







  
  