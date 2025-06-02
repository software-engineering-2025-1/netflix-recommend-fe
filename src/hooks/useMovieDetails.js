import {useQuery} from "@tanstack/react-query";
import api from '../utils/api';

export const useMovieDetails = ({id}) =>{
    return useQuery({
        queryKey:['movie-details',{id}],
        queryFn:()=>{
            return api.get(`/movie/${id}?language=ko`)
        },
        select:(result) => result.data,

    })
}