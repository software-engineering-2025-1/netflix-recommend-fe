import React from 'react'
import '../Genre/Genre.style.css';
import {Badge} from 'react-bootstrap';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const Genre = ({movie}) => {
    const {data:genreData} = useMovieGenreQuery();
    
    //장르필터
    const showGenre = (genreIdList) =>{
      if(!genreData){
        return []
      }
      // 장르데이터 필터
      const genreNameList = genreIdList.map((id)=>{
        const genreObj = genreData.find((genre)=>genre.id === id)
        return genreObj.name;
      })

      return genreNameList;
    }


  return (
    <>
        {showGenre(movie.genre_ids).map((genre,index)=>(
        <Badge className="badge" bg="danger" key={index}>{genre}</Badge>
        ))}  
    </>
)}

export default Genre