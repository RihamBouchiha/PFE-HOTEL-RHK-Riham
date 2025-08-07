$(document).ready(function() {
  // Récupérer les dates de réservation depuis le backend
  $.get('/reservations-chambre', function(data) {
      const chambreNonDisponibleMessage = "Nous vous prions de nous excuser pour ce désagrément. La chambre ou le tarif que vous avez choisi n'est pas disponible pour cette période. Veuillez sélectionner une autre chambre ou un autre tarif.";

      // Suppose que dateArrivee et dateDepart sont déjà définis avec les valeurs sélectionnées
      const dateArrivee = new Date('2024-04-18'); // Exemple
      const dateDepart = new Date('2024-04-20'); // Exemple

      // Vérifier si les dates sélectionnées correspondent à une période de non-disponibilité
      const chambreIndisponible = data.some(function(reservation) {
          const reservationDateArrivee = new Date(reservation.date_arrivee);
          const reservationDateDepart = new Date(reservation.date_depart);
          return dateArrivee >= reservationDateArrivee && dateArrivee <= reservationDateDepart ||
              dateDepart >= reservationDateArrivee && dateDepart <= reservationDateDepart ||
              dateArrivee <= reservationDateArrivee && dateDepart >= reservationDateDepart;
      });

      // Afficher le message si la chambre est indisponible
      if (chambreIndisponible) {
          $('.chambres').append(`<p>${chambreNonDisponibleMessage}</p>`);
      }
  });
});
