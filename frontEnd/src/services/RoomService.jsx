import { httpClient } from "../config/AxiosHelper"

export const createNewRoom = async(roomDetails) =>{
    const response = await httpClient.post('/api/v1/room', roomDetails);
    return response.data;
}

export const joinRoomApi = async (roomId) =>{
    const response = await httpClient.get(`/api/v1/room/${roomId}`);
    return response.data;
}