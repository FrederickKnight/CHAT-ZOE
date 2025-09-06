import "@styles/chat-window.css"
import type { Message } from "@ctypes/room_types"
import { useGetUser } from "@hooks/useGetUser"

export interface Props {
    message:Message
}

export default function MessageBubble(props:Props){
    const {message} = props
    const [user,refetchUser] = useGetUser()

    const sender_name = message.user ? message.user?.username : message.zoe?.name

    return (
        <div className={`message-bubble ${message.user ? "bubble_user" : "bubble_foreing"}`}>
            <div className="message-bubble_message">
                {message.content}
            </div>
            <span className="message-bubble_user">
                {sender_name}
            </span>
        </div>
    )
}