import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import {Col,Row,Container} from 'react-bootstrap';
import './VideoPage.style.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';

const PAGE_SIZE = 9;

const VideoPage = () => {
  const [query] = useSearchParams(); //URL 찾기위해 선언
  const [page, setPage] = useState(1); //페이지네이션 상태함수(초기값 1)

  const keyword = query.get('q');//q 뒤에오는 값 가져오기
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });//searchQuery 훅 가져와서 사용
  
  //페이지 이동함수
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  //로딩스피너
  if (isLoading) {
    return <div>{isLoadingSpinner()}</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const displayData = data.results; //뿌려줄 데이터들 모아놓기
  const pageCount = Math.ceil(data?.total_results / PAGE_SIZE);
  return (
    <Container>
      <Row>
        <Col lg={8} xs={12} className='MovieBox'>
          {displayData.length === 0 && <h4 className= "NoGenre" variant="info">햬당 영화가 존재하지 않습니다.</h4>}
          <Row>
            {displayData.map((movie, index) => (
              <Col key={index} lg={4} xs={8}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className='paginationContainer'>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              pageCount={pageCount}
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
              forcePage={page - 1}
              style={{ backgroundColor: 'black' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;