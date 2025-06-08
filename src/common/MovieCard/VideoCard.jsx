import React from 'react';
import "./MovieCard.style.css";
import { Spinner }  from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useMoviePosterByTitle } from "../../hooks/useMoviePosterByTitle";

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const videoName = video.title;
    const { data, isLoading } = useMoviePosterByTitle(video.title);
    if (isLoading) return <Spinner animation="border" variant="light" />;

    // 영화 상세페이지 진입 후 가장 상단으로 이동되게 변경
    const moveToDetailPage = () => {
        navigate(`/video/${video.id}?id=${data.id}`);
        window.scrollTo(0, 0); // 윈도우 최상단으로 이동되게 함
    }

    let newPoster = data?.posterUrl;

    const lastSegment = newPoster?.split('/').pop();
    if (lastSegment === 'null') newPoster = null;

    return (
        <div 
            style={{
                background: `url(${newPoster || `https://dummyimage.com/210x330/cccccc/000000&text=${encodeURIComponent(videoName)}`})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="movie-card"
            >
            <div className='overlay' onClick={moveToDetailPage}>
                <h4>{video.title}</h4>
                {/* <Genre movie={movie} /> */}
                <div className='movie-detail-Info'>
                    <div style={{backgroundColor: 'transparent'}}>감독 : {video.director}</div>
                    <div style={{backgroundColor: 'transparent'}}>유형 : {video.type}</div>
                    <div style={{backgroundColor: 'transparent'}}>연령제한 : {video.rating}</div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;
