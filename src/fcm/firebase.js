import { initializeApp } from 'firebase/app';
import { getMessaging, getToken,onMessage} from 'firebase/messaging';
// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.

    const firebaseConfig = {
        apiKey: "AIzaSyBja9Ag1jwINBONX-wWddy3N5_CRzsTadg",
        authDomain: "operator-80283.firebaseapp.com",
        projectId: "operator-80283",
        storageBucket: "operator-80283.appspot.com",
        messagingSenderId: "617798184955",
        appId: "1:617798184955:web:9ef57c2a881a85edf5255e",
        measurementId: "G-3F8G35EP1S"
    };
    const messaging = null;
    if(window.location.hostname=='localhost' || window.location.hostname=='127.0.0.1'){

    const app = initializeApp(firebaseConfig);


    const messaging = getMessaging();
    }

    export const requestForToken = () => {
        if(window.location.hostname=='localhost' || window.location.hostname=='127.0.0.1'){
            return getToken(messaging, { vapidKey: "BHCrdPRAd7_45XWozichENEqs1E0P91HpHBgOx8dy-PXx5SYS7V-wpQmgQsLoV6a7W3KSLFrTmvnp9fAWvXWKEQ" })
            .then((currentToken) => {
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                    localStorage.setItem('fcm_token',currentToken);
                    // Perform any other neccessary action with the token
                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        } else {
            console.log('Unsopperted browser')
        }
        
    };

    export const onMessageListener = () =>{
        if(window.location.hostname=='localhost' || window.location.hostname=='127.0.0.1'){
            return new Promise((resolve) => {
                onMessage(messaging, (payload) => {
                    console.log("payload", payload)
                    resolve(payload);
                });
            });
        } else {
            new Promise((resolve) => {
                resolve('Unsopperted browser');
            });
        }
        
    }
        

