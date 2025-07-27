import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // ou ton fichier css

const NavigationBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("technicienId");
    setToken("");
    navigate("/login");
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Leoni Factory</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            {token && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            <Nav.Link as={Link} to="/add-anomalie">Ajouter Anomalie</Nav.Link>
            {token && <Nav.Link as={Link} to="/techniciens">Gestion Techniciens</Nav.Link>}
          </Nav>
          <Nav>
            {!token ? (
              <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
            ) : (
              <Button variant="outline-light" onClick={handleLogout}>Déconnexion</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
