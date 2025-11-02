// ui/router.js
import { hideModal } from './modal.js';
import { updateNavLinks } from './navigation.js';
import { renderHome } from './pageHome.js';
import { renderMap } from './pageMap.js';
import { renderProgress } from './pageProgress.js';
import { renderSettings } from './pageSettings.js';
import { renderExercisePage } from '../exerciseService.js'; // Importa do nível acima

const pages = ['home', 'map', 'progress', 'settings', 'exercise'];

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

export function router(path, userProfile, allLektions, allThemes) {
    if (!userProfile) return; // Proteção

    hideModal();
    hideAllPages();
    updateNavLinks(path);

    showPage(path);
    switch (path) {
        case 'home': 
            renderHome(userProfile, allLektions); 
            break;
        case 'map': 
            renderMap(userProfile, allLektions); 
            break;
        case 'progress': 
            renderProgress(userProfile, allLektions); 
            break;
        case 'settings': 
            renderSettings(userProfile, allThemes); 
            break;
        case 'exercise': 
            renderExercisePage(); // O exerciseService cuida de si mesmo
            break;
        default:
            showPage('home');
            renderHome(userProfile, allLektions);
    }
}
