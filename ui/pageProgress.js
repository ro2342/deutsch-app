// ui/pageProgress.js
import { getPageHeader } from './components.js';

export function renderProgress(userProfile, allLektions) {
    const page = document.getElementById('page-progress');
    
    // ATUALIZAÇÃO: Lê dos novos objetos de stats
    const stats = userProfile.lektionStats || {};
    const completedLektionsMap = Object.keys(stats).filter(id => stats[id].completed);
    
    const completedCount = completedLektionsMap.length;
    const totalLektions = allLektions.length;
    const score = userProfile.score || 0;

    page.innerHTML = `
        ${getPageHeader('Progresso', '#/home', 'Início')}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card p-6 text-center">
                <h2 class="text-lg font-medium text-secondary mb-2">Pontos Totais</h2>
                <div class="text-5xl font-bold" style="color: var(--primary);">${score}</div>
                <ion-icon name="ribbon-outline" class="w-12 h-12 mx-auto mt-4 text-secondary"></ion-icon>
            </div>
            <div class="card p-6 text-center">
                <h2 class="text-lg font-medium text-secondary mb-2">Lições Completas</h2>
                <div class="text-5xl font-bold" style="color: var(--accent);">${completedCount} / ${totalLektions || 'N/A'}</div>
                <ion-icon name="checkmark-done-circle-outline" class="w-12 h-12 mx-auto mt-4 text-secondary"></ion-icon>
            </div>
            <div class="card p-6 md:col-span-2">
                <h2 class="text-xl font-bold mb-4">Lições Completadas</h2>
                ${(completedCount > 0 && allLektions.length > 0) ? `
                    <ul class="space-y-3">
                        ${completedLektionsMap.map(id => {
                            const lektion = allLektions.find(l => l.id == id);
                            const lektionStats = stats[id];
                            return lektion ? `
                                <li class="flex items-center justify-between gap-3">
                                    <span class="flex items-center gap-3">
                                        <ion-icon name="checkmark-outline" class="w-5 h-5 text-green-500"></ion-icon> 
                                        ${lektion.title}
                                    </span>
                                    <span class="font-medium text-sm" style="color: var(--accent);">
                                        ${lektionStats.correct} / ${lektionStats.total}
                                    </span>
                                </li>` : '';
                        }).join('')}
                    </ul>
                ` : `<p class="text-secondary text-center py-4">Você ainda não completou nenhuma lição.</p>`}
            </div>
        </div>
    `;
}
