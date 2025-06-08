import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api2 from '../../../utils/api2';
import VideoCard from '../../../common/MovieCard/VideoCard';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 9;

const GroupHistorySection = ({ groupId, groupName, setLoading, setError }) => {
  const [page, setPage] = useState(1);
  const [groupHistory, setGroupHistory] = useState([]);

  useEffect(() => {
    const fetchGroupHistory = async () => {
      try {
        setLoading(true);
        const res = await api2.get(`/groups/${groupId}/histories`);
        setGroupHistory(res.data || []);
      } catch (err) {
        setError('❌ 그룹 시청 기록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupHistory();
  }, [groupId]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const pageCount = Math.ceil((groupHistory.length || 0) / PAGE_SIZE);
  const displayVideos = groupHistory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Card className="mb-4 bg-dark text-white">
        <Card.Header>{groupName} 그룹의 시청 기록</Card.Header>
        <Card.Body>
          <Row>
            {displayVideos.length > 0 ? (
              displayVideos.map((v, idx) => (
                <Col key={idx} lg={4} xs={8}>
                  <VideoCard video={v} />
                </Col>
              ))
            ) : (
              <p>시청 기록 없음</p>
            )}
          </Row>
        </Card.Body>
      </Card>

      <div className="paginationContainer mt-4">
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

export default GroupHistorySection;
