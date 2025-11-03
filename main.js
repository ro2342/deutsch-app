// main.js - Ponto de entrada principal do App
import { db, auth, setupAuthListener, listenToProfile, saveProfileData, signOutUser } from './firebaseService.js';
import { initExerciseService, updateExerciseServiceProfile, startLektion, startReviewSession } from './exerciseService.js';
// NOVO: Importa o novo serviço
import { initArticleTrainer, updateTrainerProfile, startTrainer, checkArticle, pickNextWord } from './articleTrainerService.js';
import { initThemeService, applyTheme } from './ui/theme.js';
import { showModal, hideModal, showLoading, hidePageLoader, showPageLoaderError } from './ui/modal.js';
import { initLiquidNav } from './ui/navigation.js';
import { router } from './ui/router.js';

// --- Variáveis Globais do App ---
let userId = null;
let userProfile = {};
let profileUnsubscribe = () => {};

// !! CONSTANTES MOVIDAS DAQUI !!
// As constantes de dados (allLektions, allArticleWords, etc.)
// foram movidas para dentro de initApp() e handleRouting()
// para garantir que window.articleData já exista.

// --- Inicialização ---

function initApp() {
    // !! DADOS CARREGADOS AQUI !!
    const allLektions = window.exercisesData || [];
    const allGrammar = window.grammarExplanations || {};
    const baseThemes = window.baseThemes || {};
    const accentColors = window.accentColors || {};
    const allArticleWords = window.articleData || [];
    
    initThemeService(baseThemes, accentColors);
    initLiquidNav();

    initExerciseService(allLektions, allGrammar);
    // NOVO: Inicializa o treinador
    initArticleTrainer(allArticleWords); 

    setupAuthListener(onUserLoggedIn, onUserLoggedOut);
}

function onUserLoggedIn(uid) {
    userId = uid;
    
    profileUnsubscribe = listenToProfile(userId, (profile) => {
        userProfile = profile;
        
        // Atualiza ambos os serviços com o perfil
        updateExerciseServiceProfile(userProfile, userId);
        updateTrainerProfile(userProfile, userId); 

        applyTheme(userProfile.themeBase, userProfile.themeAccent);
        
        hidePageLoader();
        handleRouting(); 
    });

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

    // !! DADOS CARREGADOS AQUI TAMBÉM !!
    // Garante que o router sempre tenha os dados mais recentes da window
    const allLektions = window.exercisesData || [];
    const baseThemes = window.baseThemes || {};
    const accentColors = window.accentColors || {};

    router(path, subpath, userProfile, allLektions, baseThemes, accentColors);
}

// --- Listeners de Eventos Globais ---

function addGlobalClickListeners() {
    document.body.addEventListener('click', async (e) => {
        
        // --- Listeners do Modo de Estudo (agora em #/map) ---
        // O listener de '#go-to-lessons-btn' não é necessário, pois é um link <a>
        
        const trainerBtn = e.target.closest('#start-trainer-btn');
        if (trainerBtn) {
            startTrainer(); // Inicia o treinador e navega para #/trainer
            return;
        }
        
        // --- Listeners do Mapa de Lições (em #/lessons) ---
        const lektionCard = e.target.closest('.lektion-card:not(.locked)');
        if (lektionCard) {
            const lektionId = parseInt(lektionCard.dataset.lektionId);
            startLektion(lektionId); 
            return; 
        }

        // --- Listeners da Revisão ---
        const reviewBtn = e.target.closest('#start-review-btn');
        if (reviewBtn) {
            startReviewSession(); 
            return;
        }

        // --- Listeners do Treinador de Artigos (em #/trainer) ---
        const articleBtn = e.target.closest('.btn-article');
        if (articleBtn) {
            const chosenArticle = articleBtn.dataset.article;
            checkArticle(chosenArticle); // Verifica a resposta
            return;
        }
        
        const nextWordBtn = e.target.closest('#trainer-next-btn');
        if (nextWordBtn) {
            pickNextWord(); // Pega a próxima palavra
            return;
        }
        
        // --- Listeners de Ajustes ---
        const baseThemeBtn = e.target.closest('[data-base-theme]');
        if (baseThemeBtn) {
            const newBase = baseThemeBtn.dataset.baseTheme;
            userProfile.themeBase = newBase;
            applyTheme(newBase, userProfile.themeAccent);
            try {
                saveProfileData(userId, { themeBase: newBase });
            } catch (err) { showModal("Erro", "Não foi possível salvar seu tema."); }
            handleRouting();
            return;
        }

        const accentColorBtn = e.target.closest('[data-accent-color]');
        if (accentColorBtn) {
            const newAccent = accentColorBtn.dataset.accentColor;
            userProfile.themeAccent = newAccent;
            applyTheme(userProfile.themeBase, newAccent);
            try {
                saveProfileData(userId, { themeAccent: newAccent });
            } catch (err) { showModal("Erro", "Não foi possível salvar sua cor."); }
            handleRouting();
            return;
        }
        
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
                window.location.hash = '#/settings';
            } catch (error) {
                hideModal();
                showModal("Erro ao Salvar", error.message);
            }
            return;
        }

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
