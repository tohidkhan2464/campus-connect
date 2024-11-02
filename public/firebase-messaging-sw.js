importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-chat-app-25799.firebaseapp.com",
  projectId: "react-chat-app-25799",
  storageBucket: "react-chat-app-25799.appspot.com",
  messagingSenderId: "531721096206",
  appId: "1:531721096206:web:f57b3bba09bcb406cdc05f",
  measurementId: "G-FBEWESCHZ9",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.notification.title;
  const notificationOptions = {
    body: payload.data.notification.body,
    // icon: payload.data.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});