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

          <Nav fill variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'profile')}>
            <Nav.Item>
              <Nav.Link eventKey="profile" style={{color: activeTab === 'profile' ? 'black' : 'white'}}>👤 개인 정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profileEdit" style={{color: activeTab === 'profileEdit' ? 'black' : 'white'}}>✏️ 개인 정보 수정</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="group" style={{color: activeTab === 'group' ? 'black' : 'white'}}>👥 그룹 생성</Nav.Link>
            </Nav.Item>
          </Nav>

      <div style={{ marginTop: '20px' }}>
        {activeTab === 'profile' && <ProfileTable />}
        {activeTab === 'profileEdit' && <ProfileEditTable />}
        {activeTab === 'group' && <GroupCreateTable />}
      </div>
    </Container>
  );
};

export default UserSettingPage;
