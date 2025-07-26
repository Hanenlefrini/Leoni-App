const app = require("./app");
const db = require("./models");
const bcrypt = require("bcryptjs");
const { Responsable } = require("./models");

const PORT = 3000;

db.sequelize.sync().then(async () => {
  const existing = await Responsable.findOne({ where: { username: "admin" } });
  if (!existing) {
    const hashed = await bcrypt.hash("hanenlefrini", 10);
    await Responsable.create({
      username: "admin",
      password: hashed,
    });
    console.log("✅ Utilisateur admin créé");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
  });
});
