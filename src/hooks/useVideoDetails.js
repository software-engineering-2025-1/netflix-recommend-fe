import {useQuery} from "@tanstack/react-query";
import api2 from "../utils/api2"

export const useVideoDetails = ({id}) =>{
    return useQuery({
        queryKey:['video-details',{id}],
        queryFn:()=>{
            return api2.get(`/videos/${id}`)
        },
        select:(result) => result.data,
    })
}