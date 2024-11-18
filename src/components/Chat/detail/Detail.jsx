import React, { useEffect } from "react";
import "./detail.css";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { usechatStore } from "../../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { HiOutlineChevronUp } from "react-icons/hi";
import { saveImage } from "../../../services/operations/postDetailsAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewPhoto from "./ViewPhoto";
import { FiDownload } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";

const Detail = ({ handleDetailUnSelect }) => {
    const { currentUser } = useUserStore();
    const { user, chatId, isCurrentUserBlocked, changeBlock, isReceiverBlocked } = usechatStore();
    const [openDropDown, setOpenDropDown] = React.useState("");
    const [photos, setPhotos] = React.useState([]);
    const { token } = useSelector((state) => state.auth);
    const [viewImage, setViewImage] = React.useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            const data = res.data();
            const images = data?.messages?.filter((msg) => msg.img).sort((a, b) => b.createdAt - a.createdAt);
            setPhotos(images);
        });
        return () => {
            unSub();
        };
    }, [chatId]);

    const handleBlock = async () => {
        if (!user) return;
        const userDocRef = doc(db, "users", currentUser.id);
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            });
            changeBlock();
        } catch (error) {
            toast.error("Failed to block user");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.detail')) {
                setOpenDropDown("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="detail">
            <div className="user">
                <div onClick={() => handleDetailUnSelect()} className="back">
                    <FaArrowLeft />
                </div>
                <img src={user?.avatar || "./assets/avatar.png"} alt="" />
                <h2>{user?.username || "User"}</h2>
                <p>{user?.additionalDetails?.about || "Write something about yourself."}</p>
            </div>
            <div className="info">
                <div className="option cursor-pointer" onClick={() => { openDropDown === "photos" ? setOpenDropDown("") : setOpenDropDown("photos") }}>
                    <div className="title">
                        <span>Shared Photos</span>
                        <div className="image">
                            <HiOutlineChevronUp className={` transition-all duration-200 ${openDropDown === "photos" ? " rotate-180" : " rotate-0"}`} />
                        </div>
                    </div>
                    {openDropDown === "photos" &&
                        (<div className="photos">
                            {photos.map((photo) => (
                                <div className="photoItem" onClick={() => setViewImage(photo?.img)}>
                                    <div className="photoDetail">
                                        <img src={photo?.img} alt="" />
                                        <span>{photo?.imgName || "Image"}</span>
                                    </div>
                                    <FiDownload className="icon" onClick={() => saveImage(photo?.img, token)} />

                                </div>
                            ))}
                        </div>
                        )}
                </div>
                <div className="option cursor-pointer" onClick={() => { openDropDown === "privacy" ? setOpenDropDown("") : setOpenDropDown("privacy") }}>
                    <div className="title">
                        <span>Privacy & Help</span>
                        <div className="image">
                            <HiOutlineChevronUp className={` transition-all duration-200 ${openDropDown === "privacy" ? " rotate-180" : " rotate-0"}`} />
                        </div>
                    </div>
                    {openDropDown === "privacy" &&
                        (<div className="privacyItem">
                            <p className="privacyMessage">
                                {isCurrentUserBlocked
                                    ? "You are currently blocked by this user. You cannot change this setting. Contact support for more information."
                                    : isReceiverBlocked
                                        ? "This user is currently blocked by you. You can unblock this user from the settings option."
                                        : "Neither of you are blocked. You can freely chat and share information. You can block this user from the settings option."}
                            </p>
                            <p className="privacyMessage">
                                Manage Privacy from Settings option.
                            </p>
                            <p className="privacyMessage">
                                For more detailed information refer to the platform privacy and security policies.
                            </p>


                        </div>
                        )}
                </div>
                <div className="option cursor-pointer" onClick={() => { openDropDown === "settings" ? setOpenDropDown("") : setOpenDropDown("settings") }}>
                    <div className="title">
                        <span>Chat Settings</span>
                        <div className="image">
                            <HiOutlineChevronUp className={` transition-all duration-200 ${openDropDown === "settings" ? " rotate-180" : " rotate-0"}`} />
                        </div>
                    </div>
                    {openDropDown === "settings" &&
                        (<div className="settings">
                            <button onClick={handleBlock} >{isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"}</button>
                            <button className="more" onClick={() => navigate(`/profile/${user?.username}`)}>More Settings</button>

                        </div>
                        )}
                </div>
            </div>
            {viewImage && <ViewPhoto image={viewImage} setViewImage={setViewImage} />}
        </div>
    );
};

export default Detail;