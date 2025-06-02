import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api2 from '../../../utils/api2';

const ProfileEditTable = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await api2.put('/users/me', {
        name,
        age,
        country,
        genres,
      });
      setMessage('✅ 개인 정보가 수정되었습니다.');
    } catch (error) {
      setMessage('❌ 수정 실패');
    }
  };

  return (
    <div>
      <h5 className="text-white">👤 개인 정보 수정</h5>
      {message && <Alert variant={message.includes('✅') ? 'success' : 'danger'}>{message}</Alert>}
      <Form className="mb-4">
        <Form.Group>
          <Form.Label className="text-white fw-semibold">이름</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white fw-semibold">나이</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white fw-semibold">국가</Form.Label>
          <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white fw-semibold">선호 장르 (쉼표로 구분)</Form.Label>
          <Form.Control
            value={genres.join(',')}
            onChange={(e) =>
              setGenres(
                e.target.value
                  .split(',')
                  .map((g) => g.trim())
                  .filter((g) => g.length > 0)
              )
            }
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" onClick={handleUpdateProfile}>
          개인 정보 수정
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEditTable;
