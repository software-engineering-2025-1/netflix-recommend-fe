import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api2 from '../../../utils/api2';
import VideoCard from '../../../common/MovieCard/VideoCard';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 9;

const GroupRecommendSection = ({ groupId, groupName, setLoading, setError }) => {
  const [page, setPage] = useState(1);
  const [recommendVideos, setRecommendVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await api2.get(`/groups/${groupId}/recommend`);
        setRecommendVideos(res.data || []);
      } catch (err) {
        setError('❌ 추천 영상을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [groupId]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const pageCount = Math.ceil((recommendVideos.length || 0) / PAGE_SIZE);
  const displayRecommends = recommendVideos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
    <Card className="mb-4 bg-dark text-white">
      <Card.Header>{groupName} 그룹의 추천 영상</Card.Header>
      <Card.Body>
        {displayRecommends.length === 0 ? (
          <p className="text-white">추천된 영상이 없습니다.</p>
        ) : (
          <Row>
            {displayRecommends.map((item) => (
              <Col key={item.id} lg={4} xs={8}>
                <VideoCard title={item.title} />
              </Col>
            ))}
          </Row>
        )}
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

export default GroupRecommendSection;
