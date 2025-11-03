// ui/pageMap.js
// ATUALIZADO: Esta página agora é o HUB de seleção de modo.

import { getPageHeader } from './components.js';

export function renderMap(userProfile, allLektions) {
    const page = document.getElementById('page-map');
    
    page.innerHTML = `
        ${getPageHeader('Mapa', '#/home', 'Início')}
        
        <p class="text-lg text-secondary mb-8">
            Escolha seu modo de estudo para hoje.
        </p>
        
        <a href="#/lessons" id="go-to-lessons-btn" class="inset-group p-6 mb-6 flex items-center gap-6 cursor-pointer" 
           style="text-decoration: none; color: var(--text);">
            <ion-icon name="map-outline" class="w-16 h-16 flex-shrink-0" style="color: var(--primary);"></ion-icon>
            <div class="flex-grow">
                <h2 class="text-2xl font-bold mb-1">Lições Regulares</h2>
                <p class="text-secondary">Siga o mapa de aprendizado, complete lições e ganhe pontos.</p>
            </div>
            <ion-icon name="chevron-forward-outline" class="w-8 h-8 text-secondary flex-shrink-0"></ion-icon>
        </a>
        
        <div id="start-trainer-btn" class="inset-group p-6 mb-6 flex items-center gap-6 cursor-pointer">
            <ion-icon name="albums-outline" class="w-16 h-16 flex-shrink-0" style="color: var(--accent);"></ion-icon>
            <div class="flex-grow">
                <h2 class="text-2xl font-bold mb-1">Treinador de Artigos</h2>
                <p class="text-secondary">Pratique "Der, Die, Das" em um mini-jogo rápido de memorização.</p>
            </div>
            <ion-icon name="chevron-forward-outline" class="w-8 h-8 text-secondary flex-shrink-0"></ion-icon>
        </div>
    `;
    
    // Os listeners de clique são tratados no main.js
}
