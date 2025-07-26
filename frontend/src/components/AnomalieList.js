import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const AnomalieList = ({ anomalies }) => {
  return (
    <Row xs={1} md={2} lg={3}>
      {anomalies.map((a) => (
        <Col key={a.id} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{a.ligne}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Gravité : {a.gravite}</Card.Subtitle>
              <Card.Text>
                {a.description}
                <br />
                <strong>Date :</strong> {new Date(a.date).toLocaleString()}
                <br />
                <strong>Status :</strong> {a.status}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AnomalieList;
