import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button, Alert, Spinner } from "react-bootstrap";

function DashboardTechnicien() {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateStatus, setUpdateStatus] = useState({}); // {id: { status }}

  // Récupérer l'id technicien connecté
  const technicienId = localStorage.getItem("technicienId");

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        // Récupérer uniquement anomalies assignées à ce technicien
        const res = await axios.get(`http://localhost:3000/api/anomalies?technicienId=${technicienId}`);
        setAnomalies(res.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des anomalies.");
        setLoading(false);
      }
    };

    if (technicienId) {
      fetchAnomalies();
    } else {
      setError("Technicien non identifié. Veuillez vous reconnecter.");
      setLoading(false);
    }
  }, [technicienId]);

  const handleChange = (id, field, value) => {
    setUpdateStatus((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    if (!updateStatus[id]) return;

    try {
      // Ici on ne permet que la mise à jour du statut
      await axios.put(`http://localhost:3000/api/anomalies/${id}`, {
        status: updateStatus[id].status,
      });

      setAnomalies((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status: updateStatus[id].status,
              }
            : a
        )
      );

      setUpdateStatus((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setError("");
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="mt-4">
      <h3 style={{ color: "#004085" }}>Dashboard Technicien</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Numéro Intervention</th>
            <th>Matricule Opérateur</th>
            <th>Description</th>
            <th>Ligne</th>
            <th>Date Ouverture</th>
            <th>Statut</th>
            <th>Date Fermeture</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((a) => (
            <tr
              key={a.id}
              className={
                a.status === "Ouvert"
                  ? "table-danger"
                  : a.status === "En cours"
                  ? "table-warning"
                  : a.status === "Résolu" || a.status === "Fermé"
                  ? "table-success"
                  : ""
              }
            >
              <td>{a.id}</td>
              <td>{a.matricule}</td>
              <td>{a.description}</td>
              <td>{a.ligne}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>
                <Form.Select
                  value={updateStatus[a.id]?.status ?? a.status}
                  onChange={(e) => handleChange(a.id, "status", e.target.value)}
                >
                  <option value="Ouvert">Ouvert</option>
                  <option value="En cours">En cours</option>
                  <option value="Résolu">Résolu</option>
                  <option value="Fermé">Fermé</option>
                </Form.Select>
              </td>
              <td>
                {a.status === "Résolu" || a.status === "Fermé"
                  ? new Date().toLocaleDateString()
                  : "-"}
              </td>
              {/* Pas d'édition technicien ni bouton "Sauvegarder" pour garder simple */}
              <td>
                <Button variant="success" size="sm" onClick={() => handleSave(a.id)}>
                  Sauvegarder
                </Button>
              </td>
            </tr>
          ))}
          {anomalies.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                Aucune anomalie assignée.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default DashboardTechnicien;
