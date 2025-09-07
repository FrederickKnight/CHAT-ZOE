import { useState, useEffect } from "react";
import type { Room, RoomUser } from "@ctypes/room_types";

export function useGetRoomUser(uuid: string) {
    const URL_PATH = import.meta.env.PUBLIC_API_URL;
    const [roomUser, setRoomUser] = useState<RoomUser | undefined>(undefined)

    const fetchRoomUser = async (uuid: string) => {
        try{
            if (uuid){
                const room_response = await fetch(URL_PATH + "room/?filter_field=uuid&filter_value=" + uuid)
                const room_json: Room = await room_response.json().then(data => data.response[0])
                
                if (!room_json) {
                    console.warn("There is not room with uuid:", uuid);
                    setRoomUser(undefined);
                    return;
                }

                const room_user_response = await fetch(URL_PATH + "room-user/?relations=true&filter_field=id_room&filter_value=" + room_json.id)
                const room_user_json: RoomUser = await room_user_response.json().then(data => data.response[0])
                
                if (!room_user_json) {
                    console.warn("There is no room-user with id_room:", room_json.id);
                    setRoomUser(undefined);
                    return;
                }
                
                setRoomUser(room_user_json)
            }
        }
        catch (error) {
            console.log("error in fetch room-user")
            setRoomUser(undefined)
        }   
    }

    useEffect(() => {
        fetchRoomUser(uuid)
    }, [uuid])

    return [roomUser, fetchRoomUser] as const
}