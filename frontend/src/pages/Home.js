import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import leoniImg from "./assets/leoniImg.png"; // adapte le chemin

function Home() {
  return (
    <>
      <div
        className="header-bg"
        style={{
          backgroundImage: `url(${leoniImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "30px 50px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h1>LEONI Tunisia — Suivi des anomalies</h1>
          <p>Production & Qualité – Suivi en temps réel</p>
<Button as={Link} to="/login" variant="light" size="lg" className="mt-3">
  Se connecter
</Button>

        </div>
      </div>

      <Container className="mt-5">
        <div className="section">
          <h4>Bienvenue sur la plateforme de suivi des anomalies</h4>
          <p>Veuillez vous connecter pour accéder aux fonctionnalités complètes.</p>
        </div>
      </Container>
    </>
  );
}

export default Home;
