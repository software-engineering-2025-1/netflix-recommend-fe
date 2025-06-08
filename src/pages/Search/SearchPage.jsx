import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { customStyles, customTheme, DropdownIndicator } from '../Setting/Table/reactSelectStyles';
import Select from 'react-select';
import { genreOptions } from '../../constants/genreOptions';
import { videoTypeOptions } from '../../constants/videoTypeOptions';
import { rateOptions } from '../../constants/rateOptions';

const SearchPage = () => {
  const [keyword, setKeyword] = useState(null);
  const [genre, setGenre] = useState(null);
  const [videoType, setVideoType] = useState(null);
  const [rate, setRate] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (keyword || (keyword && keyword.trim() !== '') || genre || videoType || rate) {
      navigate(`/video?rate=${rate?.value || ''}&genre=${genre?.value || ''}&type=${videoType?.value || ''}&keyword=${keyword || ''}`);
    }
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSearch}>
        <div className="d-flex me-3">
          <Form.Control
            type="search"
            placeholder="검색어를 입력해주세요."
            className="me-2"
            aria-label="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <Form.Group className="mt-4 d-flex align-items-center">
          <Form.Label className="fw-semibold me-2 mb-0" style={{ width: "80px", color: "#fff" }}>
            장르
          </Form.Label>
          <div style={{ minWidth: "200px", flexGrow: 1 , marginRight: '100px'}}>
            <Select
              value={genre}
              onChange={setGenre}
              options={genreOptions}
              styles={customStyles}
              theme={customTheme}
              components={{ DropdownIndicator }}
              placeholder="장르를 선택하세요"
              isClearable
            />
          </div>
        </Form.Group>

        <Form.Group className="mt-4 d-flex align-items-center">
          <Form.Label className="fw-semibold me-2 mb-0" style={{ width: "80px", color: "#fff" }}>
            연령 제한
          </Form.Label>
          <div style={{ minWidth: "200px", flexGrow: 1 , marginRight: '100px'}}>
            <Select
              value={rate}
              onChange={setRate}
              options={rateOptions}
              styles={customStyles}
              theme={customTheme}
              components={{ DropdownIndicator }}
              placeholder="연령 제한을 선택하세요"
              isClearable
            />
          </div>
        </Form.Group>

        <Form.Group className="mt-4 d-flex align-items-center">
          <Form.Label className="fw-semibold me-2 mb-0" style={{ width: "80px", color: "#fff" }}>
            유형
          </Form.Label>
          <div style={{ minWidth: "200px", flexGrow: 1 , marginRight: '100px'}}>
            <Select
              value={videoType}
              onChange={setVideoType}
              options={videoTypeOptions}
              styles={customStyles}
              theme={customTheme}
              components={{ DropdownIndicator }}
              placeholder="유형을 선택하세요"
              isClearable
            />
          </div>
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="outline-danger" type="submit" className="w-50 mt-5">
            Search
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SearchPage;
