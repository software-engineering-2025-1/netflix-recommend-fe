import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Container, Badge, Button } from 'react-bootstrap';
import './VideoDetailPage.style.css';
import MovieTab from '../MovieDetail/MovieTabs/MovieTab';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import { useVideoDetails } from '../../hooks/useVideoDetails';
import api2 from '../../utils/api2';

const VideoDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const realId = searchParams.get('id');

  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState(null);

  const { data, isLoading, isError, error } = useMovieDetails({ realId });
  const { data: video , isLoading: isLoading2, isError: isError2} = useVideoDetails({ id });

  const posterPath = data?.poster_path;
  const backPoster = data?.backdrop_path;

  const poster_URL = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`
  const backPoster_URL = `https://image.tmdb.org/t/p/original${backPoster}`

  if (isLoading || isLoading2) {
    return <div>{isLoadingSpinner()}</div>;
  }

  if (isError || isError2) {
    return <Alert variant="danger">❌ 데이터를 불러오는 데 실패했습니다: {error.message}</Alert>;
  }

  if (!data || !video) {
    return <Alert variant="warning">ℹ️ 영화 데이터를 찾을 수 없습니다.</Alert>;
  }

  const handleRegisterHistory = async () => {
    if (!id) {
      setMessage("❌ 영상 ID가 유효하지 않습니다.");
      setMsgType("danger");
      return;
    }
  
    try {
      await api2.post(`/videos/${id}/histories`, {}); // 빈 바디 전달
      setMessage("✅ 시청 기록이 등록되었습니다.");
      setMsgType("success");
    } catch (error) {
      setMessage(`❌ ${error.response?.data || error.message}`);
      setMsgType("danger"); 
    }
  };

  return (
    <>
      <div className="MainPoster" style={{ backgroundImage: `url(${backPoster_URL})` }}>
        {message && <Alert variant={msgType}>{message}</Alert>}
        <div
          style={{
            position: "sticky",
            top: "20px",
            right: "100px",
            zIndex: 10,
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem",
            backgroundColor: 'transparent'
          }}
        >
          <Button variant="success" onClick={handleRegisterHistory}>
            시청 기록 등록
          </Button>
        </div>
        <Container className="Container">
          <div className="InfoContainer">
            <Row style={{borderRadius: '10px'}}>
              <Col sm={4} className="MovieInfo">
                <div
                  className="MovieDetailInfoImage"
                  style={{ backgroundImage: `url(${posterPath ? poster_URL : `https://dummyimage.com/210x330/cccccc/000000&text=${encodeURIComponent(data?.title)}`})` }}
                ></div>
              </Col>
              <Col sm={8} className="MovieInfoContainer">
                <h1>{video.title || '제목 정보 없음'}</h1>
                <p>{video.description || '줄거리 정보가 없습니다.'}</p>

                <p className="OverviewContainer"></p>
                <div className="mb-2">
                  {video.genres?.length > 0 ? (
                    video.genres.map((item, index) => (
                      <Badge className="badge me-1" bg="danger" key={index}>
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span>장르 정보 없음</span>
                  )}
                </div>

                <p>감독: {video.director}</p>
                <p>연령 제한: {video.rating}</p>
                <p>출연진: {video.cast || '정보 없음'}</p>
                <p>상영시간: {video.duration || '정보 없음'}</p>
                <p>국가: {video.countries || '정보 없음'}</p>
                <p>업로드 일자: {video.dateAdded || '정보 없음'}</p>
                <p style={{marginBottom: '50px'}}>발매 연도: {video.releaseYear ? `${video.releaseYear}년` : '정보 없음'}</p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          <Col>
            <MovieTab />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VideoDetail;
