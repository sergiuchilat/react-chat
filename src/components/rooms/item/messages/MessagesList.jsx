import MessageItem from "./MessageItem";
import {useEffect, useState} from "react";
import MessagesApi from "../../../../services/api/modules/MessagesApi";

export default function MessagesList({roomId}){

    const [messages, setMessages] = useState([]);

    const fetchRoomMessages = async () => {
        try {
            const response = await (new MessagesApi()).getRoomMessages(roomId);
            setMessages(response);
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchRoomMessages();
    }, [roomId]);


    return (
        <div>
            {
                messages && messages.map(message => (
                    <MessageItem message={message.text} key={message.id}/>
                ))
            }
        </div>
    )
}