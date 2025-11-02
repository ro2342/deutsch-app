// ui/pageReview.js
import { getPageHeader } from './components.js';

export function renderReview(userProfile, allLektions) {
    const page = document.getElementById('page-review');
    const failedExercises = userProfile.failedExercises || {};
    
    let totalFailedCount = 0;
    const lektionsWithErrors = [];

    // Calcula o total de erros e agrupa por lição
    for (const lektionId in failedExercises) {
        const count = failedExercises[lektionId]?.length || 0;
        if (count > 0) {
            totalFailedCount += count;
            const lektion = allLektions.find(l => l.id == lektionId);
            if (lektion) {
                lektionsWithErrors.push({
                    title: lektion.title,
                    count: count
                });
            }
        }
    }

    page.innerHTML = `
        ${getPageHeader(userProfile, 'Ponto de Revisão')}
        
        <div class="inset-group p-6 mb-6 text-center">
            <h2 class="text-xl font-bold mb-2">Exercícios para Revisar</h2>
            <div class="text-6xl font-bold my-4" style="color: var(--primary);">${totalFailedCount}</div>
            <p class="text-secondary mb-6">Estes são os exercícios que você errou. Acerte-os no modo de revisão para removê-los da lista.</p>
            <button id="start-review-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold" ${totalFailedCount === 0 ? 'disabled' : ''}>
                ${totalFailedCount === 0 ? 'Tudo Certo!' : 'Iniciar Revisão'}
            </button>
        </div>
        
        <div class="inset-group">
            ${lektionsWithErrors.length > 0 ? 
                lektionsWithErrors.map(item => `
                    <div class="inset-group-item justify-between">
                        <span class="font-medium">${item.title}</span>
                        <span class="font-bold" style="color: var(--accent);">${item.count} ${item.count > 1 ? 'erros' : 'erro'}</span>
                    </div>
                `).join('') 
                : `
                <div class="inset-group-item justify-center text-secondary">
                    Você não tem nenhum exercício para revisar. Parabéns!
                </div>
            `}
        </div>
    `;
    
    // O listener de clique para #start-review-btn é tratado no main.js
}
