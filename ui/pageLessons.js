// ui/pageLessons.js
// Este é o antigo "Mapa de Aprendizado", agora como uma sub-página.

import { getPageHeader } from './components.js';

export function renderLessonMap(userProfile, allLektions) {
    const page = document.getElementById('page-lessons');
    
    // ATUALIZAÇÃO: Usa os novos objetos de stats
    const stats = userProfile.lektionStats || {};
    const inProgress = userProfile.inProgressLektions || {};

    if (allLektions.length === 0) { 
        page.innerHTML = `${getPageHeader('Lições', '#/map', 'Mapa')}
            <div class="card p-6 text-center">
                <h2 class="text-xl font-bold mb-4 text-red-500">Erro de Carregamento</h2>
                <p class="text-secondary">Não foi possível carregar os dados das lições (<code>exercisesData.js</code>).</p>
            </div>`;
        return;
    }
    
    page.innerHTML = `
        ${getPageHeader('Lições', '#/map', 'Mapa')}
        
        <div class="inset-group">
            ${allLektions.map((lektion, index) => {
                const lektionStats = stats[lektion.id];
                const isCompleted = lektionStats && lektionStats.completed;
                const isInProgress = Object.keys(inProgress).includes(String(lektion.id));
                // ATUALIZAÇÃO: Verifica o stats da lição anterior
                const isLocked = index > 0 && !(stats[allLektions[index - 1].id]?.completed);
                
                let icon = `<span class="text-xl">${index + 1}</span>`;
                if (isLocked) icon = '<ion-icon name="lock-closed-outline" class="w-6 h-6"></ion-icon>';
                else if (isCompleted) icon = '<ion-icon name="checkmark-outline" class="w-6 h-6"></ion-icon>';
                else if (isInProgress) icon = '<ion-icon name="play-outline" class="w-6 h-6"></ion-icon>';
                
                return `
                    <div 
                        id="lektion-${lektion.id}"
                        class="inset-group-item lektion-card ${isLocked ? 'locked' : 'cursor-pointer'}"
                        data-lektion-id="${lektion.id}"
                    >
                        <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" 
                             style="background-color: ${isLocked ? 'var(--border)' : (isCompleted ? '#28a745' : 'var(--primary)')}; color: white;">
                            ${icon}
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-lg font-bold">${lektion.title}</h3>
                            <p class="text-sm text-secondary">${lektion.topics.join(', ')}</p>
                            ${isCompleted ? `
                                <div class="font-medium text-sm mt-1" style="color: var(${lektionStats.correct === lektionStats.total ? 'primary' : 'accent'});">
                                    ${lektionStats.correct} / ${lektionStats.total} Acertos
                                </div>
                            ` : ''}
                        </div>
                        ${!isLocked ? '<ion-icon name="chevron-forward-outline" class="w-6 h-6 text-secondary"></ion-icon>' : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    // Os listeners de clique são adicionados no main.js
}
