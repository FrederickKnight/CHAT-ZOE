import WelcomeMessage from "./welcome-message";

import { useGetUser } from "@hooks/useGetUser";
import { useGetListRooms } from "@hooks/useGetListRooms";

import ChatCard from "./chat-card";

import "@styles/main_menu.css"

export interface Props {
    className?: String;
}

export default function RoomSelector(props: Props) {
    const { className } = props;
    const [user, refetchUser] = useGetUser();
    const [rooms, refetchRooms] = useGetListRooms(user);

    return (
        <div className={className ? `${className}` : ""}>
            <div>
                <WelcomeMessage />
            </div>
            {rooms.map(
                (room, idx) => (
                    <>
                        {room.room && (
                            <div key={idx}>
                                <ChatCard room={room.room} />
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    )
}