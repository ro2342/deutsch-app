// main.js - Ponto de entrada principal do App
import { db, auth, setupAuthListener, listenToProfile, saveProfileData, signOutUser } from './firebaseService.js';
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
// ATUALIZADO: Passa ambos os objetos de tema
const baseThemes = window.baseThemes || {};
const accentColors = window.accentColors || {};

// --- Inicialização ---

function initApp() {
    // 1. Inicializa serviços de UI
    initThemeService(baseThemes, accentColors); // Passa ambos
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

        // 6. ATUALIZADO: Aplica o tema com base e destaque
        applyTheme(userProfile.themeBase, userProfile.themeAccent);
        
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
    
    const parts = currentHash.substring(2).split('/');
    const path = parts[0] || 'home';
    const subpath = parts[1] || null;
    
    if (path === 'menu') return;

    // ATUALIZADO: Passa os novos objetos de tema para o roteador
    router(path, subpath, userProfile, allLektions, baseThemes, accentColors);
}

// --- Listeners de Eventos Globais ---

function addGlobalClickListeners() {
    document.body.addEventListener('click', async (e) => {
        
        // Listener para o Mapa -> Iniciar Lição
        const lektionCard = e.target.closest('.lektion-card:not(.locked)');
        if (lektionCard) {
            const lektionId = parseInt(lektionCard.dataset.lektionId);
            startLektion(lektionId); 
            return; 
        }

        // Listener para a Página de Revisão -> Iniciar Sessão
        const reviewBtn = e.target.closest('#start-review-btn');
        if (reviewBtn) {
            startReviewSession(); 
            return;
        }

        // --- ATUALIZAÇÃO: Novos Listeners de Tema ---
        
        // 1. Listener para MODO DE EXIBIÇÃO (Claro/Escuro)
        const baseThemeBtn = e.target.closest('[data-base-theme]');
        if (baseThemeBtn) {
            const newBase = baseThemeBtn.dataset.baseTheme;
            userProfile.themeBase = newBase; // Atualiza o perfil local
            applyTheme(newBase, userProfile.themeAccent); // Aplica imediatamente
            try {
                // Salva só o 'base' no Firebase
                saveProfileData(userId, { themeBase: newBase });
            } catch (err) {
                showModal("Erro", "Não foi possível salvar seu tema.");
            }
            handleRouting(); // Re-renderiza a página de temas
            return;
        }

        // 2. Listener para COR DE DESTAQUE
        const accentColorBtn = e.target.closest('[data-accent-color]');
        if (accentColorBtn) {
            const newAccent = accentColorBtn.dataset.accentColor;
            userProfile.themeAccent = newAccent; // Atualiza o perfil local
            applyTheme(userProfile.themeBase, newAccent); // Aplica imediatamente
            try {
                // Salva só o 'accent' no Firebase
                saveProfileData(userId, { themeAccent: newAccent });
            } catch (err) {
                showModal("Erro", "Não foi possível salvar sua cor.");
            }
            handleRouting(); // Re-renderiza a página de temas
            return;
        }
        
        // --- Fim dos Listeners de Tema ---

        // Listener para salvar o perfil
        const saveProfileBtn = e.target.closest('#save-profile-btn');
        if (saveProfileBtn) {
            const newName = document.getElementById('profile-name-input').value;
            if (!newName || newName.trim().length === 0) {
                showModal("Erro", "O nome não pode ficar em branco.");
                return;
            }
            
            showLoading("Salvando...");
            try {
                await saveProfileData(userId, { name: newName.trim() });
                hideModal();
                window.location.hash = '#/settings'; // Volta para Ajustes
            } catch (error) {
                hideModal();
                showModal("Erro ao Salvar", error.message);
            }
            return;
        }

        // Listener para Configurações -> Logout
        const logoutBtn = e.target.closest('#logout-btn');
        if (logoutBtn) {
            showLoading("Saindo...");
            try {
                await signOutUser(); 
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
