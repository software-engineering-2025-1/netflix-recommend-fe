import React, { useState } from 'react';
import { Container, Nav, Card } from 'react-bootstrap';
import ProfileEditTable from './Table/ProfileEditTable';
import WatchHistoryTable from './Table/WatchHistoryTable';
import GroupCreateTable from './Table/GroupCreateTable';
import ProfileTable from './Table/ProFileTable';

const UserSettingPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Container className="py-5">
      <h3 className="text-white mb-4">🛠️ 사용자 설정</h3>

      <Card bg="dark" text="light" className="mb-4 shadow-sm">
        <Card.Body>
          <Nav fill variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'profile')}>
            <Nav.Item>
              <Nav.Link eventKey="profile" className="text-white">👤 개인 정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profileEdit" className="text-white">✏️ 개인 정보 수정</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history" className="text-white">🎬 시청 기록 추가</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="group" className="text-white">👥 그룹 생성</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
      </Card>

      <div>
        {activeTab === 'profile' && <ProfileTable />}
        {activeTab === 'profileEdit' && <ProfileEditTable />}
        {activeTab === 'history' && <WatchHistoryTable />}
        {activeTab === 'group' && <GroupCreateTable />}
      </div>
    </Container>
  );
};

export default UserSettingPage;
