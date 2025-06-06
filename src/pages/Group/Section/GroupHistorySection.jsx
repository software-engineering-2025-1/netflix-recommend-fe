import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api2 from '../../../utils/api2';
import VideoCard from '../../../common/MovieCard/VideoCard';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 9;

const GroupHistorySection = ({ groupId, groupName, setLoading, setError }) => {
  const [page, setPage] = useState(1);
  const [groupMembers, setGroupMembers] = useState([]);
  const [allUniqueVideos, setAllUniqueVideos] = useState([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        setLoading(true);
        const res = await api2.get(`/groups/${groupId}`);
        setGroupMembers(res.data.members || []);
      } catch (err) {
        setError('❌ 그룹 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupMembers();
  }, [groupId]);

  useEffect(() => {
    const fetchHistories = async () => {
      if (groupMembers.length === 0) return;

      setLoading(true);
      try {
        const allVideos = [];
        for (const member of groupMembers) {
          const res = await api2.get(`/users/${member.id}`);
          allVideos.push(...(res.data.histories || []));
        }

        // 중복 제거 (title 기준)
        const seen = new Set();
        const unique = allVideos.filter((v) => {
          if (seen.has(v.title)) return false;
          seen.add(v.title);
          return true;
        });

        setAllUniqueVideos(unique);
      } catch (err) {
        setError('❌ 시청 기록을 불러오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [groupMembers]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const pageCount = Math.ceil((allUniqueVideos.length || 0) / PAGE_SIZE);
  const displayVideos = allUniqueVideos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Card className="mb-4 bg-dark text-white">
        <Card.Header>{groupName} 그룹의 시청 기록</Card.Header>
        <Card.Body>
          <Row>
            {displayVideos.length > 0 ? (
              displayVideos.map((v, idx) => (
                <Col key={idx} lg={4} xs={8}>
                  <VideoCard title={v.title} />
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
