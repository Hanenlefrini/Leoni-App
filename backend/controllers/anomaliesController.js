const { Anomalie, Technicien } = require('../models');

exports.create = async (req, res) => {
  try {
    // Récupérer uniquement les champs utiles envoyés par le frontend
    const { matricule, ligne, description, gravite } = req.body;

    if (!matricule || !ligne || !description || !gravite) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    const nouvelleAnomalie = await Anomalie.create({
      matricule,
      ligne,
      description,
      gravite,
      status: 'Ouvert',  // valeur par défaut
      date: new Date(),
      technicienId: null, // pas assigné encore
    });

    res.status(201).json(nouvelleAnomalie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de l\'anomalie.' });
  }
};

// Récupérer toutes les anomalies avec infos technicien
exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.technicienId) {
      where.technicienId = req.query.technicienId;
    }

    const anomalies = await Anomalie.findAll({
      where,
      include: {
        model: Technicien,
        as: "technicien",
        attributes: ["id", "nom", "prenom", "matricule"],
      },
      order: [["date", "DESC"]],
    });

    res.json(anomalies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des anomalies." });
  }
};


// Récupérer une anomalie par id avec technicien
exports.getOne = async (req, res) => {
  try {
    const anomalie = await Anomalie.findByPk(req.params.id, {
      include: {
        model: Technicien,
        as: "technicien",
        attributes: ["id", "nom", "prenom", "matricule"],
      },
    });
    if (!anomalie) return res.status(404).json({ error: "Anomalie non trouvée." });
    res.json(anomalie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'anomalie." });
  }
};

// Mettre à jour une anomalie (status, technicienId, etc.)
exports.update = async (req, res) => {
  try {
    const anomalie = await Anomalie.findByPk(req.params.id);
    if (!anomalie) return res.status(404).json({ error: "Anomalie non trouvée." });

    const { ligne, description, gravite, status, technicienId } = req.body;

    if (ligne !== undefined) anomalie.ligne = ligne;
    if (description !== undefined) anomalie.description = description;
    if (gravite !== undefined) anomalie.gravite = gravite;
    if (status !== undefined) anomalie.status = status;
    if (technicienId !== undefined) anomalie.technicienId = technicienId;

    await anomalie.save();
    res.json(anomalie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erreur lors de la mise à jour de l'anomalie." });
  }
};

// Supprimer une anomalie
exports.delete = async (req, res) => {
  try {
    const anomalie = await Anomalie.findByPk(req.params.id);
    if (!anomalie) return res.status(404).json({ error: "Anomalie non trouvée." });

    await anomalie.destroy();
    res.json({ message: "Anomalie supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'anomalie." });
  }
};
