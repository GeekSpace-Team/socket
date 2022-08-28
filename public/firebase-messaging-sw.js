importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBja9Ag1jwINBONX-wWddy3N5_CRzsTadg",
    authDomain: "operator-80283.firebaseapp.com",
    projectId: "operator-80283",
    storageBucket: "operator-80283.appspot.com",
    messagingSenderId: "617798184955",
    appId: "1:617798184955:web:9ef57c2a881a85edf5255e",
    measurementId: "G-3F8G35EP1S"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});