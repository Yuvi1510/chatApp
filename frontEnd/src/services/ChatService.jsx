import { httpClient} from "../config/AxiosHelper"


export const getAllChats = async(roomId) =>{
    const response = await httpClient.get(`/api/v1/room/${roomId}/messages`)
    return response;
}