// src/pages/KakaoCallbackPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveToken } from '../utils/auth';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('accessToken');

    if (token) {
      saveToken(token);
      window.location.href = '/' // 로그인 성공 후 홈(=PersonMediaPage)으로
    } else {
      alert('로그인 실패: 토큰이 없습니다.');
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
