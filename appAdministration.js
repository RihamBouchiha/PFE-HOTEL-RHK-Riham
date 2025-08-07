//ce fichier est un fichier backend qui concerne la partie administration


//get nombre totale des chambres
// Récupération des réservations
/*app.get('/chambres_totales', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total_chambres FROM chambre';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des chambres totales :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des chambres totales.' });
    } else {
      console.log('données récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});
*/
