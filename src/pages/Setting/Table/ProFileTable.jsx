import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Row, Col, Badge } from 'react-bootstrap';
import api2 from '../../../utils/api2';

const ProfileTable = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api2.get('/users/me');
        setProfile(response.data);
      } catch (err) {
        setError('❌ 사용자 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h5 className="text-white mb-4">👤 개인 정보</h5>
      <Row className="mb-3">
        <Col xs={4} className="text-white fw-semibold">이름</Col>
        <Col className="text-white">{profile.name || '정보 없음'}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4} className="text-white fw-semibold">나이</Col>
        <Col className="text-white">{profile.age || '정보 없음'}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4} className="text-white fw-semibold">국가</Col>
        <Col className="text-white">{profile.country || '정보 없음'}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4} className="text-white fw-semibold">선호 장르</Col>
        <Col>
          {profile.genres && profile.genres.length > 0 ? (
            profile.genres.map((genre, index) => (
              <Badge key={index} bg="secondary" className="me-1">{genre}</Badge>
            ))
          ) : (
            <span className="text-white">정보 없음</span>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileTable;
