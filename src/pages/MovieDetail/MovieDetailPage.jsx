import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import Alert from 'react-bootstrap/Alert';
import { Row, Col, Container,Badge } from 'react-bootstrap';
import '../MovieDetail/MovieDetailPage.style.css';
import MovieTab from './MovieTabs/MovieTab';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';


// 무브디테일 페이지
const MovieDetail = () => {
  let params = useParams(); //id 값을 가져오기 위해 선언

  const { data, isLoading, isError, error } = useMovieDetails(params); //데이터 가져오기
  const posterPath = data?.poster_path; // 이미지
  const backPoster = data?.backdrop_path;
  
  const poster_URL = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`;
  const backPoster_URL = `https://image.tmdb.org/t/p/original${backPoster}`;

  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
    <div className='MainPoster' style={{backgroundImage:`url(${backPoster_URL})`}}>
      <Container className='Container'>
        <div className='InfoContainer'>
          <Row>
            <Col sm={4} className='MovieInfo'>
              <div className='MovieDetailInfoImage' style={{ backgroundImage: `url(${poster_URL})` }}></div>
            </Col>
            <Col sm={8} className='MovieInfoContainer'>
              <h1>{data?.title}</h1>
              <p>{data?.overview}</p>
              <p className='OverviewContainer'></p>
              <p>
                {data?.genres.map((item, index) => (
                  <Badge className="badge" bg="danger" key={index}>{item?.name}</Badge>
                ))}
              </p>
                <p> 연령제한 : {data?.adult ? 'over 18' : 'under 18'}</p>
                <p> 개봉일자 : {data?.release_date}</p>
                <p> 상영시간 : {data?.runtime}분</p>
                <p> 평점 : {data?.vote_average} 점</p>
            </Col>
          </Row>
        </div>
      </Container>
      </div>
      <Container>
      <Row>
        <Col><MovieTab/></Col>
      </Row>
      </Container>
      </>
  );
  
              }
export default MovieDetail;