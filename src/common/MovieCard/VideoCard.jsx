import React from 'react';
import Genre from '../Genre/Genre';
import "./MovieCard.style.css";
import { Spinner }  from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useMoviePosterByTitle } from "../../hooks/useMoviePosterByTitle";

const VideoCard = ({ title }) => {
    const navigate = useNavigate();
    const videoName = title;
    const { data, isLoading, isError } = useMoviePosterByTitle(title);
    if (isLoading) return <Spinner animation="border" variant="light" />;
    // if (isError || !data?.posterUrl) return <p>이미지를 불러올 수 없습니다.</p>;

    // 영화 상세페이지 진입 후 가장 상단으로 이동되게 변경
    const moveToDetailPage = () => {
        navigate(`/video/${data.id}`);
        window.scrollTo(0, 0); // 윈도우 최상단으로 이동되게 함
    }

    const lastSegment = data?.posterUrl?.split('/').pop();
    if (lastSegment === 'null') data.posterUrl = null;

    return (
        <div 
            style={{
                background: `url(${data?.posterUrl || `https://dummyimage.com/210x330/cccccc/000000&text=${encodeURIComponent(videoName)}`})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="movie-card"
            >
            <div className='overlay' onClick={moveToDetailPage}>
                <h4>{data?.title||videoName}</h4>
                {/* <Genre movie={movie} /> */}
                <div className='movie-detail-Info'>
                    <div>평점 : {data?.vote_average}점</div>
                    <div>누적관객 수 : {data?.popularity}명</div>
                    <div>연령제한 : {data?.adult ? 'over 18' : 'under 18'}</div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;
