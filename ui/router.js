// ui/router.js
import { hideModal } from './modal.js';
import { updateNavLinks } from './navigation.js';
import { renderHome } from './pageHome.js';
import { renderMap } from './pageMap.js';
// NOVO: Importa o mapa de lições
import { renderLessonMap } from './pageLessons.js'; 
import { renderProgress } from './pageProgress.js';
import { renderSettings, renderThemeSettings } from './pageSettings.js';
import { renderReview } from './pageReview.js'; 
import { renderProfileSettings } from './pageProfile.js';
import { renderExercisePage } from '../exerciseService.js'; 
// NOVO: Importa o treinador
import { renderArticleTrainer } from './pageArticleTrainer.js';

// ATUALIZAÇÃO: Adiciona 'lessons' e 'trainer'
const pages = [
    'home', 'map', 'lessons', 'progress', 'review', 'settings', 'exercise', 
    'settings-theme', 'settings-profile', 'trainer'
];

function hideAllPages() {
    pages.forEach(pageId => {
        const pageEl = document.getElementById(`page-${pageId}`);
        if (pageEl) pageEl.classList.add('hidden');
    });
}

function showPage(pageId) {
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}

export function router(path, subpath, userProfile, allLektions, baseThemes, accentColors) {
    if (!userProfile) return; 

    hideModal();
    hideAllPages();
    
    // Atualiza o link da barra de navegação
    // Rotas "filhas" como 'lessons' ou 'trainer' não terão link ativo na barra
    updateNavLinks(path);

    // Lógica de roteamento atualizada
    switch (path) {
        case 'home': 
            showPage('home');
            renderHome(userProfile, allLektions); 
            break;
        case 'map': 
            showPage('map');
            renderMap(userProfile, allLektions); // O Hub de Seleção
            break;
        // NOVO: Rota para o mapa de lições
        case 'lessons':
            showPage('lessons');
            renderLessonMap(userProfile, allLektions); // O Mapa de Lições
            break;
        case 'progress': 
            showPage('progress');
            renderProgress(userProfile, allLektions); 
            break;
        case 'review':
            showPage('review');
            renderReview(userProfile, allLektions);
            break;
        case 'settings':
            if (subpath === 'theme') {
                showPage('settings-theme');
                renderThemeSettings(userProfile, baseThemes, accentColors);
            } else if (subpath === 'profile') {
                showPage('settings-profile');
                renderProfileSettings(userProfile);
            } else {
                showPage('settings');
                renderSettings(userProfile);
            }
            break;
        case 'exercise': 
            showPage('exercise');
            renderExercisePage(); 
            break;
        // NOVO: Rota para o treinador
        case 'trainer':
            showPage('trainer');
            renderArticleTrainer();
            break;
        default:
            showPage('home');
            renderHome(userProfile, allLektions);
    }
}
