// ==========================================
// firebase-config.js (Ultra-Fast & Secure Edition - FIXED)
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyDl2hNCmCBhlu25OxC3o4E-Pc_Mf3nwdPI",
    authDomain: "chandan-projects.firebaseapp.com",
    databaseURL: "https://chandan-projects-default-rtdb.firebaseio.com",
    projectId: "chandan-projects",
    storageBucket: "chandan-projects.firebasestorage.app",
    messagingSenderId: "306771836296",
    appId: "1:306771836296:web:ee2dec34dcf56ceddd0e3d",
    measurementId: "G-2MD1Y8BEWY"
};

// 1. INITIALIZE FIREBASE (Avoid duplicate initialization)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ==========================================
// 🚀 1. INDESTRUCTIBLE SESSION MANAGER (Dual-Engine)
// ==========================================
function secureSessionEngine() {
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : null;
    }
    function setCookie(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=/";
    }

    let localEmail = localStorage.getItem("loggedInEmail");
    let localName = localStorage.getItem("loggedInName");
    
    let cookieEmail = getCookie("loggedInEmail");
    let cookieName = getCookie("loggedInName");

    if (!localEmail && cookieEmail) {
        localStorage.setItem("loggedInEmail", cookieEmail);
        if (cookieName) localStorage.setItem("loggedInName", cookieName);
    } 
    else if (localEmail && !cookieEmail) {
        setCookie("loggedInEmail", localEmail, 365);
        if (localName) setCookie("loggedInName", localName, 365);
    }
}
secureSessionEngine();


// ==========================================
// ⚡ 2. BACKGROUND DATA PRE-FETCHER (Makes App Ultra Fast)
// ==========================================
function prefetchAppData() {
    setTimeout(() => {
        // Direct firebase.database() use kiya hai bina 'db' variable banaye taaki error na aaye
        firebase.database().ref('homepage_config').once('value').then(snap => {
            if (snap.exists()) {
                localStorage.setItem("userCachedHomeLayout", JSON.stringify(snap.val()));
            }
        });

        firebase.database().ref('menu_categories').once('value').then(snap => {
            if (snap.exists()) {
                const val = snap.val();
                const normalizedCats = Array.isArray(val) ? val : Object.values(val);
                localStorage.setItem("userCachedMenuCats", JSON.stringify(normalizedCats));
            }
        });

        firebase.database().ref('menu_config').once('value').then(snap => {
            if (snap.exists()) {
                const val = snap.val();
                const normalizedMenu = Array.isArray(val) ? val : Object.values(val);
                localStorage.setItem("userCachedMenuProducts", JSON.stringify(normalizedMenu));
            }
        });
    }, 1000); 
}
prefetchAppData();


// ==========================================
// 🌐 3. NETWORK CONNECTION WATCHER
// ==========================================
window.addEventListener('offline', () => {
    console.warn("You are offline. Showing cached data.");
});

window.addEventListener('online', () => {
    console.log("Back online. Syncing data...");
    prefetchAppData(); 
});


// ==========================================
// 🎨 4. NATIVE APP UI ENHANCER (Fixes Blue Tap Highlight)
// ==========================================
(function applyNativeUIFixes() {
    // Ek naya style tag banate hain
    const style = document.createElement('style');
    
    // CSS rules add karte hain
    style.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent !important;
        }
        /* Optional: Agar user text select na kar paye (native feel ke liye) */
        body {
            -webkit-user-select: none;
            user-select: none;
        }
    `;
    
    // Head section me inject kar dete hain
    document.head.appendChild(style);
})();