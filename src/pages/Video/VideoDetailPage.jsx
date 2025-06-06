import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Container, Badge } from 'react-bootstrap';
import './VideoDetailPage.style.css';
import MovieTab from '../MovieDetail/MovieTabs/MovieTab';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';

const VideoDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetails({ id });

  const posterPath = data?.poster_path;
  const backPoster = data?.backdrop_path;

  const poster_URL = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`

  const backPoster_URL = `https://image.tmdb.org/t/p/original${backPoster}`

  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>;
  }

  if (isError) {
    return <Alert variant="danger">❌ 데이터를 불러오는 데 실패했습니다: {error.message}</Alert>;
  }

  if (!data) {
    return <Alert variant="warning">ℹ️ 영화 데이터를 찾을 수 없습니다.</Alert>;
  }

  return (
    <>
      <div className="MainPoster" style={{ backgroundImage: `url(${backPoster_URL})` }}>
        <Container className="Container">
          <div className="InfoContainer">
            <Row style={{borderRadius: '10px'}}>
              <Col sm={4} className="MovieInfo">
                <div
                  className="MovieDetailInfoImage"
                  style={{ backgroundImage: `url(${poster_URL})` }}
                ></div>
              </Col>
              <Col sm={8} className="MovieInfoContainer">
                <h1>{data.title || '제목 정보 없음'}</h1>
                <p>{data.overview || '줄거리 정보가 없습니다.'}</p>

                <p className="OverviewContainer"></p>
                <div className="mb-2">
                  {data.genres?.length > 0 ? (
                    data.genres.map((item, index) => (
                      <Badge className="badge me-1" bg="danger" key={index}>
                        {item?.name}
                      </Badge>
                    ))
                  ) : (
                    <span>장르 정보 없음</span>
                  )}
                </div>

                <p>연령 제한: {data.adult ? '18세 이상' : '전체 관람가'}</p>
                <p>개봉일자: {data.release_date || '정보 없음'}</p>
                <p>상영시간: {data.runtime ? `${data.runtime}분` : '정보 없음'}</p>
                <p>평점: {data.vote_average ?? '정보 없음'} 점</p>
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
