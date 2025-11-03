// ui/router.js
import { hideModal } from './modal.js';
import { updateNavLinks } from './navigation.js';
import { renderHome } from './pageHome.js';
import { renderMap } from './pageMap.js';
import { renderLessonMap } from './pageLessons.js'; 
import { renderProgress } from './pageProgress.js';
import { renderSettings, renderThemeSettings } from './pageSettings.js';
import { renderReview } from './pageReview.js'; 
import { renderProfileSettings } from './pageProfile.js';
import { renderExercisePage } from '../exerciseService.js'; 
// ATUALIZAÇÃO: Importa do serviço, não da página
import { renderCurrentTrainerState } from '../articleTrainerService.js';

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
        case 'trainer':
            showPage('trainer');
            // ATUALIZAÇÃO: Chama a função correta
            renderCurrentTrainerState(); 
            break;
        default:
            showPage('home');
            renderHome(userProfile, allLektions);
    }
}
