import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import PersonHistorySection from './Section/PersonHistorySection';
import PersonRecommendSection from './Section/PersonRecommendSection';

const PersonMediaPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container className="my-4">
      <Row>
        <Col lg={4} xs={12}>x``
          <h3 className="text-white mb-4">🎬 나의 콘텐츠</h3>
          <Container className="SortButton">
            <Button
              variant={activeTab === 'history' ? 'danger' : 'outline-danger'}
              onClick={() => setActiveTab('history')}
            >
              Watched Video
            </Button>
            <Button
              variant={activeTab === 'recommend' ? 'danger' : 'outline-danger'}
              onClick={() => setActiveTab('recommend')}
              className="ms-2"
            >
              Recommend Video
            </Button>
          </Container>
        </Col>

        <Col lg={8} xs={12}>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <p className="text-white">Loading...</p>}

          {activeTab === 'history' && (
            <PersonHistorySection setLoading={setLoading} setError={setError} />
          )}
          {activeTab === 'recommend' && (
            <PersonRecommendSection setLoading={setLoading} setError={setError} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonMediaPage;
