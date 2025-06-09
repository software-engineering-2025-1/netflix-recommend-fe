import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import VideoCard from '../../../common/MovieCard/VideoCard';
import recommendApi from '../../../utils/recommendApi';
import api2 from '../../../utils/api2';

const PersonRecommendSection = ({ setLoading, setError }) => {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = (await api2.get('/users/me')).data.id;
        const res = await recommendApi.get(`/users/${userId}/recommend`);
        setRecommend(res.data || []);
      } catch (err) {
        setError('❌ 추천 영상을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card className="mb-4 bg-dark text-white">
        <Card.Header>나의 추천 영상</Card.Header>
        <Card.Body>
          <Row>
            {recommend.length > 0 ? (
              recommend.map((item) => (
                <Col key={item.id} lg={4} xs={8} className="mb-3">
                  <VideoCard video={item} />
                </Col>
              ))
            ) : (
              <p className="text-white">추천된 영상이 없습니다.</p>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PersonRecommendSection;
