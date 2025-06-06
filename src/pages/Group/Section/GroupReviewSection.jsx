import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import api2 from '../../../utils/api2';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE = 9;

const GroupReviewSection = ({ groupId, groupName, setLoading, setError }) => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [groupId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api2.get(`/groups/${groupId}/reviews?page=0&size=100`);
      const data = Array.isArray(res.data.reviews) ? res.data.reviews : [];
      setReviews(data);
    } catch (err) {
      setError('❌ 그룹 리뷰를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim() || !videoTitle.trim()) return;

    try {
      await api2.post(`/groups/${groupId}/reviews`, {
        comment: `videoTitle: ${videoTitle}\treview: ${newReview}`,
      });
      setNewReview('');
      setVideoTitle('');
      fetchReviews();
    } catch (err) {
      setError('❌ 리뷰 작성에 실패했습니다.');
    }
  };
  const pageCount = Math.ceil((reviews.length || 0) / PAGE_SIZE);
  const displayReviews = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
    <Card className="mb-4 bg-dark text-white">
      <Card.Header>{groupName || '그룹'} 리뷰</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmitReview} className="mb-4">
          <Form.Group controlId="videoIdInput" className="mb-2">
            <Form.Control
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="영상 Title를 입력하세요 (예: Harry potter)"
            />
          </Form.Group>
          <Form.Group controlId="reviewInput">
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="해당 영상에 대한 그룹 리뷰를 작성해주세요."
            />
          </Form.Group>
          <Button type="submit" variant="danger" className="mt-2">
            리뷰 작성
          </Button>
        </Form>

        {displayReviews.length === 0 ? (
          <p className="text-white">작성된 리뷰가 없습니다.</p>
        ) : (
          <Row>
            {displayReviews.map((review, idx) => (
              <Col key={idx} lg={12}>
                <Card className="mb-3 bg-secondary text-white">
                  <Card.Body>
                    <Card.Text>
                      <strong>👤 Author: {review.author}</strong>
                    </Card.Text>
                    <Card.Text>
                      {review.comment.split('\n').map((line, index, array) => (
                        <span key={index}>
                          {line}
                          {index !== array.length - 1 && <br />}
                        </span>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
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

export default GroupReviewSection;
