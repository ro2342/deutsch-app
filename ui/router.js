// ui/router.js
import { hideModal } from './modal.js';
import { updateNavLinks } from './navigation.js';
import { renderHome } from './pageHome.js';
import { renderMap } from './pageMap.js';
import { renderProgress } from './pageProgress.js';
import { renderSettings, renderThemeSettings } from './pageSettings.js';
import { renderReview } from './pageReview.js'; 
import { renderProfileSettings } from './pageProfile.js';
import { renderExercisePage } from '../exerciseService.js'; 

const pages = [
    'home', 'map', 'progress', 'review', 'settings', 'exercise', 
    'settings-theme', 'settings-profile'
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

/**
 * ATUALIZADO: O router agora recebe 'baseThemes' e 'accentColors'
 */
export function router(path, subpath, userProfile, allLektions, baseThemes, accentColors) {
    if (!userProfile) return; // Proteção

    hideModal();
    hideAllPages();
    
    if (path === 'settings' && !subpath) {
        updateNavLinks(path);
    } else if (path !== 'settings') {
         updateNavLinks(path);
    } else {
        updateNavLinks('settings');
    }

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
        case 'review':
            showPage('review');
            renderReview(userProfile, allLektions);
            break;
        case 'settings':
            if (subpath === 'theme') {
                showPage('settings-theme');
                // ATUALIZADO: Passa os novos objetos de tema
                renderThemeSettings(userProfile, baseThemes, accentColors);
            } else if (subpath === 'profile') {
                showPage('settings-profile');
                renderProfileSettings(userProfile);
            } else {
                showPage('settings');
                // ATUALIZADO: Não precisa mais passar os temas para a pág. principal
                renderSettings(userProfile);
            }
            break;
        case 'exercise': 
            showPage('exercise');
            renderExercisePage(); 
            break;
        default:
            showPage('home');
            renderHome(userProfile, allLektions);
    }
}
