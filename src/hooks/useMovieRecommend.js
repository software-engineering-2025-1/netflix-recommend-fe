import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';


export const useMovieRecommend = ({id}) =>{
    return useQuery({
        queryKey:['movie-recommend',{id}],
        queryFn:()=>{
            return api.get(`/movie/${id}/recommendations?language=ko&page=1`)
        },
        select:(result) => result.data
    })

}