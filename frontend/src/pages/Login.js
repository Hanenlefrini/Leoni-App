import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState(null);
  const [formRespo, setFormRespo] = useState({ username: "", password: "" });
  const [formTech, setFormTech] = useState({ prenom: "", matricule: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChangeRespo = (e) =>
    setFormRespo({ ...formRespo, [e.target.name]: e.target.value });

  const handleChangeTech = (e) =>
    setFormTech({ ...formTech, [e.target.name]: e.target.value });

  const handleSubmitRespo = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formRespo);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Identifiants responsables invalides");
    }
  };

  const handleSubmitTech = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const resInfo = await axios.post("http://localhost:3000/api/techniciens/login", formTech);
      localStorage.setItem("technicienId", resInfo.data.technicien.id);

      const resToken = await axios.post("http://localhost:3000/api/auth/loginTechnicien", formTech);
      localStorage.setItem("token", resToken.data.token);
      onLogin(resToken.data.token);
      navigate("/dashboard-technicien");
    } catch {
      setError("Identifiants technicien invalides");
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Connexion</h2>

      <div className="role-switch">
        <button
          className={role === "responsable" ? "active" : ""}
          onClick={() => {
            setRole("responsable");
            setError("");
          }}
        >
          Responsable
        </button>
        <button
          className={role === "technicien" ? "active" : ""}
          onClick={() => {
            setRole("technicien");
            setError("");
          }}
        >
          Technicien
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {role === "responsable" && (
        <form onSubmit={handleSubmitRespo}>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Nom d’utilisateur"
            value={formRespo.username}
            onChange={handleChangeRespo}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            value={formRespo.password}
            onChange={handleChangeRespo}
            required
          />
          <button type="submit" className="btn-submit">Se connecter</button>
        </form>
      )}

      {role === "technicien" && (
        <form onSubmit={handleSubmitTech}>
          <input
            type="text"
            name="prenom"
            className="form-control"
            placeholder="Prénom"
            value={formTech.prenom}
            onChange={handleChangeTech}
            required
          />
          <input
            type="text"
            name="matricule"
            className="form-control"
            placeholder="Matricule"
            value={formTech.matricule}
            onChange={handleChangeTech}
            required
          />
          <button type="submit" className="btn-submit">Se connecter</button>
        </form>
      )}
    </div>
  );
};

export default Login;
