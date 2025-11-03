// ui/pageArticleTrainer.js
import { getPageHeader } from './components.js';

/**
 * Renderiza a página do Treinador de Artigos.
 * A lógica (o que acontece ao clicar) está no articleTrainerService.js
 */
export function renderArticleTrainer(word, feedback, stats) {
    const page = document.getElementById('page-trainer');
    
    // Se nenhuma palavra foi passada, é o estado inicial
    if (!word) {
        page.innerHTML = `${getPageHeader('Treinador de Artigos', '#/map', 'Mapa')}
            <div class="card p-6 text-center">
                <p class="text-secondary">Carregando...</p>
            </div>`;
        return;
    }

    const { streak, correctAnswers, totalAttempts } = stats;
    const accuracy = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

    page.innerHTML = `
        ${getPageHeader('Treinador de Artigos', '#/map', 'Mapa')}
        
        <div class="card p-6">
            <div class="flex justify-around text-center mb-8 pb-6 border-b" style="border-color: var(--border);">
                <div>
                    <div class="text-3xl font-bold" style="color: var(--primary);">${streak}</div>
                    <div class="text-sm font-medium text-secondary">Sequência</div>
                </div>
                <div>
                    <div class="text-3xl font-bold" style="color: var(--accent);">${accuracy}%</div>
                    <div class="text-sm font-medium text-secondary">Precisão</div>
                </div>
            </div>

            <div class="text-center mb-8">
                <p class="text-secondary mb-2">Qual é o artigo de:</p>
                <h2 class="text-5xl font-bold">${word.word}</h2>
                <p class="text-lg text-secondary">${word.translation}</p>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
                <button 
                    class="btn-article text-2xl font-bold p-6 rounded-2xl ${feedback && (feedback.correctAnswer === 'Der' || word.article === 'Der') ? 'correct' : ''} ${feedback && word.article !== 'Der' ? 'disabled' : ''}"
                    data-article="Der"
                    ${feedback ? 'disabled' : ''}
                >
                    Der
                </button>
                <button 
                    class="btn-article text-2xl font-bold p-6 rounded-2xl ${feedback && (feedback.correctAnswer === 'Die' || word.article === 'Die') ? 'correct' : ''} ${feedback && word.article !== 'Die' ? 'disabled' : ''}"
                    data-article="Die"
                    ${feedback ? 'disabled' : ''}
                >
                    Die
                </button>
                <button 
                    class="btn-article text-2xl font-bold p-6 rounded-2xl ${feedback && (feedback.correctAnswer === 'Das' || word.article === 'Das') ? 'correct' : ''} ${feedback && word.article !== 'Das' ? 'disabled' : ''}"
                    data-article="Das"
                    ${feedback ? 'disabled' : ''}
                >
                    Das
                </button>
            </div>
            
            <div class="trainer-feedback-box ${feedback ? 'visible' : ''}">
                ${feedback ? (
                    feedback.correct ? `
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-green-600">Correto!</h3>
                            <p class="text-lg font-medium">${word.article} ${word.word}</p>
                            <p class="text-secondary">Plural: ${word.plural || 'N/A'}</p>
                        </div>
                    ` : `
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-red-600">Incorreto</h3>
                            <p class="text-lg font-medium">O correto é: <strong style="color: var(--primary);">${word.article} ${word.word}</strong></p>
                            <p class="text-secondary">Plural: ${word.plural || 'N/A'}</p>
                        </div>
                    `
                ) : ''}
                
                <button id="trainer-next-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold mt-6">
                    Próxima Palavra →
                </button>
            </div>
        </div>
    `;
}
