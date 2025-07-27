import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Modal, Alert } from 'react-bootstrap';

function GestionTechniciens() {
  const [techniciens, setTechniciens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nom: '', prenom: '', matricule: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTechniciens();
  }, []);

  const fetchTechniciens = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/techniciens`);
      setTechniciens(res.data);
      setLoading(false);
    } catch {
      setError('Erreur lors du chargement des techniciens');
      setLoading(false);
    }
  };

  const handleShowAdd = () => {
    setFormData({ nom: '', prenom: '', matricule: '' });
    setEditId(null);
    setShowModal(true);
    setError('');
  };

  const handleShowEdit = (technicien) => {
    setFormData({
      nom: technicien.nom,
      prenom: technicien.prenom,
      matricule: technicien.matricule,
    });
    setEditId(technicien.id);
    setShowModal(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/techniciens/${id}`);
      setTechniciens((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, matricule } = formData;
    if (!nom || !prenom || !matricule) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    try {
      if (editId) {
        // Modifier
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/techniciens/${editId}`, formData);
        setTechniciens((prev) => prev.map((t) => (t.id === editId ? res.data : t)));
      } else {
        // Ajouter
        const res = await axios.post('${process.env.REACT_APP_API_URL}/api/techniciens', formData);
        setTechniciens((prev) => [...prev, res.data]);
      }
      setShowModal(false);
      setError('');
    } catch {
      setError('Erreur lors de l\'enregistrement');
    }
  };

  return (
    <Container className="mt-4">
      <h3>Gestion des Techniciens</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button onClick={handleShowAdd} className="mb-3">Ajouter un technicien</Button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {techniciens.map((t) => (
              <tr key={t.id}>
                <td>{t.nom}</td>
                <td>{t.prenom}</td>
                <td>{t.matricule}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShowEdit(t)} className="me-2">Modifier</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Modifier Technicien' : 'Ajouter Technicien'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Matricule</Form.Label>
              <Form.Control type="text" name="matricule" value={formData.matricule} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">{editId ? 'Modifier' : 'Ajouter'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default GestionTechniciens;
