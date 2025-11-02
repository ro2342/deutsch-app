// ui/router.js
import { hideModal } from './modal.js';
import { updateNavLinks } from './navigation.js';
import { renderHome } from './pageHome.js';
import { renderMap } from './pageMap.js';
import { renderProgress } from './pageProgress.js';
// ATUALIZAÇÃO: Importa as duas funções de 'pageSettings'
import { renderSettings, renderThemeSettings } from './pageSettings.js';
import { renderExercisePage } from '../exerciseService.js'; // Importa do nível acima

// ATUALIZAÇÃO: Adiciona a nova página 'settings-theme'
const pages = ['home', 'map', 'progress', 'settings', 'exercise', 'settings-theme'];

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

/**
 * ATUALIZAÇÃO: O router agora recebe 'path' e 'subpath'
 */
export function router(path, subpath, userProfile, allLektions, allThemes) {
    if (!userProfile) return; // Proteção

    hideModal();
    hideAllPages();
    // A barra de navegação só fica ativa na rota principal 'settings'
    updateNavLinks(path);

    // Lógica de roteamento atualizada
    switch (path) {
        case 'home': 
            showPage('home');
            renderHome(userProfile, allLektions); 
            break;
        case 'map': 
            showPage('map');
            renderMap(userProfile, allLektions); 
            break;
        case 'progress': 
            showPage('progress');
            renderProgress(userProfile, allLektions); 
            break;
        case 'settings':
            // Se houver uma sub-rota 'theme', mostra a página de temas
            if (subpath === 'theme') {
                showPage('settings-theme');
                renderThemeSettings(userProfile, allThemes);
            } else {
                // Senão, mostra a página principal de ajustes
                showPage('settings');
                renderSettings(userProfile, allLektions, allThemes); // Passa 'allThemes'
            }
            break;
        case 'exercise': 
            showPage('exercise');
            renderExercisePage(); // O exerciseService cuida de si mesmo
            break;
        default:
            showPage('home');
            renderHome(userProfile, allLektions);
    }
}
