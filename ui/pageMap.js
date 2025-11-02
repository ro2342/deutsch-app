// ui/pageMap.js
import { getPageHeader } from './components.js';

export function renderMap(userProfile, allLektions) {
    const page = document.getElementById('page-map');
    const completed = userProfile.completedLektions || [];
    const inProgress = userProfile.inProgressLektions || {};

    if (allLektions.length === 0) { /* ... (código de erro) ... */ }
    
    page.innerHTML = `
        ${getPageHeader(userProfile, 'Mapa de Aprendizado')}
        
        <div class="inset-group">
            ${allLektions.map((lektion, index) => {
                const isCompleted = completed.includes(lektion.id);
                const isInProgress = Object.keys(inProgress).includes(String(lektion.id));
                const isLocked = index > 0 && !completed.includes(allLektions[index - 1].id);
                
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
                        <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" style="background-color: ${isLocked ? 'var(--border)' : (isCompleted ? '#28a745' : 'var(--primary)')}; color: white;">
                            ${icon}
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-lg font-bold">${lektion.title}</h3>
                            <p class="text-sm text-secondary">${lektion.topics.join(', ')}</p>
                        </div>
                        ${!isLocked ? '<ion-icon name="chevron-forward-outline" class="w-6 h-6 text-secondary"></ion-icon>' : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    // Os listeners de clique SÃO ADICIONADOS NO main.js,
    // pois eles precisam chamar o exerciseService.
}
