import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import VideoCard from '../../../common/MovieCard/VideoCard';
import recommendApi from '../../../utils/recommendApi';

const GroupRecommendSection = ({ groupId, groupName, setLoading, setError }) => {
  const [recommendVideos, setRecommendVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await recommendApi.get(`/groups/${groupId}/recommend`);
        setRecommendVideos(res.data || []);
      } catch (err) {
        setError('❌ 추천 영상을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [groupId]);

  return (
    <>
    <Card className="mb-4 bg-dark text-white">
      <Card.Header>{groupName} 그룹의 추천 영상</Card.Header>
      <Card.Body>
        {recommendVideos.length === 0 ? (
          <p className="text-white">추천된 영상이 없습니다.</p>
        ) : (
          <Row>
            {recommendVideos.map((item) => (
              <Col key={item.id} lg={4} xs={8}>
                <VideoCard video={item} />
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
    </>
  );
};

export default GroupRecommendSection;
