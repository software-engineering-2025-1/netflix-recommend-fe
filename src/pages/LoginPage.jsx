import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFilm } from 'react-icons/fa';

const SERVER_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const KAKAO_AUTH_URL = `${SERVER_BASE_URL}/oauth2/authorization/kakao`;

function LoginPage() {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100 justify-content-center">
          <Col xs={10} md={6} lg={4}>
            <div className="mb-4">
              <FaFilm size={50} color="#d81f26" className="mb-3" />
              <h2 className="fw-bold" style={{ color: '#d81f26' }}>Netflix Recommend</h2>
              <p style={{color: 'white'}}>카카오로 간편하게 로그인하세요</p>
            </div>
            <Button
              onClick={handleLogin}
              style={{
                backgroundColor: '#fee500',
                color: '#000',
                fontWeight: 'bold',
                borderRadius: '30px',
                border: 'none',
              }}
              className="w-100 py-2"
            >
              카카오로 로그인
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
