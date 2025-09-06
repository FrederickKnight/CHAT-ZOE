import { useState, useEffect } from "react";
import type { User, Room, RoomUser } from "@ctypes/room_types";

export function useGetListRooms(user: User | null) {
    const URL_PATH = import.meta.env.PUBLIC_API_URL;
    const [rooms, setRooms] = useState<RoomUser[]>([])

    const fetchRooms = async () => {
        try {
            if (user) {
                const response = await fetch(URL_PATH + "/room-user/?filter_field=id_user&filter_value=" + user.id + "&relations=true")
                const json = await response.json()
                setRooms(json.response)
            }
        }
        catch (error) {
            console.log("error in fetch room")
            setRooms([])
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [user])

    return [rooms, fetchRooms] as const;
}