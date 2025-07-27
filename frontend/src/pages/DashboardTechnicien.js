import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Alert } from "react-bootstrap";

const DashboardTechnicien = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [error, setError] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({}); // { id: "nouveau statut" }
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const token = localStorage.getItem("token");
        const technicienId = localStorage.getItem("technicienId");

        if (!technicienId) {
          setError("Technicien non connecté.");
          return;
        }

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/anomalies?technicienId=${technicienId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnomalies(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des anomalies.");
      }
    };

    fetchAnomalies();
  }, []);

  const handleStatusChange = (id, value) => {
    setStatusUpdate((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveStatus = async (id) => {
    const newStatus = statusUpdate[id];
    if (!newStatus) return;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/anomalies/${id}`,
        {
          status: newStatus,
          dateFermeture:
            newStatus === "Résolu" || newStatus === "Fermé"
              ? new Date()
              : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnomalies((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a
        )
      );

      setSuccessMessage("Statut mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Dashboard Technicien</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Description</th>
            <th>Date</th>
            <th>Gravité</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((anom) => (
            <tr key={anom.id}>
              <td>{anom.id}</td>
              <td>{anom.description}</td>
              <td>{new Date(anom.date).toLocaleString()}</td>
              <td>{anom.gravite}</td>
              <td>
                <Form.Select
                  value={statusUpdate[anom.id] || anom.status}
                  onChange={(e) =>
                    handleStatusChange(anom.id, e.target.value)
                  }
                >
                  <option value="Ouvert">Ouvert</option>
                  <option value="En cours">En cours</option>
                  <option value="Résolu">Résolu</option>
                  <option value="Fermé">Fermé</option>
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSaveStatus(anom.id)}
                >
                  Sauvegarder
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DashboardTechnicien;
