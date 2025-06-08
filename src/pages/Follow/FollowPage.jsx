import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Col, Form, Row, Alert, Spinner, InputGroup, Button } from 'react-bootstrap';
import api2 from '../../utils/api2';
import { useNavigate } from 'react-router-dom';

const FollowPage = () => {
  const [followings, setFollowings] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [message, setMessage] = useState(null);
  const [userIdToFollow, setUserIdToFollow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api2.get('/users/me');
        const followingRes = await api2.get(`/users/${res.data.id}/followings`);
        const followersRes = await api2.get(`/users/${res.data.id}/followers`);
        setFollowings(followingRes.data || []);
        setFollowers(followersRes.data || []);
      } catch (err) {
        setMessage('❌ 팔로잉 및 팔로워 정보를 불러오지 못했습니다.');
      }
    };
    fetchData();
  }, []);

  if (followings === null || followers === null) {
    return (              
      <Spinner animation="border" variant="light" />
    )
  }

  const handleFollow = () => {
    if (!userIdToFollow || userIdToFollow.trim() === "") {
      return;
    }

    api2.post(`/users/${userIdToFollow}/follows`)
      .then(() => {
        setUserIdToFollow(null);
        window.location.reload(); // 현재 페이지를 새로고침
      })
      .catch(err => {
        setMessage(`❌ 팔로우 등록에 실패했습니다: ${ err.response?.data || err.message}`);
      });
  }

  return (
    <Container className="py-5">
      <h3 className="text-white mb-4">👤 팔로잉 및 팔로워</h3>
      {message && <Alert variant="danger">{message}</Alert>}
      
      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="팔로우할 사용자 ID 입력"
            value={userIdToFollow}
            onChange={(e) => setUserIdToFollow(e.target.value)}
          />
          <Button variant="danger" onClick={handleFollow}>
            팔로우
          </Button>
        </InputGroup>
      </Form>

      <Row>
        <Col md={6}>
          <h5 className="text-white mb-3">팔로잉</h5>
          <ListGroup>
            {followings.length > 0 ? (
              followings.map(user => (
                <ListGroup.Item className="bg-dark text-white" key={user.id}>
                  {user.name}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-white">팔로잉이 존재하지 않습니다.</p>
            )}
          </ListGroup>
        </Col>

        <Col md={6}>
          <h5 className="text-white mb-3">팔로워</h5>
          <ListGroup>
            {followers.length > 0 ? (
              followers.map(user => (
                <ListGroup.Item className="bg-dark text-white" key={user.id}>
                  {user.name}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-white">팔로워가 존재하지 않습니다.</p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FollowPage;
