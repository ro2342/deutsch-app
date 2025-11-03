// firebaseService.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// SUA Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyfUhhftcrV1piHd8f-4wYaB9iatLUcXU",
    authDomain: "deutsch-39779.firebaseapp.com",
    projectId: "deutsch-39779",
    storageBucket: "deutsch-39779.firebasestorage.app",
    messagingSenderId: "672743327567",
    appId: "1:672743327567:web:8875f89b1f282b7aba273a",
    measurementId: "G-XYVLCZD740"
};

// Inicializa e exporta os serviços
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Ouve o estado de autenticação do usuário.
 * @param {function} onUserLoggedIn - Callback se o usuário estiver logado.
 * @param {function} onUserLoggedOut - Callback se o usuário não estiver logado.
 */
export function setupAuthListener(onUserLoggedIn, onUserLoggedOut) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem('deutschAppUserId', user.uid);
            onUserLoggedIn(user.uid);
        } else {
            localStorage.removeItem('deutschAppUserId');
            onUserLoggedOut();
        }
    });
}

/**
 * Desloga o usuário.
 */
export async function signOutUser() {
    await signOut(auth);
    localStorage.clear();
}

/**
 * Ouve as mudanças no perfil do usuário no Firestore.
 * @param {string} userId - O ID do usuário.
 * @param {function} onProfileUpdate - Callback chamado com os dados do perfil.
 * @returns {function} - A função unsubscribe.
 */
export function listenToProfile(userId, onProfileUpdate) {
    const profileDocRef = doc(db, "users", userId, "profile", "data");
    
    // Perfil Padrão com as novas propriedades de tema
    const defaultProfile = {
        score: 0,
        inProgressLektions: {},
        lektionStats: {}, 
        failedExercises: {}, 
        themeBase: 'light',     // ATUALIZADO
        themeAccent: 'purple',  // ATUALIZADO
        name: 'Estudante',
        avatarUrl: ''
        
        // SUA NOVA FEATURE AQUI:
    articleTrainingStats: {
        streak: 0,
        correctAnswers: 0,
        totalAttempts: 0
    }
    
    };

    return onSnapshot(profileDocRef, (docSnap) => {
        const googleUser = auth.currentUser;
        let userProfile;

        if (docSnap.exists()) {
            const data = docSnap.data();
            userProfile = {
                ...defaultProfile, 
                ...data, 
                name: data.name || googleUser?.displayName || 'Estudante',
                avatarUrl: data.avatarUrl || googleUser?.photoURL || ''
            };
            // Remove o 'theme' antigo se ele ainda existir
            if (userProfile.theme) delete userProfile.theme; 
        } else {
            console.log("Nenhum perfil encontrado, criando um novo...");
            userProfile = {
                ...defaultProfile,
                name: googleUser?.displayName || 'Estudante',
                avatarUrl: googleUser?.photoURL || '',
                uid: userId,
                email: googleUser?.email || ''
            };
            saveProfileData(userId, userProfile); 
        }
        onProfileUpdate(userProfile); 
        
    }, (error) => {
        console.error("Erro ao ouvir perfil:", error);
        document.getElementById('page-loader').innerHTML = `<p class="text-red-500">Erro ao carregar perfil: ${error.message}</p>`;
    });
}

/**
 * Função genérica para salvar dados no perfil.
 * @param {string} userId - O ID do usuário.
 * @param {object} dataToSave - Os dados para salvar/mesclar.
 */
export async function saveProfileData(userId, dataToSave) {
    if (!userId) return;
    const profileDocRef = doc(db, "users", userId, "profile", "data");

    try {
        await setDoc(profileDocRef, {
            ...dataToSave,
            lastUpdated: serverTimestamp()
        }, { merge: true }); 
        console.log("Dados salvos com sucesso:", dataToSave);
    } catch (error) {
        console.error("Erro ao salvar dados do perfil:", error);
        throw error; 
    }
}

/**
 * Pega os dados do perfil UMA VEZ.
 * @param {string} userId - O ID do usuário.
 * @returns {object} - Os dados do perfil.
 */
export async function getProfileDataOnce(userId) {
    const profileDocRef = doc(db, "users", userId, "profile", "data");
    const docSnap = await getDoc(profileDocRef);
    
    // Garante que o perfil retornado tenha os campos padrão
    const data = docSnap.data() || {};
    const profile = {
        score: 0,
        inProgressLektions: {},
        lektionStats: {},
        failedExercises: {},
        themeBase: 'light',
        themeAccent: 'purple',
        ...data
    };
    
    // Lógica de migração: se o 'theme' antigo existir, converte-o
    if (profile.theme) {
        // Tenta mapear o tema antigo para uma cor de destaque
        const themeMap = {
            'taylorSwift': 'beige',
            'fearless': 'yellow',
            'speakNow': 'purple',
            'red': 'red',
            'nineteen89': 'lightBlue',
            'reputation': 'gray',
            'lover': 'pink',
            'folklore': 'gray',
            'evermore': 'brown',
            'midnights': 'darkBlue',
            'ttpd': 'gray',
            'showgirl': 'orange'
        };
        profile.themeAccent = themeMap[profile.theme] || 'purple';
        // Define o modo base com base no tema antigo
        profile.themeBase = (profile.theme === 'dark' || profile.theme === 'reputation' || profile.theme === 'midnights') ? 'dark' : 'light';
        delete profile.theme; // Remove o campo antigo
    }
    
    return profile;
}
