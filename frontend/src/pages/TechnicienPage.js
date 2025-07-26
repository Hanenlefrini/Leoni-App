// src/pages/TechnicienPage.js
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const TechnicienPage = () => {
  const [techniciens, setTechniciens] = useState([]);
  const [form, setForm] = useState({ nom: "", prenom: "", matricule: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTechniciens = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/techniciens");
      setTechniciens(response.data);
    } catch (err) {
      console.error("Erreur de récupération des techniciens", err);
    }
  };

  useEffect(() => {
    fetchTechniciens();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/techniciens/${editingId}`, form);
      } else {
        await axios.post("http://localhost:3000/api/techniciens", form);
      }
      setForm({ nom: "", prenom: "", matricule: "" });
      setEditingId(null);
      fetchTechniciens();
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire", err);
    }
  };

  const handleEdit = (tech) => {
    setForm({ nom: tech.nom, prenom: tech.prenom, matricule: tech.matricule });
    setEditingId(tech.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/techniciens/${id}`);
      fetchTechniciens();
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Techniciens</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col>
            <Form.Control
              placeholder="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Prénom"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Matricule"
              name="matricule"
              value={form.matricule}
              onChange={handleChange}
              required
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant={editingId ? "warning" : "primary"}>
              {editingId ? "Modifier" : "Ajouter"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matricule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {techniciens.map((tech) => (
            <tr key={tech.id}>
              <td>{tech.id}</td>
              <td>{tech.nom}</td>
              <td>{tech.prenom}</td>
              <td>{tech.matricule}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(tech)} className="me-2">
                  Modifier
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(tech.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TechnicienPage;
