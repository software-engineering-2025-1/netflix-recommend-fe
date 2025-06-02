import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"; 

export const useMoviePosterByTitle = (title) => {
  return useQuery({
    queryKey: ["movie-poster", title],
    queryFn: async () => {
      const response = await api.get("/search/movie", {
        params: {
          query: title,
          language: "ko",
        },
      });
      return response.data.results[0]; // 가장 첫 번째 영화 정보 반환
    },
    select: (movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl:
        window.innerWidth <= 768
          ? `https://media.themoviedb.org/t/p/w150_and_h225_face/${movie.poster_path}`
          : `https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
      adult: movie.adult,
    }),
    enabled: !!title, // title이 존재할 때만 호출
  });
};
