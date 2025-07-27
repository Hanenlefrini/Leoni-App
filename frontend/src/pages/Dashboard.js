import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button, Alert, Spinner } from "react-bootstrap";

function Dashboard() {
  const [anomalies, setAnomalies] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateStatus, setUpdateStatus] = useState({}); // {id: { technicienId }}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [anomaliesRes, techniciensRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/anomalies`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/techniciens`),
        ]);
        setAnomalies(anomaliesRes.data);
        setTechniciens(techniciensRes.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (id, value) => {
    setUpdateStatus((prev) => ({
      ...prev,
      [id]: {
        technicienId: value,
      },
    }));
  };

  const handleSave = async (id) => {
    if (!updateStatus[id]) return;

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/anomalies/${id}`, {
        technicienId: updateStatus[id].technicienId,
      });
      setAnomalies((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                technicien: techniciens.find(
                  (t) => t.id === Number(updateStatus[id].technicienId)
                ),
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
      <h3 style={{ color: "#004085" }}>Dashboard Responsable</h3>
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
            <th>Technicien Assigné</th>
            <th>Actions</th>
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
              <td>{a.status}</td>
              <td>
                {a.status === "Résolu" || a.status === "Fermé"
                  ? new Date().toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <Form.Select
                  value={
                    updateStatus[a.id]?.technicienId ??
                    (a.technicien ? a.technicien.id : "")
                  }
                  onChange={(e) =>
                    handleChange(a.id, e.target.value)
                  }
                >
                  <option value="">Non assigné</option>
                  {techniciens.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nom} {t.prenom}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button variant="success" size="sm" onClick={() => handleSave(a.id)}>
                  Sauvegarder
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
