fetch('http://localhost:5502/derniere-reservation-salle')
  .then(response => response.json())
  .then(data => {
    // Afficher les données dans la page de confirmation
    document.getElementById("nomReservation").textContent = data[0].nom;
    document.getElementById("prenomReservation").textContent = data[0].prenom;
    document.getElementById("dateHeureDebutReservation").textContent = data[0].date_heure_debut;
    document.getElementById("dateHeureFinReservation").textContent = data[0].date_heure_fin;
    let jour = new Date(data[0].jour).toLocaleDateString('fr-FR');
    document.getElementById("jourReservation").textContent = jour;
    document.getElementById("typeReservation").textContent = data[0].type;
    
    // Ajouter un message de remerciement personnalisé
    const messageRemerciement = document.getElementById('messageRemerciement');
    messageRemerciement.textContent = `Merci ${data[0].prenom} ${data[0].nom} pour votre réservation! Nous avons hâte de vous accueillir à RHK salle pour votre événement!.`;
  })
  .catch(error => console.error('Erreur lors de la récupération de la dernière réservation :', error));


  
  document.getElementById("downloadButton").addEventListener("click", function() {
    const section10 = document.getElementById("section10");
    let sectionContent = section10.innerHTML;
    sectionContent += `<style>${styles}</style>`; 
    const blob = new Blob([sectionContent], { type: "text/HTML" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Votre réservation de salle.html";
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
});

const styles = `
  /* Reset des styles par défaut */
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  /* Style de fond et de police */
  body {
      font-family: Arial, sans-serif;
      background-color: beige;
      padding: 20px;
  }
  
  /* Conteneur principal */
  .container {
      display: flex;

      flex-direction: column; /* Modifier la direction en colonne pour afficher les éléments verticalement */
      align-items: center; /* Centrer les éléments horizontalement */
      justify-content: center; /* Centrer les éléments verticalement */
      align-items: center;
      justify-content: center;

      height: 100vh;
  }
  
  .inner-container {
      max-width: 600px;
      background-color: beige;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      text-align: center;
  }
  
  /* Titre */
  h1 {
      margin-top: 20px;
      color: #b7995d;
      font-family: 'Alice', serif;
      font-size: 40px;
      font-weight: normal;
      margin-bottom: 20px;
  }
  
  /* Style des informations de réservation */
  .container p {
      margin-bottom: 15px;
      color: #886e31;
      font-weight: bold;
  }
  

  /* Bordure inférieure pour chaque élément */
  .container p:not(:last-child) {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
  }
  

  /* Style du texte en gras */
  .container span {
      color: black;
  }
`;

styles += `
  /* Ajout de retours à la ligne après chaque élément */
  .container p {
      margin-bottom: 15px;
      color: #886e31;
      font-weight: bold;
      display: block;
  }
`;
