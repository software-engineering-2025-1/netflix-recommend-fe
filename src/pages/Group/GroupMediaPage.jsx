import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import GroupHistorySection from './Section/GroupHistorySection';
import GroupRecommendSection from './Section/GroupRecommendSection';
import GroupReviewSection from './Section/GroupReviewSection';


const GroupMediaPage = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupName = searchParams.get('groupName');

  const [activeTab, setActiveTab] = useState('history');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container className="my-4">
      <Row>
        <Col lg={4} xs={12}>
          <h3 className="text-white mb-4">🎬 {groupName || '그룹'} 콘텐츠</h3>
          <Container className="SortButton">
            <Button
              variant={activeTab === 'history' ? 'danger' : 'outline-danger'}
              onClick={() => {
                setActiveTab('history');
              }}
            >
              Watched Video
            </Button>
            <Button
              variant={activeTab === 'recommend' ? 'danger' : 'outline-danger'}
              onClick={() => {
                setActiveTab('recommend');
              }}
            >
              Recommend Video
            </Button>
            <Button
              variant={activeTab === 'review' ? 'danger' : 'outline-danger'}
              onClick={() => {
                setActiveTab('review');
              }}
            >
              Group Review
            </Button>
          </Container>
        </Col>

        <Col lg={8} xs={12}>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && isLoadingSpinner()}

          {activeTab === 'history' && (
            <GroupHistorySection
              groupId={groupId}
              groupName={groupName}
              setLoading={setLoading}
              setError={setError}
            />
          )}

          {activeTab === 'recommend' && (
            <GroupRecommendSection
              groupId={groupId}
              groupName={groupName}
              setLoading={setLoading}
              setError={setError}
            />
          )}

          {activeTab === 'review' && (
            <GroupReviewSection
              groupId={groupId}
              groupName={groupName}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GroupMediaPage;
