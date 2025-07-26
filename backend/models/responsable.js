module.exports = (sequelize, DataTypes) => {
  const Responsable = sequelize.define("Responsable", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Responsable;
};
