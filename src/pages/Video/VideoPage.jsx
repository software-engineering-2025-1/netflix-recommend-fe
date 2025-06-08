import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import {Col,Row,Container} from 'react-bootstrap';
import './VideoPage.style.css';
import ReactPaginate from 'react-paginate';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import VideoCard from '../../common/MovieCard/VideoCard';

const PAGE_SIZE = 9;

const VideoPage = () => {
  const [query] = useSearchParams(); //URL 찾기위해 선언
  const [page, setPage] = useState(0); //페이지네이션 상태함수

  const rate = query.get('rate');
  const genre = query.get('genre');
  const videoType = query.get('type');
  const keyword = query.get('keyword');

  const params = {
    page: page,
    size: PAGE_SIZE,
    ...(keyword && { keyword }), 
    ...(rate && { rate }), 
    ...(genre && { genre }), 
    ...(videoType && { type: videoType }), 
  }

  const { data, isLoading, isError, error } = useSearchMovieQuery({ params });
  
  //페이지 이동함수
  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  //로딩스피너
  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const displayData = data.videos; //뿌려줄 데이터들 모아놓기
  const totalPage = data.totalPage; //총 페이지 수
  return (
    <Container>
      <Row>
        <Col lg={8} xs={12} className='MovieBox'>
          {displayData.length === 0 && <h4 className= "NoGenre" variant="info">햬당 영화가 존재하지 않습니다.</h4>}
          <Row>
            {displayData.map((video, index) => (
              <Col key={index} lg={4} xs={8}>
                <VideoCard video={video} />
              </Col>
            ))}
          </Row>
          <div className='paginationContainer'>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              forcePage={page}
              style={{ backgroundColor: 'black' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;