import React, { useEffect, useState } from "react";
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
  const { chatId, isCurrentUserBlocked, isReceiverBlocked, changeChat } =
    usechatStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      fetchUserInfo(user?._id);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo, user?._id, isCurrentUserBlocked, isReceiverBlocked]);

  const [showList, setShowList] = useState(true);
  const [windowSize, setWindowSize] = useState({ height: "", width: "" });

  const [showChat, setShowChat] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleChatSelect = () => {
    if (windowSize.width <= 1024) {
      setShowChat(true);
      setShowDetail(false);
      setShowList(false);
    } else {
      setShowChat(true);
      setShowDetail(true);
      setShowList(true);
    }
  };

  const handleChatUnSelect = () => {
    if (windowSize.width <= 1024) {
      setShowChat(false);
      setShowDetail(false);
      setShowList(true);
      changeChat(null, user);
    } else {
      setShowChat(true);
      setShowDetail(true);
      setShowList(true);
      changeChat(null, user);
    }
  };

  const handleDetailSelect = () => {
    if (windowSize.width <= 1024) {
      setShowDetail(true);
      setShowChat(false);
      setShowList(false);
    } else {
      setShowChat(true);
      setShowDetail(true);
      setShowList(true);
    }
  };

  const handleDetailUnSelect = () => {
    if (windowSize.width <= 1024) {
      setShowDetail(false);
      setShowChat(true);
      setShowList(false);
    } else {
      setShowChat(true);
      setShowDetail(true);
      setShowList(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!chatId) {
      setShowChat(false);
      setShowDetail(false);
    }
  }, [chatId]);

  if (isLoading) return <div className="loader">Loading...</div>;

  return (
    <div className="w-10/12 mobileS:w-11/12 laptop:w-9/12 mobileL:w-11/12 tablet:w-11/12 mobileM:w-11/12 h-full mx-auto flex  items-start justify-center">
      <div className="w-11/12 mobileS:w-full laptopL:w-10/12 laptop:w-10/12 mobileM:w-full mobileL:w-full tablet:w-full mx-auto h-full flex items-start justify-start bg-[#111928bf] tablet:mb-10 rounded-xl mt-10">
        <div
          className={`h-[800px] mobileS:h-[80vh] laptop:h-[80vh] laptop:flex-col mobileL:h-[80vh] mobileL:flex-col tablet:h-[80vh] mobileM:h-[80vh] tablet:flex-col mobileM:flex-col w-[100%] mx-auto flex mobileS:flex-col  items-start justify-start `}
        >
          {showList && <List handleChatSelect={handleChatSelect} />}
          {showChat && chatId && (
            <Chat
              handleDetailSelect={handleDetailSelect}
              handleChatUnSelect={handleChatUnSelect}
            />
          )}
          {showDetail && chatId && (
            <Detail handleDetailUnSelect={handleDetailUnSelect} />
          )}
          {!chatId && (
            <div
              className={`flex flex-col w-[70%] mobileS:w-full laptop:w-full mobileL:w-full mobileL:px-5 tablet:w-full mobileL:mt-10 mobileM:w-full mobileM:h-full mobileM:px-5 mobileM:justify-start mobileM:mt-10 mobileS:h-full mobileS:justify-start mobileS:mt-10 items-center justify-center h-[800px] border-l-[1px] border-l-[#dddddd35]`}
            >
              <h1 className="text-white w-full text-4xl mobileS:text-2xl mobileL:text-3xl mobileM:text-2xl  text-center">
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
