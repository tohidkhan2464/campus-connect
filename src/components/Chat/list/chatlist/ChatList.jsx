import React, { useEffect } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../../lib/userStore.js";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase.js";
import { usechatStore } from "../../../../lib/chatStore";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";


const ChatList = ({handleChatSelect}) => {
    const { currentUser } = useUserStore();
    const { changeChat } = usechatStore();
    const [addMode, setAddMode] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [chats, setChats] = React.useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser?.id), async (res) => {
            if (res.exists() && res.data().chats) {
                const items = res.data().chats;
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);
                    const user = userDocSnap.data();
                    return { ...item, user };
                });
                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        });
        return () => {
            unSub();
        };
    }, [currentUser?.id])

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });
        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;
        const userChatRef = doc(db, "userchats", currentUser.id);

        try {
            await updateDoc(userChatRef, {
                chats: userChats
            });
            changeChat(chat.chatId, chat.user);
            handleChatSelect();
        } catch (error) {
            toast.error("Failed to update chat");
        }
    }

    useEffect(() => {
        if (window.location.pathname !== "/messages") {
            setChats([])
        }
    }, [changeChat]);


    const filteredChats = chats.filter((chat) => chat.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./assets/search.png" alt="" className="img" />
                    <input type="text" placeholder="Search or start new chat" onChange={(e) => setInput(e.target.value)} />

                </div>
                {addMode
                    ? (<HiOutlineMinus className="add" onClick={() => setAddMode((prev) => !prev)} />)
                    : (<HiOutlinePlus className="add" onClick={() => setAddMode((prev) => !prev)} />)}
              
            </div>
            {
                filteredChats?.map((chat) => (
                    <div className="item" key={chat?.chatId} onClick={() => handleSelect(chat)} >
                        <img src={chat.user.avatar || "./assets/avatar.png"} alt="" />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat?.lastMessage}</p>
                        </div>
                        {!chat.isSeen && <div className="isSeen"></div>}
                    </div>
                ))
            }

            <div className="endOfList">
                <p>End of List</p>
                <div></div>
            </div>



            {addMode && <AddUser addMode={addMode} setAddMode={setAddMode} />}
        </div>
    );
};

export default ChatList;