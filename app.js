const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5502;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hotel_rhk'
});

app.listen(port, () => {
  
    console.log("hello to the server " + port);
});


app.get('/reservationsss-chambre', (req, res) => {
  const sql = `SELECT COUNT(*) AS total_reservations FROM Reservation_chambre`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération du nombre de réservations de chambre:', err);
          res.status(500).json({ message: 'Erreur lors de la récupération du nombre de réservations de chambre.' });
      } else {
          console.log('Nombre de réservations de chambre récupéré avec succès:', result[0].total_reservations);
          res.status(200).send(result[0].total_reservations.toString());
      }
  });
});




app.get('/reservations-chambre', (req, res) => {
  const sql = `SELECT rc.*, ct.type AS type_chambre, ct.prix 
               FROM Reservation_chambre rc 
               JOIN Chambre_type ct ON rc.id_chambre_type = ct.id_chambre_type`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération des réservations de chambre:', err);
          res.status(500).json({ message: 'Erreur lors de la récupération des réservations de chambre.' });
      } else {
          console.log('Réservations de chambre récupérées avec succès:', result);
          res.status(200).json(result);
      }
  });
});

// Supprimer une réservation de chambre
app.delete('/reservat-chambre/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Reservation_chambre WHERE id_reser_chambre = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation de chambre:', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de la réservation de chambre.' });
    } else {
      console.log('Réservation de chambre supprimée avec succès.');
      res.status(200).json({ message: 'Réservation de chambre supprimée avec succès.' });
    }
  });
});

// Modifier une réservation de chambre
app.put('/modifier-reservation-chambre/:id', (req, res) => {
  const id = req.params.id;
  const { date_depart, date_arrivee, nombres_personnes, nombre_chambre, id_chambre_type, id_client, id_paiement } = req.body;

  const checkReservationQuery = 'SELECT * FROM Reservation_chambre WHERE id_reser_chambre = ?';
  connection.query(checkReservationQuery, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la réservation :', err);
      return res.status(500).json({ message: 'Erreur lors de la modification de la réservation.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'La réservation de chambre spécifiée n\'existe pas.' });
    }
    const updateReservationQuery = `
      UPDATE Reservation_chambre 
      SET date_depart = ?, date_arrivee = ?, nombres_personnes = ?, nombre_chambre = ?, id_chambre_type = ?, id_client = ?, id_paiement = ? 
      WHERE id_reser_chambre = ?
    `;
    connection.query(updateReservationQuery, [date_depart, date_arrivee, nombres_personnes, nombre_chambre, id_chambre_type, id_client, id_paiement, id], (errUpdate, resultUpdate) => {
      if (errUpdate) {
        console.error('Erreur lors de la mise à jour de la réservation de chambre :', errUpdate);
        return res.status(500).json({ message: 'Erreur lors de la modification de la réservation de chambre.' });
      }

      console.log('Réservation de chambre modifiée avec succès.');
      res.status(200).json({ message: 'Réservation de chambre modifiée avec succès.' });
    });
  });

});
app.get('/reservations-par-jour', (req, res) => {
  const sql = `SELECT date_arrivee, COUNT(*) AS reservations_chambre_par_jour FROM reservation_chambre GROUP BY date_arrivee`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération du nombre de réservations de chambres par jour :', err);
          res.status(500).json({ message: 'Erreur lors de la récupération du nombre de réservations de chambres par jour.' });
      } else {
          console.log('Nombre de réservations de chambres par jour récupéré avec succès:', result);
          const dates = result.map(entry => entry.date_arrivee);
          const reservationsChambreParJour = result.map(entry => entry.reservations_chambre_par_jour);
          res.status(200).json({ dates, reservationsChambreParJour });
      }
  });
});


// Ajouter la réservation de chambre
app.post('/reserver-chambre', (req, res) => {
  const { date_depart, date_arrivee, nombres_personnes, nombre_chambre, id_chambre_type, id_client, id_paiement } = req.body;
  
  // Vérifier la disponibilité de la chambre
  const sqlCheckAvailability = 'SELECT disponibilite FROM chambre_type WHERE id_chambre_type = ?';
  connection.query(sqlCheckAvailability, [id_chambre_type], (err, result) => {
    if (err) {
      console.error('Erreur lors de la vérification de la disponibilité de la chambre :', err);
      return res.status(500).json({ message: 'Erreur lors de la réservation de la chambre.' });
    }

    // Si la disponibilité est supérieure à zéro, procéder à la réservation
    if (result[0].disponibilite > 0) {
      const sqlReservation = `INSERT INTO Reservation_chambre (date_depart, date_arrivee, nombres_personnes, nombre_chambre, id_chambre_type, id_client, id_paiement) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(sqlReservation, [date_depart, date_arrivee, nombres_personnes, nombre_chambre, id_chambre_type, id_client, id_paiement], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de la réservation :', err);
          return res.status(500).json({ message: 'Erreur lors de la réservation de la chambre.' });
        } else {
          console.log('Réservation de chambre réussie :', result);
          // Mettre à jour la disponibilité des chambres
          const sqlUpdate = 'UPDATE chambre_type SET disponibilite = disponibilite - ? WHERE id_chambre_type = ?';
          connection.query(sqlUpdate, [nombre_chambre, id_chambre_type], (errUpdate, resultUpdate) => {
            if (errUpdate) {
              console.error('Erreur lors de la mise à jour de la disponibilité des chambres :', errUpdate);
              return res.status(500).json({ message: 'Erreur lors de la réservation.' });
            } else {
              res.status(200).json({ message: 'Réservation effectuée avec succès.' });
            }
          });
        }
      });
    } else {
      // Si la disponibilité est égale à zéro, renvoyer une erreur
      res.status(400).json({ message: 'La chambre n\'est pas disponible.' });
    }
  });
});


//total chambre 
app.get('/total-disponibilite', (req, res) => {
  const sql = `SELECT SUM(disponibilite) AS total_disponibilite FROM Chambre_type`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération du total de disponibilité des chambres:', err);
          res.status(500).json({ message: 'Erreur lors de la récupération du total de disponibilité des chambres.' });
      } else {
          console.log('Total de disponibilité des chambres récupéré avec succès:', result[0].total_disponibilite);
          res.status(200).json({ total_disponibilite: result[0].total_disponibilite });
      }
  });
});

app.get('/chambre_types', (req, res) => {
  const sql = 'SELECT * FROM Chambre_type';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des types de chambre :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des types de chambre.' });
    } else {
      console.log('Types de chambre récupérés avec succès :', result);
      res.status(200).json(result);
    }
  });
});

app.post('/chambre_types', (req, res) => {
  const { capacite, disponibilite, type, prix } = req.body;
  if (!capacite || !disponibilite || !type || !prix) {
    return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
  }
  const sql = 'INSERT INTO Chambre_type (capacite, disponibilite, type, prix) VALUES (?, ?, ?, ?)';
  const values = [capacite, disponibilite, type, prix];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du type de chambre :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'insertion du type de chambre.', error: err });
    } else {
      console.log('Nouveau type de chambre inséré avec succès.');
      return res.status(201).json({ message: 'Nouveau type de chambre inséré avec succès.' });
    }
  });
});

// Route pour supprimer un type de chambre
app.delete('/chambre_types/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Chambre_type WHERE id_chambre_type = ?`;
  connection.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Erreur lors de la suppression du type de chambre :', err);
          res.status(500).json({ message: 'Erreur lors de la suppression du type de chambre.' });
      } else {
          console.log('Type de chambre supprimé avec succès.');
          res.status(200).json({ message: 'Type de chambre supprimé avec succès.' });
      }
  });
});

// PUT pour mettre à jour une chambre
app.put('/chambre_types/:id', (req, res) => {
  const id = req.params.id;
  const { capacite, disponibilite, type, prix } = req.body;

  if (!capacite || !disponibilite || !type || !prix) {
    return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
  }
  const sql = 'UPDATE Chambre_type SET capacite = ?, disponibilite = ?, type = ?, prix = ? WHERE id_chambre_type = ?';
  const values = [capacite, disponibilite, type, prix, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du type de chambre :', err);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du type de chambre.', error: err });
    } else {
      console.log('Type de chambre mis à jour avec succès.');
      return res.status(200).json({ message: 'Type de chambre mis à jour avec succès.' });
    }
  });
});



//login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query("SELECT * FROM client WHERE adresse_email = ? AND mot_de_passe = ?", [email, password], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send("Erreur lors de la vérification de la connexion.");
      } else {
          if (results.length > 0) {
              
              res.status(200).send("Connexion réussie.");
          } else {
             
              res.status(401).send("Identifiants incorrects.");
          }
      }
  });
});


//ajouter Chambre_type 
app.post('/clients', (req, res) => {
  const { nom, prenom, adresse_email, numero_telephone, pays, ville, mot_de_passe } = req.body;
  connection.query("INSERT INTO client (nom, prenom, adresse_email, numero_telephone, pays, ville, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?)", [nom, prenom, adresse_email, numero_telephone, pays, ville, mot_de_passe], (err, clientInsertResult) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de l'ajout du client.");
    } else {
      const clientId = clientInsertResult.insertId;
      connection.query("SELECT MAX(id_reser_chambre) AS maxReservationId FROM reservation_chambre", (err, maxReservationIdResult) => {
        if (err) {
          console.error('Erreur lors de la récupération de l\'ID maximal de la réservation de chambre :', err);
          res.status(500).json({ message: 'Erreur lors de la récupération de l\'ID maximal de la réservation de chambre.' });
        } else {
          const reservationId = maxReservationIdResult[0].maxReservationId;
          const updateSql = `UPDATE reservation_chambre SET id_client = ? WHERE id_reser_chambre = ?`;
          connection.query(updateSql, [clientId, reservationId], (err, updateResult) => {
            if (err) {
              console.error('Erreur lors de la mise à jour de la réservation de chambre :', err);
              res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation de chambre.' });
            } else {
              console.log('Mise à jour de la réservation de chambre réussie :', updateResult);
              // Rediriger vers la page indexFacture.html après la mise à jour réussie
              res.status(200).json({ redirectTo: '/riham/indexFacture.html' });
            }
          });
        }
      });
    }
  });
});


//recuperer paiement
app.get('/paiementt', (req, res) => {
  const sql = 'SELECT * FROM paiement';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des données de la table "paiement":', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des données de la table "paiiement".' });
    } else {
      console.log('Données de la table "paiement" récupérées avec succès:', result);
      res.status(200).json(result);
    }
  });
});
//ajout de paiement avec reservation
app.post('/paiements', (req, res) => {
  const { titulaire_carte, numero_carte, cvv, validite_carte } = req.body;
  connection.query("INSERT INTO paiement (titulaire_carte, numero_carte, cvv, validite_carte) VALUES (?, ?, ?, ?)", [titulaire_carte, numero_carte, cvv, validite_carte], (err, paiementInsertResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de l'ajout du paiement." });
    } else {
      const paiementId = paiementInsertResult.insertId;
      connection.query("SELECT MAX(id_reser_chambre) AS maxReservationId FROM reservation_chambre", (err, maxreservationIdResult) => {
        if (err) {
          console.error('Erreur lors de la récupération de l\'ID maximal de la réservation de chambre :', err);
          res.status(500).json({ message: 'Erreur lors de la récupération de l\'ID maximal de la réservation de chambre.' });
        } else {
          const reservationnId = maxreservationIdResult[0].maxReservationId;
          const updateSql = 'UPDATE reservation_chambre SET id_paiement = ? WHERE id_reser_chambre = ?';
          connection.query(updateSql, [paiementId, reservationnId], (err, updateResult) => {
            if (err) {
              console.error('Erreur lors de la mise à jour de la réservation de chambre :', err);
              res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation de chambre.' });
            } else {
              console.log('Mise à jour de la réservation de chambre réussie :', updateResult);
              res.status(200).json({ message: 'Mise à jour de la réservation de chambre réussie.' });
            }
          });
        }
      });
    }
  });
});


// Récupérer les détails de l'administrateur
app.get('/administrateurs', (req, res) => {
  const sql = 'SELECT * FROM administrateur';
  connection.query(sql, (err, results) => { 
    if (err) {
      console.error('Erreur lors de la récupération des administrateurs:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des administrateurs.' });
    } else {
      console.log('Administrateurs récupérés avec succès:', results);
      res.status(200).json(results);
    }
  });
});



app.post('/login_admin', (req, res) => {
  const { mail_admin, password } = req.body;

  // Recherche de l'administrateur dans la base de données
  const sql = `SELECT * FROM administrateur WHERE mail_admin = ? AND password = ?`;
  connection.query(sql, [mail_admin, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la vérification de la connexion.");
    } else {
      if (results.length > 0) {
        // Les informations de connexion sont correctes
        res.status(200).send("Connexion réussie.");
      } else {
        // Les informations de connexion sont incorrectes
        res.status(401).send("Identifiants incorrects.");
      }
    }
  });
});

//get reserver_table hiba
// Récupération des réservations
app.get('/reservation_table', (req, res) => {
  const sql = 'SELECT * FROM reservation_table';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations.' });
    } else {
      console.log('Réservations récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});

//POST reserver_table hiba
app.post('/reservationn_table', (req, res) => {
  const {nom,prenom, date_heure_debut, date_heure_fin, jour,type } = req.body;
  const sql = 'INSERT INTO reservation_table (nom,prenom,date_heure_debut, date_heure_fin, jour, type) VALUES (?, ?,?, ?, ?, ?)';
  connection.query(sql, [nom,prenom,date_heure_debut, date_heure_fin, jour, type], (err, result) => {

    if (err) {
      console.error('Erreur lors de l\'insertion de la réservation :', err);
      res.status(500).json({ message: 'Erreur lors de l\'insertion de la réservation.' });
    } else {
      console.log('Réservation ajoutée avec succès :', result);
      res.status(201).json({ message: 'Réservation ajoutée avec succès.' });
    }
  });
});

// Endpoint pour récupérer la dernière réservation de table
app.get('/derniere_reservation_table', (req, res) => {
  const sql = 'SELECT * FROM reservation_table ORDER BY id_reservation_table DESC LIMIT 1'; // Récupérer la dernière réservation
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de la dernière réservation :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération de la dernière réservation.' });
    } else {
      if (result.length > 0) {
        console.log('Dernière réservation récupérée avec succès :', result[0]);
        res.status(200).json(result[0]); // Envoyer la dernière réservation au client
      } else {
        console.log('Aucune réservation trouvée.');
        res.status(404).json({ message: 'Aucune réservation trouvée.' });
      }
    }
  });
});

//modifier table partie hiba
app.put('/table_modif/:id', (req, res) => {
  const id = req.params.id;
  const { date_heure_debut, date_heure_fin, jour, type } = req.body;
  const sql = `UPDATE reservation_table SET date_heure_debut=?, date_heure_fin=?, jour=?, type=? WHERE id_reservation_table = ?`;
  connection.query(sql, [date_heure_debut, date_heure_fin, jour, type, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification de la réservation de table:', err);
      res.status(500).json({ message: 'Erreur lors de la modification de la réservation de table.' });
    } else {
      if (result.affectedRows === 0) {
        console.log('Aucune réservation de table trouvée avec cet ID.');
        res.status(404).json({ message: 'Aucune réservation de table trouvée avec cet ID.' });
      } else {
        console.log('Réservation de table modifiée avec succès.');
        res.status(200).json({ message: 'Réservation de table modifiée avec succès.' });
      }
    }
  });
});
//supprimer table partie hiba
app.delete('/table_delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM reservation_table WHERE id_reservation_table = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation de chambre:', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de la réservation de chambre.' });
    } else {
      console.log('Réservation de chambre supprimée avec succès.');
      res.status(200).json({ message: 'Réservation de chambre supprimée avec succès.' });
    }
  });
});



// Récupérer les réservations de chambre avec les détails du client
app.get('/reservations-chambre-client', (req, res) => {
  const sql = `
    SELECT rc.*, ct.type AS type_chambre, ct.prix, cl.nom AS nom_client, cl.prenom AS prenom_client
    FROM Reservation_chambre rc
    JOIN Chambre_type ct ON rc.id_chambre_type = ct.id_chambre_type
    JOIN client cl ON rc.id_client = cl.id_client`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération des réservations de chambre avec les détails du client :', err);
          res.status(500).json({ message: 'Erreur lors de la récupération des réservations de chambre avec les détails du client.' });
      } else {
          console.log('Réservations de chambre avec les détails du client récupérées avec succès :', result);
          res.status(200).json(result);
      }
  });
});

// Afficher la dernière réservation de salle
app.get('/derniere-reservation-salle', (req, res) => {
  const sql = 'SELECT * FROM reservation_salle ORDER BY id_reservation_salle DESC LIMIT 1';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de la dernière réservation de salle :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération de la dernière réservation de salle.' });
    } else {
      console.log('Dernière réservation de salle récupérée avec succès :', result);
      res.status(200).json(result);
    }
  });
});

app.get('/reservations-salle', (req, res) => {
  const sql = 'SELECT * FROM reservation_salle'; 
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations de salle :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations de salle.' });
    } else {
      console.log('Réservations de salle récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});


// Ajouter une réservation de salle
app.post('/reservation_salle', (req, res) => {
  const { nom, prenom, jour, date_heure_debut, date_heure_fin, type } = req.body;
  const sql = 'INSERT INTO reservation_salle (nom, prenom, date_heure_debut, date_heure_fin, jour, type) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nom, prenom, date_heure_debut, date_heure_fin, jour, type], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de la réservation de salle :', err);
      res.status(500).json({ message: 'Erreur lors de l\'insertion de la réservation de salle.' });
    } else {
      console.log('Réservation de salle ajoutée avec succès :', result);
      res.status(201).json({ message: 'Réservation de salle ajoutée avec succès.' });
    }
  });
});

// Ajoutez une route pour récupérer les statistiques de réservation
app.get('/statistics', (req, res) => {
  const sqlCountChambre = 'SELECT COUNT(*) AS count FROM reservation_chambre';
  const sqlCountSalle = 'SELECT COUNT(*) AS count FROM reservation_salle';
  const sqlCountTable = 'SELECT COUNT(*) AS count FROM reservation_table';

  let chambreCount, salleCount, tableCount;

  // Effectuer les requêtes pour compter les réservations de chaque type
  connection.query(sqlCountChambre, (err, result) => {
    if (err) {
      console.error('Erreur lors du comptage des réservations de chambre :', err);
      chambreCount = 0;
    } else {
      chambreCount = result[0].count;
    }

    connection.query(sqlCountSalle, (err, result) => {
      if (err) {
        console.error('Erreur lors du comptage des réservations de salle :', err);
        salleCount = 0;
      } else {
        salleCount = result[0].count;
      }

      connection.query(sqlCountTable, (err, result) => {
        if (err) {
          console.error('Erreur lors du comptage des réservations de table :', err);
          tableCount = 0;
        } else {
          tableCount = result[0].count;
        }

        // Envoyer les données au format JSON
        res.json({
          chambreCount: chambreCount,
          salleCount: salleCount,
          tableCount: tableCount
        });
      });
    });
  });
});

// Endpoint pour récupérer les réservations de salle
app.get('/reservations-sallet', (req, res) => {
  const sql = 'SELECT type, COUNT(*) as count FROM reservation_salle GROUP BY type';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations de salle :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations de salle.' });
    } else {
      console.log('Réservations de salle récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});


// Supprimer une réservation de salle
app.delete('/reservation-salle/:id', (req, res) => {
  const reservationId = req.params.id;
  const sql = 'DELETE FROM reservation_salle WHERE id_reservation_salle = ?';
  connection.query(sql, [reservationId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation de salle :', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de la réservation de salle.' });
    } else {
      console.log('Réservation de salle supprimée avec succès :', result);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Réservation de salle supprimée avec succès.' });
      } else {
        res.status(404).json({ message: 'La réservation de salle spécifiée n\'a pas été trouvée.' });
      }
    }
  });
});

// Modifier une réservation de salle
app.put('/reservation-salle/:id', (req, res) => {
  const id = req.params.id;
  const { date_heure_debut, date_heure_fin, jour, type } = req.body;
  const sql = 'UPDATE reservation_salle SET date_heure_debut=?, date_heure_fin=?, jour=?, type=? WHERE id_reservation_salle = ?';
  connection.query(sql, [date_heure_debut, date_heure_fin, jour, type, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification de la réservation de salle:', err);
      res.status(500).json({ message: 'Erreur lors de la modification de la réservation de salle.' });
    } else {
      if (result.affectedRows === 0) {
        console.log('Aucune réservation de salle trouvée avec cet ID.');
        res.status(404).json({ message: 'Aucune réservation de salle trouvée avec cet ID.' });
      } else {
        console.log('Réservation de salle modifiée avec succès.');
        res.status(200).json({ message: 'Réservation de salle modifiée avec succès.' });
      }
    }
  });
});


//get reservation spa
app.get('/reservations-spa', (req, res) => {
  const sql = 'SELECT * FROM hotel_rhk.reservation_spa';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations de spa :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations de spa.' });
    } else {
      console.log('Réservations de spa récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});
app.get('/reservationss-spa', (req, res) => {
  const sql = 'SELECT * FROM hotel_rhk.reservation_spa';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations de spa :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations de spa.' });
    } else {
      console.log('Réservations de spa récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});

//post reservation spa partie reservation spa
app.post('/reservations_spa', (req, res) => {
  const { nom, prenom, jour, heure_debut, heure_fin, type } = req.body;
  const sql = 'INSERT INTO reservation_spa (nom, prenom, jour, heure_debut, heure_fin, type) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nom,prenom,jour,heure_debut, heure_fin, type], (err, result) => {
      if (err) {
          console.error('Erreur lors de l\'insertion de la réservation de spa :', err);
          res.status(500).json({ message: 'Erreur lors de l\'insertion de la réservation de spa.' });
      } else {
          console.log('Réservation de spa ajoutée avec succès :', result);
          res.status(201).json({ message: 'Réservation de spa ajoutée avec succès.' });
      }
  });
});


//delete reservation spa
app.delete('/spa_delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `delete from reservation_spa where id_reservation_spa=?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation du spa', err);
      res.status(500).json({ message: 'Erreur lors de la suppression de la réservation du spa' });
    } else {
      console.log('Réservation de spa supprimée avec succès.');
      res.status(200).json({ message: 'Réservation de spa supprimée avec succès.' });
    }
  });
});


//put reservation spa
app.put('/spa_modif/:id', (req, res) => {
  const id = req.params.id;
  const { jour, heure_debut, heure_fin, type } = req.body;
  const sql = `update reservation_spa set jour =?, heure_debut =?, heure_fin = ?, type=? where id_reservation_spa = ?`;
  connection.query(sql, [jour,heure_debut,heure_fin,type,id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification de la réservation de spa:', err);
      res.status(500).json({ message: 'Erreur lors de la modification de la réservation de spa.' });
    } else {
      if (result.affectedRows === 0) {
        console.log('Aucune réservation de spa  trouvée avec cet ID.');
        res.status(404).json({ message: 'Aucune réservation de spa trouvée avec cet ID.' });
      } else {
        console.log('Réservation de spa modifiée avec succès.');
        res.status(200).json({ message: 'Réservation de spa modifiée avec succès.' });
      }
    }
  });
});





//recuperer  agent d'accueil
app.get('/agent', (req, res) => {
  const sql = 'SELECT * FROM agent_d_accueuil';
  connection.query(sql, (err, results) => { 
    if (err) {
      console.error('Erreur lors de la récupération des agents:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des agents.' });
    } else {
      console.log('l agent est récupérés avec succès:', results);
      res.status(200).json(results);
    }
  });
});

//ajouter un agent
app.post('/agent2', (req, res) => {
  const { mail_agent, password_agent} = req.body;
  const sql = `SELECT * FROM agent_d_accueuil WHERE mail_agent = ? AND password_agent = ?`;
  connection.query(sql, [mail_agent, password_agent], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la vérification de la connexion.");
    } else {
      if (results.length > 0) {
        res.status(200).send("Connexion réussie.");
      } else {
        res.status(401).send("Identifiants incorrects.");
      }
    }
  });
});


// Récupération des chambres totales
app.get('/chambres', (req, res) => {
  const sql = 'SELECT COUNT(*) AS chambre_totales FROM chambre_type';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des chambres totales :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des chambres totales.' });
    } else {
      console.log('Données récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});



// Récupération des réservations
app.get('/reservations_totaless', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total_reservations FROM reservations';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations totales :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations totales.' });
    } else {
      console.log('Données récupérées avec succès :', result);
      res.status(200).json(result);
    }
  });
});

//post contact

app.post('/contacttttt', (req, res) => {
  const { sujet, titre, prenom, nom, email, telephone, pays, commentaires } = req.body;
  const sql = 'INSERT INTO contact (sujet, titre, prenom, nom, email, telephone, pays, commentaires) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [sujet, titre, prenom, nom, email, telephone, pays, commentaires], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données pour le contact', err);
      res.status(500).json({ message: 'Erreur lors de l\'insertion des données pour le contact.' });
    } else {
      res.status(201).json({ message: 'contact ajoutée avec succès.' });
    }
  });
});



// app.get('/reservations-chambre', (req, res) => {
//   const sql = `SELECT rc.*, ct.type AS type_chambre, ct.prix 
//                FROM Reservation_chambre rc 
//                JOIN Chambre_type ct ON rc.id_chambre_type = ct.id_chambre_type`;
//   connection.query(sql, (err, result) => {
//       if (err) {
//           console.error('Erreur lors de la récupération des réservations de chambre:', err);
//           res.status(500).json({ message: 'Erreur lors de la récupération des réservations de chambre.' });
//       } else {
//           console.log('Réservations de chambre récupérées avec succès:', result);
//           res.status(200).json(result);
//       }
//   });
// });

app.get('/confirmation_reservation', (req, res) => {
  // Récupérer les informations soumises par l'utilisateur depuis la requête GET
  const { nom, prenom, date_heure_debut, date_heure_fin, jour, type } = req.query;

  // Renvoyer les informations au client dans un format JSON
  res.json({ nom, prenom, date_heure_debut, date_heure_fin, jour, type });
});

// Route pour gérer la soumission du formulaire de réservation
app.post('/reservation_tablle', (req, res) => {
  // Récupérer les informations soumises par l'utilisateur depuis la requête POST
  const { nom, prenom, date_heure_debut, date_heure_fin, jour, type } = req.body;

  // Traitement des informations, par exemple enregistrement dans la base de données

  // Envoyer les informations de confirmation en réponse
  const confirmationData = { nom, prenom, date_heure_debut, date_heure_fin, jour, type };
  res.status(200).json(confirmationData);
});


app.get('/total-tables', (req, res) => {
  const sql = `SELECT COUNT(*) AS totalTable FROM tables_type`;
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération du total de disponibilité des chambres:', err);
          res.status(500).json({ message: 'Erreur lors de la récupération du total de disponibilité des chambres.' });
      } else {
          console.log('Total de disponibilité des chambres récupéré avec succès:', result[0].totalTable);
          res.status(200).json({ totalTable: result[0].totalTable });
      }
  });
});



app.get('/trois_req', (req, res) => {
  let responseData = {};

  // 1 req pour les chambres
  connection.query('SELECT SUM(disponibilite) AS total_disponibilite FROM Chambre_type', (err, resultChambres) => {
    if (err) {
      console.error('Erreur lors de la récupération du total de disponibilité des chambres:', err);
      return res.status(500).json({ message: 'Erreur lors de la récupération du total de disponibilité des chambres.' });
    }
    responseData.total_disponibilite_chambres = resultChambres[0].total_disponibilite;

    // 2 req pour le spa
    connection.query('SELECT sum(id_reservation_spa) FROM hotel_rhk.reservation_spa', (err, resultSpa) => {
      if (err) {
        console.error('Erreur lors de la récupération du total de disponibilité du spa:', err);
        return res.status(500).json({ message: 'Erreur lors de la récupération du total de disponibilité du spa.' });
      }
      responseData.total_disponibilite_spa = resultSpa[0].total_disponibilite;

      // 3 req pour les salles
      connection.query('SELECT COUNT(id_reservation_salle) AS total_reservations From reservation_salle', (err, resultSalles) => {
        if (err) {
          console.error('Erreur lors de la récupération du total de disponibilité des salles:', err);
          return res.status(500).json({ message: 'Erreur lors de la récupération du total de disponibilité des salles.' });
        }
        responseData.total_disponibilite_salles = resultSalles[0].total_disponibilite;

        res.status(200).json(responseData);
      });
    });
  });
});

app.get('/reservation_tables', (req, res) => {
  const sql = `
    SELECT
      CASE
        WHEN HOUR(date_heure_debut) >= 7 AND HOUR(date_heure_debut) < 11 THEN 'Petit-déjeuner'
        WHEN HOUR(date_heure_debut) >= 12 AND HOUR(date_heure_debut) < 15 THEN 'Déjeuner'
        WHEN (HOUR(date_heure_debut) >= 19 AND HOUR(date_heure_debut) <= 23) OR HOUR(date_heure_debut) = 0 THEN 'Dîner'
      END AS periode,
      COUNT(*) AS reservations
    FROM reservation_table
    GROUP BY periode;
  `;
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations.' });
    } else {
      console.log('Réservations récupérées avec succès :', result);
      
      // Transform data to match Chart.js format
      const labels = result.map(row => row.periode);
      const data = result.map(row => row.reservations);
      
      // Sending data to client
      res.status(200).json({ labels, data });
    }
  });
});

// Route GET pour afficher le nombre de lignes dans la table contact
app.get('/nombre_lignes_contact', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM contact';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération du nombre de lignes dans la table contact', err);
      res.status(500).json({ message: 'Erreur lors de la récupération du nombre de lignes dans la table contact.' });
    } else {
      const totalLignes = result[0].total;
      res.status(200).json({ totalLignes });
    }
  });
});

//recuperer la derniere reservation de spa
app.get('/derniere_reservation_spa', (req, res) => {
  const sql = 'SELECT * FROM reservation_spa ORDER BY id_reservation_spa DESC LIMIT 1'; 
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération de la dernière réservation de spa:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération de la dernière réservation.' });
    } else {
      if (result.length > 0) {
        console.log('Dernière réservation récupérée avec succès :', result[0]);
        res.status(200).json(result[0]); 
      } else {
        console.log('Aucune réservation trouvée.');
        res.status(404).json({ message: 'Aucune réservation trouvée.' });
      }
    }
  });
});