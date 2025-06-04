import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import '../layout/AppLayout.css';
import { logout, isLoggedIn } from '../utils/auth'; // 인증 유틸 import

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 최초 렌더링 시 로그인 상태 확인
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (keyword.trim() !== '') {
      navigate(`/video?q=${keyword}`);
    }
  };

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다');
    setLoggedIn(false);         // 상태 업데이트
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Navbar expand="lg" className="navContainer">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              className="logo"
              src="https://images.crowdspring.com/blog/wp-content/uploads/2016/06/27132348/netflix-new-logo.png"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Person</Nav.Link>
              <Nav.Link href="/group">Group</Nav.Link>
              <Nav.Link href="/setting">Setting</Nav.Link>
            </Nav>
            <Form className="d-flex me-3" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="검색어를 입력해주세요."
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
            {loggedIn ? (
              <Button variant="danger" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <Button variant="outline-success" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
