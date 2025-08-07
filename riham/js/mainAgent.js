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


//fonction pour afficher les chambres totales
fetch('http://localhost:5502/reservations-chambre')
    .then(response => response.json())
    .then(data => {
        const numberOfReservations = data.length;
        document.getElementById('reservationsCount').textContent = numberOfReservations;
    })
    .catch(error => console.error('Erreur lors de la récupération du nombre de réservations de chambre:', error));

    fetch('http://localhost:5502/total-disponibilite')
    .then(response => response.json())
    .then(data => {
        document.getElementById('totalDisponibilite').textContent = data.total_disponibilite;
    })
    .catch(error => console.error('Erreur lors de la récupération du total de disponibilité des chambres:', error));

// Lorsque le document est prêt
// Ajoutez cette fonction pour afficher la boîte de dialogue de confirmation

$(document).ready(function() {
  $.get("http://localhost:5502/nombre_lignes_contact", function(data) {
      $('#nombreLignesContact').text(data.totalLignes);
  });
});


