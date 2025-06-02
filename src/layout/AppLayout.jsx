import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet,useNavigate} from 'react-router-dom';
import '../layout/AppLayout.css';

const AppLayout = () => {
    const [keyword,setKeyword] = useState('');
    const navigate = useNavigate();

    const searchByKeyword = (event) =>{
      event.preventDefault();
      if (keyword.trim() !== '') {
        // 검색어가 공백이 아닌 경우에만 검색을 수행합니다.
        navigate(`/video?q=${keyword}`);
      }
    }

    return (
        <div>
            <Navbar expand="lg" className="navContainer">
          <Container fluid>
            <Navbar.Brand href="/">
              <img className = "logo"src='https://images.crowdspring.com/blog/wp-content/uploads/2016/06/27132348/netflix-new-logo.png'/>
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
              <Form className="d-flex" onSubmit={(event)=>searchByKeyword(event)}>
                <Form.Control
                  type="search"
                  placeholder="검색어를 입력해주세요."
                  className="me-2"
                  aria-label="Search"
                  value={keyword}
                  onChange={(event)=>setKeyword(event.target.value)}
                />
                <Button variant="outline-danger" type='submit' style={{ font:'small-caption'}}>Search</Button>
              </Form> 
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
        </div>
        
      );
}

export default AppLayout
