// main.js - Ponto de entrada principal do App
import { db, auth, setupAuthListener, listenToProfile, saveProfileData, signOutUser } from './firebaseService.js';
import { initExerciseService, updateExerciseServiceProfile, startLektion } from './exerciseService.js';
import { initThemeService, applyTheme } from './ui/theme.js';
import { showModal, hideModal, showLoading, hidePageLoader, showPageLoaderError } from './ui/modal.js';
import { initLiquidNav } from './ui/navigation.js';
import { router } from './ui/router.js';

// --- Variáveis Globais do App ---
let userId = null;
let userProfile = {};
let profileUnsubscribe = () => {};

// Dados estáticos (carregados globalmente pelo app.html)
const allLektions = window.exercisesData || [];
const allGrammar = window.grammarExplanations || {};
const allThemes = window.themes || {};

// --- Inicialização ---

function initApp() {
    // 1. Inicializa serviços de UI
    initThemeService(allThemes);
    initLiquidNav();

    // 2. Inicializa serviço de Exercício (com dados estáticos)
    initExerciseService(allLektions, allGrammar);

    // 3. Configura o listener de autenticação
    setupAuthListener(onUserLoggedIn, onUserLoggedOut);
}

function onUserLoggedIn(uid) {
    userId = uid;
    
    // 4. Ouve o perfil do usuário
    profileUnsubscribe = listenToProfile(userId, (profile) => {
        userProfile = profile;
        
        // 5. Atualiza o exerciseService com os dados dinâmicos do perfil
        updateExerciseServiceProfile(userProfile, userId);

        // 6. Aplica o tema vindo do perfil
        applyTheme(userProfile.theme || 'taylorSwift');
        
        // 7. Esconde o loader e inicia o roteador
        hidePageLoader();
        handleRouting(); // Chama o roteador pela primeira vez
    });

    // 8. Configura listeners globais
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);
    addGlobalClickListeners();
}

function onUserLoggedOut() {
    userId = null;
    userProfile = {};
    if (profileUnsubscribe) profileUnsubscribe();
    window.location.href = 'index.html';
}

// --- Roteador Principal ---

function handleRouting() {
    if (!userId) return; 
    const currentHash = window.location.hash || '#/home';
    const [path] = currentHash.substring(2).split('/');
    
    if (path === 'menu') return;

    // Chama o roteador da UI
    router(path || 'home', userProfile, allLektions, allThemes);
}

// --- Listeners de Eventos Globais ---
// Aqui é onde a "mágica" acontece. O main.js ouve os cliques
// e diz aos outros serviços o que fazer.
function addGlobalClickListeners() {
    document.body.addEventListener('click', async (e) => {
        
        // Listener para o Mapa -> Iniciar Lição
        const lektionCard = e.target.closest('.lektion-card:not(.locked)');
        if (lektionCard) {
            const lektionId = parseInt(lektionCard.dataset.lektionId);
            startLektion(lektionId); // Chama o exerciseService
        }

        // Listener para Configurações -> Mudar Tema
        const themeOption = e.target.closest('.theme-option');
        if (themeOption) {
            const themeName = themeOption.dataset.theme;
            applyTheme(themeName); // Chama o themeService
            try {
                await saveProfileData(userId, { theme: themeName }); // Chama o firebaseService
            } catch (err) {
                showModal("Erro", "Não foi possível salvar seu tema.");
            }
            handleRouting(); // Re-renderiza a página de configurações
        }

        // Listener para Configurações -> Logout
        const logoutBtn = e.target.closest('#logout-btn');
        if (logoutBtn) {
            showLoading("Saindo...");
            try {
                await signOutUser(); // Chama o firebaseService
            } catch (error) {
                hideModal();
                showModal("Erro ao Sair", error.message);
            }
        }
    });
}

// --- Iniciar o App ---
initApp();
