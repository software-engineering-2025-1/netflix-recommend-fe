import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api2 from '../../utils/api2';

const GroupSearchPage = () => {
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const res = await api2.get('/groups/me');
        setGroups(res.data);
        setMessage('');
      } catch (err) {
        setMessage('❌ 그룹 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyGroups();
  }, []);

  const handleGroupSelect = (group) => {
    navigate(`/groups/${group.id}/movies?groupName=${encodeURIComponent(group.name)}`);
  };

  return (
    <Container className="my-5">
      <h3 className="text-white mb-4">👥 내가 속한 그룹 목록</h3>

      {message && <Alert variant="danger">{message}</Alert>}

      {loading ? (
        <div className="text-center text-white">
          <Spinner animation="border" variant="light" />
        </div>
      ) : groups.length === 0 ? (
        <Alert variant="warning">⚠️ 가입한 그룹이 없습니다.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {groups.map((group) => (
            <Col key={group.id}>
              <Card className="h-100 bg-dark text-white border-light shadow-sm group-card">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{group.name}</Card.Title>
                  <Button
                    variant="outline-light"
                    className="mt-3"
                    size="sm"
                    onClick={() => handleGroupSelect(group)}
                  >
                    이동
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GroupSearchPage;
