const { Technicien } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const techniciens = await Technicien.findAll({
      attributes: ['id', 'nom', 'prenom', 'matricule'],
    });
    res.json(techniciens);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des techniciens' });
  }
};

exports.login = async (req, res) => {
  try {
    const { prenom, matricule } = req.body;
    if (!prenom || !matricule) {
      return res.status(400).json({ error: 'Prénom et matricule sont obligatoires.' });
    }

    const technicien = await Technicien.findOne({
      where: { prenom, matricule },
      attributes: ['id', 'nom', 'prenom', 'matricule'],
    });

    if (!technicien) {
      return res.status(401).json({ error: 'Prénom ou matricule incorrect.' });
    }

    // Ici on pourrait générer un token JWT (optionnel), sinon juste renvoyer les infos
    res.json({ message: 'Authentification réussie', technicien });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'authentification.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nom, prenom, matricule } = req.body;
    if (!nom || !prenom || !matricule) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }
    const newTechnicien = await Technicien.create({ nom, prenom, matricule });
    res.status(201).json(newTechnicien);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du technicien' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, matricule } = req.body;
    const technicien = await Technicien.findByPk(id);
    if (!technicien) return res.status(404).json({ error: 'Technicien non trouvé' });

    if (nom !== undefined) technicien.nom = nom;
    if (prenom !== undefined) technicien.prenom = prenom;
    if (matricule !== undefined) technicien.matricule = matricule;

    await technicien.save();
    res.json(technicien);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du technicien' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const technicien = await Technicien.findByPk(id);
    if (!technicien) return res.status(404).json({ error: 'Technicien non trouvé' });

    await technicien.destroy();
    res.json({ message: 'Technicien supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du technicien' });
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const technicien = await Technicien.findByPk(id, {
      attributes: ['id', 'nom', 'prenom', 'matricule']
    });

    if (!technicien) {
      return res.status(404).json({ error: 'Technicien non trouvé' });
    }

    res.json(technicien);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du technicien' });
  }
};
