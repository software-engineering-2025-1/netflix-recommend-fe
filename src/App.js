import './App.css';
import AppLayout from './layout/AppLayout';
import { Routes, Route } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bottom from './layout/Bottom';

import UserSettingsPage from './pages/Setting/UserSettingPage';

import GroupSearchPage from './pages/Group/GroupSearchPage';
import VideoDetailPage from './pages/Video/VideoDetailPage';
import VideoPage from './pages/Video/VideoPage';
import GroupMediaPage from './pages/Group/GroupMediaPage';
import PersonMediaPage from './pages/Person/PersonMediaPage';
import LoginPage from './pages/LoginPage';
import KakaoCallbackPage from './pages/KakaoCallbackPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        {/* 로그인 및 콜백 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<KakaoCallbackPage />} />

        {/* 로그인된 사용자만 접근 가능한 라우트 */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            {/* 홈 → 로그인 후 첫 화면 */}
            <Route index element={<PersonMediaPage />} />
            <Route path="group" element={<GroupSearchPage />} />
            <Route path="groups/:groupId/movies" element={<GroupMediaPage />} />
            <Route path="setting" element={<UserSettingsPage />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="video/:id" element={<VideoDetailPage />} />
          </Route>
        </Route>

        {/* 잘못된 경로 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Bottom />
    </>
  );
}

export default App;
