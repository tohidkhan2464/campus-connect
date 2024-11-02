import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "react-chat-app-25799.firebaseapp.com",
  projectId: "react-chat-app-25799",
  storageBucket: "react-chat-app-25799.appspot.com",
  messagingSenderId: "531721096206",
  appId: "1:531721096206:web:f57b3bba09bcb406cdc05f",
  measurementId: "G-FBEWESCHZ9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const generateToken = async (user) => {
  const permission = await Notification.requestPermission();
  console.log("permission", permission);

  if (permission === "granted") {
    const notificationToken = await getToken(messaging, {
      vapidKey:
        "BEnCq1eUY06syEmm6f2lU-Mlt3Ky6z1H7Sb7a6C1IJQonja1zaBE0LVm676yD7FGlwVofBTLnA4HkDL0WFSty8w",
    });

    console.log("user", user);
    console.log(notificationToken);
    const userRef = collection(db, "users");

    await updateDoc(doc(userRef, user._id), {
      notificationToken: notificationToken,
    });
  }
};
