// exerciseService.js
// ATUALIZADO: Importa de ui/modal.js
import { showModal, showLoading, hideModal } from './ui/modal.js'; 
import { parseSimpleMarkdown } from './utils.js';
import { saveProfileData, getProfileDataOnce } from './firebaseService.js';

// --- Estado do Exercício ---
let currentLektion = null;
let currentExerciseIndex = 0;
let userAnswer = '';
let feedback = null;

let allLektions = [];
let allGrammar = {};
let userProfile = {};
let userId = '';

// --- Funções de Inicialização ---

export function initExerciseService(lektions, grammar) {
    allLektions = lektions;
    allGrammar = grammar;
}

export function updateExerciseServiceProfile(profile, uId) {
    userProfile = profile;
    userId = uId;
}

// --- Lógica Principal ---
export async function startLektion(lektionId) {
    const lektion = allLektions.find(l => l.id === lektionId);
    if (!lektion) return;
    currentLektion = lektion;
    
    const profileData = await getProfileDataOnce(userId);
    userProfile.inProgressLektions = profileData.inProgressLektions || {};
    
    const savedProgress = userProfile.inProgressLektions?.[lektionId];
    currentExerciseIndex = (savedProgress && savedProgress < lektion.exercises.length) ? savedProgress : 0;
    
    userAnswer = '';
    feedback = null;
    window.location.hash = '#/exercise';
}

async function finishLektion() {
    showLoading("Salvando progresso...");
    
    const completed = userProfile.completedLektions || [];
    if (!completed.includes(currentLektion.id)) {
        completed.push(currentLektion.id);
    }
    if (userProfile.inProgressLektions) {
        delete userProfile.inProgressLektions[currentLektion.id];
    }

    try {
        await saveProfileData(userId, { 
            completedLektions: userProfile.completedLektions,
            inProgressLektions: userProfile.inProgressLektions
        });
    } catch (error) {
        showModal("Erro", `Não foi possível salvar: ${error.message}`);
    }
    
    hideModal();
    currentLektion = null;
    window.location.hash = '#/map';
}

async function nextExercise() {
    if (currentExerciseIndex < currentLektion.exercises.length - 1) {
        currentExerciseIndex++;
        userAnswer = '';
        feedback = null;
        renderCurrentExerciseOnPage();
    } else {
        await finishLektion();
    }
}

function checkAnswer() {
    if (!userAnswer) return;
    const exercise = currentLektion.exercises[currentExerciseIndex];
    // ... (lógica de verificação da resposta - sem mudanças) ...
    const userAns = userAnswer.trim().toLowerCase();
    const correctAns = exercise.answer.toLowerCase();
    const alternatives = exercise.alternatives?.map(a => a.toLowerCase()) || [];

    const correctAnswers = [correctAns, ...alternatives];
    const isCorrect = correctAnswers.some(ans => {
        if (ans.includes('|')) {
            const parts = ans.split('|');
            const userParts = userAns.split(/[\s,|]+/);
            return parts.every((part, idx) => userParts[idx] === part);
        }
        return userAns === ans;
    });

    feedback = { isCorrect, explanation: exercise.explanation };

    if (isCorrect) {
        userProfile.score = (userProfile.score || 0) + 10;
        const nextIndex = currentExerciseIndex + 1;
        if (!userProfile.inProgressLektions) userProfile.inProgressLektions = {};
        userProfile.inProgressLektions[currentLektion.id] = nextIndex;

        saveProfileData(userId, { 
            score: userProfile.score,
            inProgressLektions: userProfile.inProgressLektions
        }).catch(err => console.error("Falha ao salvar progresso parcial:", err));
    }
    renderCurrentExerciseOnPage();
}

// --- Funções de Renderização de Exercício ---
function showGrammarModal() {
    if (!currentLektion) return;
    // ... (lógica do modal de gramática - sem mudanças) ...
    if (Object.keys(allGrammar).length === 0) {
        showModal("Erro", "Dados de gramática não carregados.");
        return;
    }
    const grammarHtml = currentLektion.grammarKeys.map(key => {
        const explanation = allGrammar[key];
        return explanation ? `
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-3" style="color: var(--primary);">${explanation.title}</h3>
                <div class="text-gray-700 whitespace-pre-line leading-relaxed break-words">
                    ${parseSimpleMarkdown(explanation.content)}
                </div>
            </div>
        ` : `<p class="text-red-500">Erro: Tópico "${key}" não encontrado.</p>`;
    }).join('<hr class="my-6">');
    showModal("Explicações Gramaticais 📚", grammarHtml);
}

export function renderExercisePage() {
    const page = document.getElementById('page-exercise');
    // ... (lógica de renderExercisePage - sem mudanças) ...
    if (!currentLektion) {
        page.innerHTML = `
            <div class="card p-6 text-center">
                <h2 class="text-2xl font-bold mb-4 text-red-500">Erro</h2>
                <p class="text-secondary mb-6">Nenhuma lição selecionada.</p>
                <button id="back-to-map-btn" class="btn-primary py-3 px-6 rounded-xl">Voltar ao Mapa</button>
            </div>
        `;
        document.getElementById('back-to-map-btn').onclick = () => window.location.hash = '#/map';
        return;
    }
    page.innerHTML = `
        <div class="flex items-center justify-between gap-4 mb-6">
            <button id="back-to-map-btn" class="btn-secondary !border-0" style="padding: 0.75rem;">
                <ion-icon name="close-outline" class="w-6 h-6"></ion-icon>
            </button>
            <div class="flex-grow text-right">
                <h1 class="text-2xl font-bold" style="color: var(--primary);">${currentLektion.title}</h1>
                <p class="text-secondary">Exercício ${currentExerciseIndex + 1} de ${currentLektion.exercises.length}</p>
            </div>
        </div>
        <div id="exercise-container-page"></div>
    `;
    document.getElementById('back-to-map-btn').onclick = () => {
        currentLektion = null;
        window.location.hash = '#/map';
    };
    renderCurrentExerciseOnPage();
}

function renderCurrentExerciseOnPage() {
    const container = document.getElementById('exercise-container-page');
    // ... (lógica de renderCurrentExerciseOnPage - sem mudanças) ...
    if (!container || !currentLektion) return;
    const exercise = currentLektion.exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex + 1) / currentLektion.exercises.length) * 100;
    let inputHtml = '';
    if (exercise.type === 'fillBlank' || exercise.type === 'translation') {
        inputHtml = `<input type="text" id="exercise-input" class="input-field w-full text-lg p-4 rounded-xl" placeholder="Digite sua resposta..." value="${userAnswer}" ${feedback ? 'disabled' : ''} autocomplete="off">`;
    } else if (exercise.type === 'multipleChoice') {
        inputHtml = `<div class="flex flex-col gap-3">
            ${exercise.options.map(option => `
                <button class="btn-secondary text-left p-4 text-base w-full rounded-xl" data-option="${option}" ${feedback ? 'disabled' : ''} style="${userAnswer === option ? `background-color: var(--primary); color: white; border-color: var(--primary);` : ''}">
                    ${option}
                </button>
            `).join('')}
        </div>`;
    }
    container.innerHTML = `
        <div class="card p-4 mb-6"><div class="progress-bar h-2.5 rounded-full" style="margin: 0;"><div class="progress-fill h-2.5 rounded-full" style="width: ${progress}%;"></div></div></div>
        <div class="card p-6">
            <h3 class="text-xl font-medium mb-6">${exercise.question.replace(/___/g, '<span class="font-bold text-gray-400">___</span>')}</h3>
            <div class="mb-4">${inputHtml}</div>
            <div id="feedback-container">
                ${feedback ? `
                    <div class="feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}">
                        <ion-icon name="${feedback.isCorrect ? 'checkmark-circle-outline' : 'close-circle-outline'}" class="w-8 h-8 flex-shrink-0"></ion-icon>
                        <div>
                            <strong class="block mb-1">${feedback.isCorrect ? 'Correto!' : 'Incorreto'}</strong>
                            <span class="text-secondary">${feedback.explanation}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="flex gap-4 mt-8 pt-6 border-t" style="border-color: var(--border);">
                <button id="grammar-btn" class="btn-secondary !px-4 !py-3 rounded-xl"><ion-icon name="book-outline" class="w-5 h-5"></ion-icon></button>
                <button id="action-btn" class="btn-primary flex-grow !py-3 rounded-xl font-semibold" ${(!userAnswer && !feedback) ? 'disabled' : ''}>
                    ${feedback ? 'Próximo →' : 'Verificar'}
                </button>
            </div>
        </div>
    `;
    // Listeners
    if (exercise.type === 'fillBlank' || exercise.type === 'translation') {
        const input = document.getElementById('exercise-input');
        input.oninput = (e) => { userAnswer = e.target.value; if (!feedback) document.getElementById('action-btn').disabled = !userAnswer; };
        input.onkeydown = (e) => { if (e.key === 'Enter' && !feedback && userAnswer) document.getElementById('action-btn').click(); };
        if (!feedback) input.focus();
    } else if (exercise.type === 'multipleChoice') {
        document.querySelectorAll('.btn-secondary[data-option]').forEach(btn => {
            btn.onclick = () => { if (feedback) return; userAnswer = btn.dataset.option; renderCurrentExerciseOnPage(); };
        });
    }
    document.getElementById('grammar-btn').onclick = showGrammarModal;
    document.getElementById('action-btn').onclick = feedback ? nextExercise : checkAnswer;
}
