import { useState } from "react";
import './adduser.css'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import { useUserStore } from "../../../../../lib/userStore";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, sendFollowRequest } from "../../../../../services/operations/profileAPI";
import { setOtherUsersData } from "../../../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const AddUser = () => {

    const [user, setUser] = useState(null);
    const { token } = useSelector((state) => state.auth)
    const { currentUser } = useUserStore();
    const dispatch = useDispatch()

    const handleSearch = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);
            const userDataResult = await getUserProfile(token, username);

            if (!querySnapShot.empty) {
                setUser({ ...userDataResult, ...querySnapShot.docs[0].data() });
                dispatch(setOtherUsersData({ ...userDataResult, ...querySnapShot.docs[0].data() }))
            }
        } catch (error) {
            toast.error("User not found");
        }
    }

    const handleAdd = async (event) => {
        const followRequestResult = await sendFollowRequest(user.id, token);
        if (followRequestResult.receiverUserDetails._id === user.id) {

            const chatRef = collection(db, "chats");
            const userChatsRef = collection(db, "userchats");

            try {
                const newChatRef = doc(chatRef);

                await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    messages: [],
                });

                await updateDoc(doc(userChatsRef, user.id), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: currentUser.id,
                        updatedAt: Date.now(),
                    })
                });

                await updateDoc(doc(userChatsRef, currentUser.id), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: user.id,
                        updatedAt: Date.now(),
                    })
                });
            } catch (error) {
                toast.error("Error in creating chat");
            }
        }  else {
            toast.error("Error in sending follow request");
        }
    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user?.avatar || "./assets/avatar.png"} alt="" />
                    <span>{user?.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}

        </div>
    );
};

export default AddUser;