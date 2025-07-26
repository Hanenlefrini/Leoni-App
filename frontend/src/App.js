import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAnomalie from "./pages/AddAnomalie";
import PrivateRoute from "./components/PrivateRoute";
import ResponsableRoute from "./components/ResponsableRoute";
import TechnicienPage from "./pages/TechnicienPage"; // 👈 nouveau composant
import DashboardTechnicien from "./pages/DashboardTechnicien";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [technicienId, setTechnicienId] = useState(localStorage.getItem("technicienId") || 0 );


  const NavigationBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("technicienId");
      setToken("");
      navigate("/login");
    };

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            LEONI Tunisia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Accueil</Nav.Link>
              <Nav.Link as={Link} to="/add-anomalie">Ajouter Anomalie</Nav.Link>
              {token && technicienId == 0 &&  (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/techniciens">Techniciens</Nav.Link> 
                </>
              )}
              {token &&  technicienId != 0 &&  (
                <>
                  <Nav.Link as={Link} to="/dashboard-technicien">Dashboard</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {!token ? (
                <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={handleLogout}>
                  Déconnexion
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/add-anomalie" element={<AddAnomalie />} />
        <Route
          path="/dashboard"
          element={
            <ResponsableRoute>
              <Dashboard />
            </ResponsableRoute>
          }
        />
        <Route path="/dashboard-technicien" element={
    <PrivateRoute>
<DashboardTechnicien />
    </PrivateRoute>
      
    
  } />
        <Route
          path="/techniciens"
          element={
            <PrivateRoute>
              <TechnicienPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
