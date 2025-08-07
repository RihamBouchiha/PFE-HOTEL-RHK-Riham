$(document).ready(function() {
  $('#calendar').fullCalendar({
    // Options du calendrier
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    // Récupérer les dates de réservation depuis le backend
    events: function(start, end, timezone, callback) {
      // Effectuer une requête GET vers le backend pour récupérer les réservations de chambre avec les détails du client
      $.get('http://localhost:5502/reservations-chambre-client', function(data) {
        // Transformer les données en événements pour FullCalendar
        var events = data.map(function(reservation) {
          return {
            title: reservation.nom_client + ' ' + reservation.prenom_client + ' - ' + reservation.type_chambre, // Utiliser le nom du client et le type de chambre comme titre de l'événement
            start: new Date(reservation.date_arrivee), // Convertir la date d'arrivée en objet Date JavaScript
            end: new Date(reservation.date_depart), // Convertir la date de départ en objet Date JavaScript
            color: 'green', // Couleur des événements réservés
            reservation: reservation // Ajouter les détails de la réservation à l'événement
          };
        });
        // Appeler la fonction de rappel avec les événements récupérés
        callback(events);
      });
    },
    // 
    // Événement lorsqu'un événement du calendrier est cliqué
    eventClick: function(calEvent, jsEvent, view) {
      // Formater les dates
      var dateArrivee = moment(calEvent.reservation.date_arrivee).format('DD/MM/YYYY');
      var dateDepart = moment(calEvent.reservation.date_depart).format('DD/MM/YYYY');

      // Afficher les détails de la réservation dans une modal Bootstrap
      $('#reservationModalTitle').text(calEvent.title);
      $('#nomClient').text(calEvent.reservation.nom_client);
      $('#prenomClient').text(calEvent.reservation.prenom_client);
      $('#typeChambre').text(calEvent.reservation.type_chambre);
      $('#dateArrivee').text(dateDepart);
      $('#dateDepart').text(dateArrivee);
      $('#reservationModal').modal('show');
    }
  });
});
