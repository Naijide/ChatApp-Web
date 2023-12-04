import React from 'react'
import { PrettyChatWindow } from 'react-chat-engine-pretty'
const projectId = import.meta.env.VITE_PROJECT_ID

const ChatsPage = (props) => {
    return (
        <div style={{height:'100vh'}}>
            <PrettyChatWindow
                projectId={projectId}
                username= {props.user.username}
                secret= {props.user.secret}
                style={{ height: '100vh' }}
            />
        </div>
    )
}
export default ChatsPage