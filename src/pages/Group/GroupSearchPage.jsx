import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api2 from '../../utils/api2';

const GroupSearchPage = () => {
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api2.get('/users/me');
        setCurrentUserId(res.data.id);
      } catch (err) {
        setMessage('❌ 사용자 정보를 불러오지 못했습니다.');
      }
    };
    fetchUser();
  }, []);

  const handleCheckMembership = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // 1. 그룹 검색
      const searchRes = await api2.get(`/groups?keyword=${encodeURIComponent(groupName)}`);
      const foundGroup = searchRes.data.find((g) => g.name === groupName);

      if (!foundGroup) {
        setMessage('❌ 해당 이름의 그룹을 찾을 수 없습니다.');
        return;
      }

      // 2. 그룹 상세 조회
      const detailRes = await api2.get(`/groups/${foundGroup.id}`);
      const memberIds = detailRes.data.members.map((m) => m.id);

      // 3. 현재 유저가 포함되어 있는지 확인
      if (memberIds.includes(currentUserId)) {
        navigate(`/groups/${foundGroup.id}/movies?groupName=${encodeURIComponent(groupName)}`);

      } else {
        setMessage('❌ 해당 그룹에 속해 있지 않습니다.');
      }
    } catch (error) {
      setMessage('❌ 그룹 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container className="my-5">
      <h3 className="text-white mb-4">🔎 그룹 검색 및 이동</h3>

      {message && <Alert variant={message.includes('✅') ? 'success' : 'danger'}>{message}</Alert>}

      <Form onSubmit={handleCheckMembership}>
        <Form.Group>
          <Form.Label className="text-white fw-semibold">그룹 이름</Form.Label>
          <Form.Control
            placeholder="예: 영화 덕후들"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          그룹 이동
        </Button>
      </Form>
    </Container>
  );
};

export default GroupSearchPage;
