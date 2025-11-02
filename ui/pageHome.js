// ui/pageHome.js
import { getPageHeader } from './components.js';

export function renderHome(userProfile, allLektions) {
    const page = document.getElementById('page-home');
    const completedCount = userProfile.completedLektions?.length || 0;
    const totalLektions = allLektions.length;
    
    if (totalLektions === 0) { /* ... (código de erro) ... */ }

    const progress = totalLektions > 0 ? (completedCount / totalLektions) * 100 : 0;
    page.innerHTML = `
        ${getPageHeader(userProfile, 'Início')}
        <div class="card p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Bem-vindo(a) de volta!</h2>
            <p class="text-secondary mb-6">Continue de onde parou...</p>
            <button id="go-to-map-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold">
                Ir para o Mapa de Aulas →
            </button>
        </div>
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Seu Progresso</h2>
            <div class="mb-2 flex justify-between font-medium text-secondary">
                <span>Lições Completas</span>
                <span>${completedCount} / ${totalLektions}</span>
            </div>
            <div class="progress-bar h-2.5 rounded-full mb-4">
                <div class="progress-fill h-2.5 rounded-full" style="width: ${progress}%;"></div>
            </div>
            <div class="text-center text-2xl font-bold" style="color: var(--primary);">${Math.round(progress)}%</div>
        </div>
    `;
    
    // Este listener é simples e só navega, então pode ficar aqui.
    document.getElementById('go-to-map-btn').onclick = () => window.location.hash = '#/map';
}
