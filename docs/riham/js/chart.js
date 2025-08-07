// Graphe pour les statistiques générales
fetch('http://localhost:5502/statistics')
    .then(response => response.json())
    .then(data => {
        const reservationsSalle = data.salleCount;
        const reservationsChambre = data.chambreCount;
        const reservationsTable = data.tableCount;
        const ctx1 = document.getElementById("chart-1").getContext("2d");

        const myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Salles', 'Chambres', 'Tables'],
                datasets: [{
                    label: 'Nombre de réservations',
                    data: [reservationsSalle, reservationsChambre, reservationsTable],
                    backgroundColor: [
                        "rgba(64, 162, 235, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderColor: [
                        "rgba(64, 162, 235, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de réservation :', error);
    });


