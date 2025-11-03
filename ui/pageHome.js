// ui/pageHome.js
import { getPageHeader } from './components.js';
import { fortunes } from '../data/fortunes.js';

/**
 * Pega a Sorte do Dia com base na data.
 */
function getFortuneOfTheDay() {
    if (!fortunes || fortunes.length === 0) {
        return { de: "Willkommen!", pt: "Bem-vindo!" };
    }
    const now = new Date();
    // Cálculo mais robusto para o dia do ano
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = (dayOfYear - 1) % fortunes.length;
    return fortunes[index];
}

export function renderHome(userProfile, allLektions) {
    const page = document.getElementById('page-home');
    
    // Calcula o progresso
    const stats = userProfile.lektionStats || {};
    const completedCount = Object.values(stats).filter(s => s.completed).length;
    const totalLektions = allLektions.length;
    const progress = totalLektions > 0 ? (completedCount / totalLektions) * 100 : 0;
    
    // Pega a frase do dia
    const fortune = getFortuneOfTheDay();

    page.innerHTML = `
        ${getPageHeader('Início')}
        
        <div class="inset-group mb-6">
            <div class="inset-group-item">
                <ion-icon name="sparkles-outline" class="w-6 h-6 flex-shrink-0" style="color: var(--primary);"></ion-icon>
                <div class="flex-grow">
                    <h3 class="font-bold" style="color: var(--primary);">Schicksal des Tages</h3>
                    <p class="font-medium text-lg mt-2 leading-snug">${fortune.de}</p>
                    <p class="text-secondary mt-1 text-sm italic">${fortune.pt}</p>
                </div>
            </div>
        </div>
        
        <div class="inset-group p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Bem-vindo(a) de volta!</h2>
            <p class="text-secondary mb-6">Continue de onde parou ou explore outros modos de estudo.</p>
            <a href="#/map" id="go-to-map-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold text-center" style="text-decoration: none;">
                Ir para o Mapa de Atividades →
            </a>
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
    
    // Não precisamos mais de listener de clique para o botão, pois ele é um link <a>
}
