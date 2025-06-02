import './App.css';
import AppLayout from './layout/AppLayout';
import {Routes,Route} from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bottom from './layout/Bottom';

import UserSettingsPage from './pages/Setting/UserSettingPage';
import PersonHistoryPage2 from './pages/Person/PersonHistoryPage2'
import PersonRecommendPage2 from './pages/Person/PersonRecommendPage2'
import GroupSearchPage from './pages/Group/GroupSearchPage'
import VideoDetailPage from './pages/Video/VideoDetailPage'
import VideoPage from './pages/Video/VideoPage';  
import GroupMediaPage from './pages/Group/GroupMediaPage';
import PersonMediaPage from './pages/Person/PersonMediaPage';

// 홈페이지 
// 영화 전체보여주는 페이지 
// 영화 디테일 페이지
function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element = {<AppLayout/>}>

          {/* 개인 시청 기록 페이지 */}
          <Route path='/'>
          <Route index element = {<PersonMediaPage/>}/>
          {/* <Route index element = {<PersonHistoryPage2/>}/> */}
          </Route>

          {/* 개인 추천 영상상 페이지 */}
          <Route path='/recommend'>
          <Route index element = {<PersonRecommendPage2/>}/>
          </Route>

          {/* 그룹 탐색 페이지 */}
          <Route path='/group'>
          <Route index element = {<GroupSearchPage/>}/>
          </Route>

          {/* 그룹 시청 기록 페이지 */}
          <Route path="/groups/:groupId/movies" element={<GroupMediaPage />} />

          <Route path='/setting' element={<UserSettingsPage/>}/>

          {/* 영상 상세 페이지 */}
          <Route path='/video'>
            <Route index element = {<VideoPage/>}/>
            <Route path=':id' element = {<VideoDetailPage/>}/>
          </Route>
          
      </Route>

      <Route path='*' element ={<NotFoundPage/>}/>
    </Routes>
    <Bottom/>
    </>
  );
}

export default App;
