import React, { useEffect } from "react";
import { usechatStore } from "../lib/chatStore";
import { useUserStore } from "../lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import List from "../components/Chat/list/List";
import Chat from "../components/Chat/chat/Chat";
import Detail from "../components/Chat/detail/Detail";
import { useSelector } from "react-redux";

const Messages = () => {
  const { isLoading, fetchUserInfo } = useUserStore();

  const { user } = useSelector((state) => state.profile);
  const { chatId, isCurrentUserBlocked, isReceiverBlocked } = usechatStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      fetchUserInfo(user?._id);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo, user?._id, isCurrentUserBlocked, isReceiverBlocked]);

  // useEffect(() => {}, [chatId]);
  if (isLoading) return <div className="loader">Loading...</div>;

  return (
    <div className="w-10/12 mobileS:w-11/12 h-full mx-auto flex items-start justify-center">
      <div className="w-11/12 mobileS:w-full mx-auto h-full flex items-start justify-start bg-[#111928bf] rounded-xl mt-10">
        <div
          className={`h-[800px] mobileS:h-[80vh] w-[100%] mx-auto flex mobileS:flex-col  items-start justify-start `}
        >
          {/* <List /> */}
          {/* {chatId && <Chat />} */}
          {chatId && <Detail />}
          {!chatId && (
            <div
              className={`flex flex-col w-[70%] mobileS:w-full mobileS:h-full mobileS:justify-start mobileS:mt-10 items-center justify-center h-[800px] border-l-[1px] border-l-[#dddddd35]`}
            >
              <h1 className="text-white w-full text-4xl mobileS:text-2xl text-center">
                Select a chat to start messaging
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
