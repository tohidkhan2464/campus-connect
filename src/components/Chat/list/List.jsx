import React from "react";
import "./list.css";
import ChatList from "./chatlist/ChatList";
import UserInfo from "./userInfo/UserInfo";

const List = () => {
    // const windowWidth = window.innerWidth;
    // console.log("window", windowWidth);
    // const isMobile = windowWidth <= 768;


    // if (chatId && !isMobile) {
    //     return null;
    // };

    return (
        <div className="list">
            <UserInfo />
            <ChatList />
        </div>
    );
};

export default List;