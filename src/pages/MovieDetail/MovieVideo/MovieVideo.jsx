import React from 'react'
import { useSearchParams } from'react-router-dom'
import { useMovieVideo } from '../../../hooks/useMovieVideo';
import {Container,Row} from 'react-bootstrap';

const MovieVideo = () => {
    let num = Math.floor(Math.random()*3);
    const [query] = useSearchParams()
    const id = query.get('id');
    const {data} = useMovieVideo(id);

    let YOUTUBE_KEY = data?.results?.[num]?.key;
    const URL = `https://www.youtube.com/embed/${YOUTUBE_KEY}`

    if (!URL) {
      return <h1>No video available</h1>;
    }

  return (
    <Container>
      <Row>
      <h4 style={{ color: 'white' }}>영상 정보</h4>
      <iframe id="ytplayer" type="text/html" width="1300" height="700"
    src={URL&&URL}
    frameborder="0" allowfullscreen>
    </iframe>


      </Row>
    </Container>
  )
}

export default MovieVideo
