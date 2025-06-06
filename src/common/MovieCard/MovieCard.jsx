import React from 'react';
import Genre from '../Genre/Genre';
import "./MovieCard.style.css";
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    // 영화 상세페이지 진입 후 가장 상단으로 이동되게 변경
    const moveToDetailPage = () => {
        navigate(`/video/${movie.id}`);
        window.scrollTo(0, 0); // 윈도우 최상단으로 이동되게 함
    }

    // 모바일 환경에서 작은 이미지 URL
    const posterPath = movie?.poster_path;
    const imageUrl = window.innerWidth <= 768 ? `https://media.themoviedb.org/t/p/w150_and_h225_face/${posterPath}` : `https://media.themoviedb.org/t/p/w220_and_h330_face/${posterPath}`;

    return (
        <div style={{
            background: `url(${imageUrl || `https://dummyimage.com/300x450/cccccc/000000&text=${encodeURIComponent(movie.title)}`})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
            className='movie-card'>
            <div className='overlay' onClick={moveToDetailPage}>
                <h4>{movie.title}</h4>
                <Genre movie={movie} />
                <div className='movie-detail-Info'>
                    <div>평점 : {movie?.vote_average}점</div>
                    <div>누적관객 수 : {movie?.popularity}명</div>
                    <div>연령제한 : {movie?.adult ? 'over 18' : 'under 18'}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
