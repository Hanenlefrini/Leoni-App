import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";

function AddAnomalie() {
  const [formData, setFormData] = useState({
    matricule: "",
    description: "",
    ligne: "",
    gravite: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/anomalies`, formData);
      setMessage("Anomalie ajoutée avec succès.");
      setFormData({ matricule: "", description: "", ligne: "", gravite: "" });
    } catch (err) {
      setError("Erreur lors de l'ajout de l'anomalie.");
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4" style={{ color: "#004085" }}>
        Ajouter une Anomalie
      </h3>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Matricule Opérateur</Form.Label>
          <Form.Control
            type="text"
            name="matricule"
            value={formData.matricule}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ligne</Form.Label>
              <Form.Control
                type="text"
                name="ligne"
                value={formData.ligne}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gravité</Form.Label>
              <Form.Select
                name="gravite"
                value={formData.gravite}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner</option>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Critique">Critique</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </Form>
    </Container>
  );
}

export default AddAnomalie;
