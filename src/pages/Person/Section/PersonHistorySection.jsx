import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import api2 from '../../../utils/api2';
import VideoCard from '../../../common/MovieCard/VideoCard';

const PAGE_SIZE = 10;

const PersonHistorySection = ({ setLoading, setError }) => {
  const [histories, setHistories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api2.get('/users/me');
        setHistories(res.data.histories || []);
      } catch (err) {
        setError('❌ 시청 기록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pageCount = Math.ceil(histories.length / PAGE_SIZE);
  const displayData = histories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageClick = ({ selected }) => setPage(selected + 1);

  return (
    <>
      <Card className="mb-4 bg-dark text-white">
        <Card.Header>나의 시청 기록</Card.Header>
        <Card.Body>
          <Row>
            {displayData.length > 0 ? (
              displayData.map((item) => (
                <Col key={item.id} lg={4} xs={8} className="mb-3">
                  <VideoCard title={item.title} />
                </Col>
              ))
            ) : (
              <p className="text-white">시청한 영상이 없습니다.</p>
            )}
          </Row>
        </Card.Body>
      </Card>
      <div className="paginationContainer d-flex justify-content-center mt-4">
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
  );
};

export default PersonHistorySection;
