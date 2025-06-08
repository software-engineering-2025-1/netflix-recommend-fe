import {useQuery} from '@tanstack/react-query';
import api2 from '../utils/api2';

const fetchSearchMovie = ({ params }) => {
    return api2.get(`/videos`, { params });
};

export const useSearchMovieQuery = ({ params }) =>{
    return useQuery({
        queryKey:['search-movie',{ params}],
        queryFn:() => fetchSearchMovie({ params}),
        select:(result) => result.data,
    })
}