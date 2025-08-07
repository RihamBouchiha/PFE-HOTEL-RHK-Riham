//fonction de hoover
/*let list = document.querySelectorAll(".navigation li");

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
      // Supprimer la classe "active" de tous les éléments de la liste
      list.forEach((item) => {
          item.classList.remove("active");
      });
      // Ajouter la classe "active" à l'élément cliqué
      this.classList.add("active");
  }

  // Ajouter un gestionnaire d'événements "click" à la zone de la classe container
  container.addEventListener("click", function(event) {
      // Vérifier si l'élément cliqué est une zone de la classe navigation li
      if (event.target.closest(".navigation li")) {
          // Si oui, appeler la fonction activateLink pour activer l'élément
          activateLink.call(event.target.closest(".navigation li"));
      }
  });
});

// Fonction pour récupérer les réservations totales
function getReservationsTotal() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        document.getElementById('reservationsTotal').textContent = data[0].total_reservations;
      } else {
        console.error('Erreur lors de la récupération des réservations totales:', xhr.status);
      }
    }
  };

  xhr.open('GET', '/reservations_totales');
  xhr.send();
}

// Appel de la fonction pour récupérer les réservations totales lors du chargement de la page
getReservationsTotal();

*/
