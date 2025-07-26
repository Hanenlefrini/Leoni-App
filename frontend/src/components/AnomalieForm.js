import React from "react";
import { Form } from "react-bootstrap";

const AnomalieForm = ({ form, handleChange }) => (
  <>
    <Form.Group className="mb-2">
      <Form.Label>Ligne</Form.Label>
      <Form.Control name="ligne" value={form.ligne} onChange={handleChange} required />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} required />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Date</Form.Label>
      <Form.Control type="datetime-local" name="date" value={form.date} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Gravité</Form.Label>
      <Form.Select name="gravite" value={form.gravite} onChange={handleChange}>
        <option>Faible</option>
        <option>Moyenne</option>
        <option>Critique</option>
      </Form.Select>
    </Form.Group>
  </>
);

export default AnomalieForm;
