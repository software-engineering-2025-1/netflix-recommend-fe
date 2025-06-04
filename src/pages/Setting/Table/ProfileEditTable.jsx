import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import Select from 'react-select';
import api2 from '../../../utils/api2';
import { countryOptions } from '../../../constants/countryOptions';
import { genreOptions } from '../../../constants/genreOptions';
import {
  customStyles,
  customTheme,
  DropdownIndicator,
  MultiValueRemove,
} from './reactSelectStyles';



const ProfileEditTable = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState(null);
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    console.log("현재 country:", country);
    try {
      await api2.put('/users/me', {
        name,
        age: parseInt(age),
        country: country?.value || '',
        genres: genres.map((g) => g.value),
      });
      setMessage('✅ 개인 정보가 수정되었습니다.');
    } catch (error) {
      console.log({
        name,
        age: parseInt(age),
        country: country?.value || '',
        genres: genres.map((g) => g.value),
      });
      setMessage('❌ 수정 실패');
    }
  };

  return (
    <Card bg="dark" text="light" className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">✏️ 개인 정보 수정</Card.Title>

        {message && (
          <Alert variant={message.includes('✅') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">이름</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">나이</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="나이를 입력하세요"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">국가</Form.Label>
            <Select
              value={country}
              onChange={setCountry}
              options={countryOptions}
              styles={customStyles}
              theme={customTheme}
              components={{ DropdownIndicator }}
              placeholder="국가를 선택하세요"
              isClearable
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">선호 장르</Form.Label>
            <Select
              value={genres}
              onChange={setGenres}
              options={genreOptions}
              isMulti
              styles={customStyles}
              theme={customTheme}
              components={{ DropdownIndicator, MultiValueRemove }}
              placeholder="장르를 선택하세요"
              closeMenuOnSelect={false}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdateProfile}>
            저장하기
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileEditTable;
