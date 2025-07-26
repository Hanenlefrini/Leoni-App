const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Responsable } = require("../models");
const { Technicien } = require('../models');
const JWT_SECRET = "dev_secret";

//  Route de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Responsable.findOne({ where: { username } });

  if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "2h"
  });

  res.json({ token });
});


router.post('/loginTechnicien', async (req, res) => {
  try {
    const { prenom, matricule } = req.body;
    if (!prenom || !matricule) {
      return res.status(400).json({ message: "Prénom et matricule sont requis" });
    }

    const technicien = await Technicien.findOne({
      where: { prenom, matricule }
    });

    if (!technicien) {
      return res.status(401).json({ message: "Technicien non trouvé" });
    }

    // Générer token JWT
    const token = jwt.sign(
      { id: technicien.id, role: 'technicien', prenom: technicien.prenom },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;

