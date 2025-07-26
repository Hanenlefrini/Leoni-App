const express = require("express");
const cors = require("cors");
const app = express();

const anomaliesRoutes = require("./routes/anomalies");
const authRoutes = require("./routes/auth");
const techniciensRoutes = require("./routes/techniciens"); // ✅ AJOUT ICI

app.use(cors());
app.use(express.json());

app.use("/api/anomalies", anomaliesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/techniciens", techniciensRoutes); // 

module.exports = app;
