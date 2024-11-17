import React, { useEffect, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../../lib/userStore.js";
import { arrayUnion, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase.js";
import { usechatStore } from "../../../lib/chatStore";
import upload from "../../../lib/uploads";
import { FaCircleInfo } from "react-icons/fa6";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const { currentUser } = useUserStore();
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = usechatStore();
    const [openEmoji, setOpenEmoji] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("");
    const navigate = useNavigate();
    const [img, setImg] = React.useState({ file: null, url: "" });
    const [chat, setChat] = React.useState({ messages: [] });
    const endRef = useRef(null);
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: "end", inline: "nearest", behavior: "instant" });
        }
    }, [chat?.messages, chatId, img]);

    const handleEmoji = (event) => {
        setText((prev) => prev + event.emoji);
    }

    const handleImg = (event) => {
        if (event.target.files[0]) {
            setImg({
                file: event.target.files[0],
                url: URL.createObjectURL(event.target.files[0])
            })
        }
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });
        return () => {
            unSub();
        };
    }, [chatId]);

    const handleSend = async () => {

        if (text === "") return;

        let imgUrl = null;

        try {
            setLoading(true);
            if (img.file) {
                imgUrl = await upload(img.file);
                setImg({ file: null, url: "" });
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl, imgName: img.file.name }),
                })
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatRef = doc(db, 'userchats', id);
                const userChatSnap = await getDoc(userChatRef);

                if (userChatSnap.exists()) {
                    const userChatData = userChatSnap.data();

                    const chatIndex = userChatData.chats.findIndex((chat) => chat.chatId === chatId);
                    userChatData.chats[chatIndex].lastMessage = text;
                    userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatRef, {
                        chats: userChatData.chats,
                    });
                }
            });
            setLoading(false);
        } catch (error) {
            toast.error("Failed to send message");
            setLoading(false);
        }
        setImg({ file: null, url: "" });
        setText("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./assets/avatar.png"} alt="" />
                    <div className="texts">
                        <span onClick={() => navigate(`/profile/${user?.username}`)}>{user?.username || "User"}</span>
                        <p>{user?.additionalDetails?.about || "Write something about yourself."}</p>
                    </div>
                </div>
                <div className="icons" onClick={() => navigate(`/profile/${user?.username}`)}>
                    <FaCircleInfo className="img" />
                </div>
            </div>
            <div className="center">
                {chat?.messages.map((message) => (
                    <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message.createdAt}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            <span>
                                {message.createdAt.toDate().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
                {img.url && <div className="message own">
                    <div className="texts">
                        <img src={img.url} alt="" />
                    </div>
                </div>}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./assets/img.png" alt="" />
                    </label>
                    <input type="file" name="file" id="file" accept="image/*"
                        disabled={isCurrentUserBlocked || isReceiverBlocked}
                        hidden onChange={handleImg} />

                    <label htmlFor="image">
                        <img src="./assets/camera.png" alt="" />
                    </label>
                    <input name="image" id="image" type="file" accept="image/*"
                        disabled={isCurrentUserBlocked || isReceiverBlocked}
                        hidden onChange={handleImg} />
                </div>
                <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message..."}
                    value={text}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress} />
                <div className="emoji">
                    <img src="./assets/emoji.png" alt=""
                        onClick={() => setOpenEmoji((prev) => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} className="emojiBox" />
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>{loading ? "Sending..." : "Send"}</button>
            </div>
        </div>
    );
};

export default Chat;