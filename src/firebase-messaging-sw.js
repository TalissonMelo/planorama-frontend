importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDh2q-EDmVTvKNsiAcIkx4hdrgUFb56ctQ",
  authDomain: "planorama-firebase.firebaseapp.com",
  projectId: "planorama-firebase",
  storageBucket: "planorama-firebase.appspot.com",
  messagingSenderId: "886060142636",
  appId: "1:886060142636:web:2e26b9f3ed032b885a0189"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
