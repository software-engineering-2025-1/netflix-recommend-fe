import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import ProfileEditTable from './Table/ProfileEditTable';
import WatchHistoryTable from './Table/WatchHistoryTable';
import GroupCreateTable from './Table/GroupCreateTable';
import ProfileTable from './Table/ProFileTable';

const UserSettingPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Container className="my-5">
      <h3 className="text-white mb-4">🛠️ 사용자 설정</h3>

      <Nav fill variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'profile')}>
        <Nav.Item>
          <Nav.Link eventKey="profile">👤 개인 정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profileEdit">👤 개인 정보 수정</Nav.Link>
        </Nav.Item>
        <Nav.Item>  
          <Nav.Link eventKey="history">🎬 시청 기록 추가</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="group">👥 그룹 생성</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        {activeTab === 'profile' && <ProfileTable />}
        {activeTab === 'profileEdit' && <ProfileEditTable />}
        {activeTab === 'history' && <WatchHistoryTable />}
        {activeTab === 'group' && <GroupCreateTable />}
      </div>
    </Container>
  );
};

export default UserSettingPage;
