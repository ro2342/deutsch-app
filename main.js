// main.js - Ponto de entrada principal do App
import { db, auth, setupAuthListener, listenToProfile, saveProfileData, signOutUser } from './firebaseService.js';
// ATUALIZADO: Importa 'startLektion' e o novo 'startReviewSession'
import { initExerciseService, updateExerciseServiceProfile, startLektion, startReviewSession } from './exerciseService.js';
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

/**
 * ATUALIZAÇÃO: O handleRouting agora divide a rota em 'path' e 'subpath'
 * Ex: #/settings/theme -> path = 'settings', subpath = 'theme'
 */
function handleRouting() {
    if (!userId) return; 
    const currentHash = window.location.hash || '#/home';
    
    // Remove o '#/' e divide a rota
    const parts = currentHash.substring(2).split('/');
    const path = parts[0] || 'home';
    const subpath = parts[1] || null;
    
    if (path === 'menu') return;

    // Chama o roteador da UI com ambos os paths
    // ATUALIZADO: Passa allLektions para o router
    router(path, subpath, userProfile, allLektions, allThemes);
}

// --- Listeners de Eventos Globais ---

function addGlobalClickListeners() {
    document.body.addEventListener('click', async (e) => {
        
        // Listener para o Mapa -> Iniciar Lição (Sem mudança)
        const lektionCard = e.target.closest('.lektion-card:not(.locked)');
        if (lektionCard) {
            const lektionId = parseInt(lektionCard.dataset.lektionId);
            startLektion(lektionId); // Chama o exerciseService
            return; // Impede outros cliques
        }

        // NOVO: Listener para a Página de Revisão -> Iniciar Sessão
        const reviewBtn = e.target.closest('#start-review-btn');
        if (reviewBtn) {
            startReviewSession(); // Chama o exerciseService
            return;
        }

        // ATUALIZAÇÃO: Listener para a NOVA lista de temas
        const themeOptionItem = e.target.closest('.theme-option-item');
        if (themeOptionItem) {
            const themeName = themeOptionItem.dataset.theme;
            applyTheme(themeName); // Chama o themeService
            try {
                // Salva no Firebase sem bloquear a UI
                saveProfileData(userId, { theme: themeName });
            } catch (err) {
                showModal("Erro", "Não foi possível salvar seu tema.");
            }
            // Re-renderiza a página de temas para mostrar o "check" no lugar certo
            handleRouting();
            return;
        }

        // Listener para Configurações -> Logout (Sem mudança)
        const logoutBtn = e.target.closest('#logout-btn');
        if (logoutBtn) {
            showLoading("Saindo...");
            try {
                await signOutUser(); // Chama o firebaseService
            } catch (error) {
                hideModal();
                showModal("Erro ao Sair", error.message);
            }
            return;
        }
    });
}

// --- Iniciar o App ---
initApp();
