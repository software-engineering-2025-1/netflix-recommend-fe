import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container, Button } from 'react-bootstrap';
import '../Person/PersonPage.style.css';
import VideoCard from '../../common/MovieCard/VideoCard';
import ReactPaginate from 'react-paginate';
import api2 from '../../utils/api2';

const PAGE_SIZE = 10;

const PersonRecommendPage2 = () => {
  const [page, setPage] = useState(1);
  const [recommend, setRecommend] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const response = await api2.get('/users/me/recommend');
        setRecommend(response.data);
      } catch (error) {
        console.error('추천 정보 요청 실패:', error);
        alert('추천 정보를 불러오지 못했습니다.');
      }
    };

    fetchRecommend();
  }, []);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const toMoveHistory = () => navigate('/');
  const toMoveRecommend = () => navigate('/recommend');

  const pageCount = Math.ceil((recommend?.length || 0) / PAGE_SIZE);
  const displayData = (recommend || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Container className='SortButton my-3'>
            <Button variant='danger' onClick={toMoveHistory} className='me-2'>
              Watched Video
            </Button>
            <Button variant='danger' onClick={toMoveRecommend}>
              Recommend Video
            </Button>
          </Container>
        </Col>
        <Col lg={8} xs={12} className='MovieBox'>
          {displayData.length === 0 ? (
            <h4 className="NoGenre text-info">추천된 동영상이 없습니다.</h4>
          ) : (
            <>
              <Row>
                {displayData.map((item) => (
                  <Col key={item.id} lg={4} xs={8} className='mb-4'>
                    <VideoCard title={item.title} />
                  </Col>
                ))}
              </Row>
              <div className='paginationContainer d-flex justify-content-center mt-4'>
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  forcePage={page - 1}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonRecommendPage2;
