// ui/pageHome.js
import { getPageHeader } from './components.js';
// NOVO: Importa as frases
import { fortunes } from '../data/fortunes.js';

/**
 * Pega a Sorte do Dia com base na data.
 */
function getFortuneOfTheDay() {
    if (!fortunes || fortunes.length === 0) {
        return { de: "Willkommen!", pt: "Bem-vindo!" };
    }
    // Pega o dia do ano (1 a 366)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Usa o módulo para pegar um índice
    const index = (dayOfYear - 1) % fortunes.length;
    return fortunes[index];
}

export function renderHome(userProfile, allLektions) {
    const page = document.getElementById('page-home');
    
    const completedCount = Object.values(userProfile.lektionStats || {}).filter(s => s.completed).length;
    const totalLektions = allLektions.length;
    
    if (totalLektions === 0) { /* ... (código de erro) ... */ }

    const progress = totalLektions > 0 ? (completedCount / totalLektions) * 100 : 0;
    
    // NOVO: Pega a frase do dia
    const fortune = getFortuneOfTheDay();

    page.innerHTML = `
        ${getPageHeader(userProfile, 'Início')}
        
        <div class="fortune-box mb-6">
            <div class="fortune-box-header">
                <ion-icon name="sparkles-outline"></ion-icon>
                <h3>Schicksal des Tages (Sorte do Dia)</h3>
            </div>
            <p class="fortune-de">${fortune.de}</p>
            <p class="fortune-pt">${fortune.pt}</p>
        </div>
        
        <div class="inset-group p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Bem-vindo(a) de volta!</h2>
            <p class="text-secondary mb-6">Continue de onde parou...</p>
            <button id="go-to-map-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold">
                Ir para o Mapa de Aulas →
            </button>
        </div>
        
        <div class="inset-group p-6">
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
    
    document.getElementById('go-to-map-btn').onclick = () => window.location.hash = '#/map';
}
