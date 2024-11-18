import React from "react";
import "./list.css";
import ChatList from "./chatlist/ChatList";
import UserInfo from "./userInfo/UserInfo";

const List = ({handleChatSelect}) => {


    return (
        <div className="list">
            <UserInfo />
            <ChatList handleChatSelect={handleChatSelect} />
        </div>
    );
};

export default List;