import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import MovieVideo from '../MovieVideo/MovieVideo';

import '../MovieTabs/MovieTab.style.css';

function MovieTab() {
  const [activeTab, setActiveTab] = useState('Reviews');

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    //스크롤 진행 시, 자연스럽게 아래로 진행되게
    const contentElement = document.getElementById(selectedTab.toLowerCase()); //탭 이름을 소문자로 변환한 후, 해당하는 요소를 찾기
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Nav className='TabContainer' fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            active={activeTab === 'Video'}
            onClick={() => handleTabSelect('Video')}
            style={{ color: 'Red' }}
          >
            Video
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="videoSection" id="video" style={{ height: '1000px', marginTop: '20px' }}>
        <MovieVideo />
      </div>
    </>
  );
}

export default MovieTab;
