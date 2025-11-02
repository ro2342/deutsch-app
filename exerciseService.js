// exerciseService.js
// ATUALIZADO: Importa de ui/modal.js
import { showModal, showLoading, hideModal } from './ui/modal.js'; 
import { parseSimpleMarkdown } from './utils.js';
import { saveProfileData, getProfileDataOnce } from './firebaseService.js';

// --- Estado do Exercício ---
let currentLektion = null;
let currentExerciseIndex = 0;
// ATUALIZAÇÃO: userAnswer pode ser string (text, choice) ou array (wordOrder)
let userAnswer = ''; 
let feedback = null;

// ATUALIZAÇÃO: Estado específico para o wordOrder
let wordOrderState = {
    bank: [], // Array de {id, word, hidden}
    answer: [] // Array de {id, word}
};

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
        // Limpa o estado para o próximo exercício
        userAnswer = '';
        feedback = null;
        wordOrderState = { bank: [], answer: [] };
        
        renderCurrentExerciseOnPage();
    } else {
        await finishLektion();
    }
}

// ATUALIZAÇÃO: Lógica de verificação refatorada
function checkAnswer() {
    if (!userAnswer && wordOrderState.answer.length === 0) return;
    
    const exercise = currentLektion.exercises[currentExerciseIndex];
    let userAns, correctAns, alternatives, correctAnswers, isCorrect;

    if (exercise.type === 'wordOrder') {
        // Pega a resposta da área de resposta e junta com espaços
        userAns = wordOrderState.answer.map(w => w.word).join(' ').toLowerCase();
        correctAns = exercise.answer.toLowerCase();
        alternatives = exercise.alternatives?.map(a => a.toLowerCase()) || [];
        correctAnswers = [correctAns, ...alternatives];
        // Compara a string montada com as respostas corretas
        isCorrect = correctAnswers.some(ans => userAns === ans);
    
    } else {
        // Lógica existente para fillBlank, multipleChoice, translation
        userAns = userAnswer.trim().toLowerCase();
        correctAns = exercise.answer.toLowerCase();
        alternatives = exercise.alternatives?.map(a => a.toLowerCase()) || [];
        correctAnswers = [correctAns, ...alternatives];
        isCorrect = correctAnswers.some(ans => {
            // A lógica do pipe | foi removida pois esses exercícios viraram wordOrder
            return userAns === ans;
        });
    }

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
    
    // Re-renderiza a página para mostrar o feedback
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

// --- NOVO: Funções de ajuda para o Word Order ---

// Embaralha um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializa o estado do wordOrder (só na primeira renderização)
function initWordOrderState(words) {
    if (wordOrderState.bank.length === 0 && wordOrderState.answer.length === 0) {
        const shuffledWords = shuffleArray([...words]);
        wordOrderState.bank = shuffledWords.map((word, index) => ({
            id: index,
            word: word,
            hidden: false
        }));
    }
}

// Move palavra do banco para a resposta
function moveWordToAnswer(wordId) {
    if (feedback) return; // Não faz nada se já tiver feedback
    const wordIndex = wordOrderState.bank.findIndex(w => w.id === wordId);
    if (wordIndex > -1) {
        const word = wordOrderState.bank[wordIndex];
        word.hidden = true; // "Esconde" no banco
        wordOrderState.answer.push(word); // Adiciona na resposta
        renderCurrentExerciseOnPage(); // Re-renderiza
    }
}

// Move palavra da resposta de volta para o banco
function moveWordToBank(wordId) {
    if (feedback) return; // Não faz nada se já tiver feedback
    const wordIndex = wordOrderState.answer.findIndex(w => w.id === wordId);
    if (wordIndex > -1) {
        const [word] = wordOrderState.answer.splice(wordIndex, 1); // Remove da resposta
        const bankWord = wordOrderState.bank.find(w => w.id === word.id);
        if (bankWord) bankWord.hidden = false; // "Mostra" de volta no banco
        renderCurrentExerciseOnPage(); // Re-renderiza
    }
}

// Reseta o exercício de wordOrder
function resetWordOrder() {
    if (feedback) return; // Não pode resetar se já verificou
    wordOrderState.answer = [];
    wordOrderState.bank.forEach(w => w.hidden = false);
    renderCurrentExerciseOnPage();
}


// ATUALIZAÇÃO: renderCurrentExerciseOnPage foi modificado
function renderCurrentExerciseOnPage() {
    const container = document.getElementById('exercise-container-page');
    // ... (lógica de renderCurrentExerciseOnPage - sem mudanças) ...
    if (!container || !currentLektion) return;
    const exercise = currentLektion.exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex + 1) / currentLektion.exercises.length) * 100;
    let inputHtml = '';

    // --- Lógica de renderização por tipo ---
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
    
    } else if (exercise.type === 'wordOrder') {
        // 1. Inicializa o estado se for a primeira vez
        initWordOrderState(exercise.words);
        
        // 2. Renderiza a área de resposta
        const answerWordsHtml = wordOrderState.answer.map(word => 
            `<div class="word-token" data-word-id="${word.id}">${word.word}</div>`
        ).join('');

        // 3. Renderiza o banco de palavras
        const bankWordsHtml = wordOrderState.bank.map(word =>
            `<div class="word-token ${word.hidden ? 'hidden' : ''}" data-word-id="${word.id}">${word.word}</div>`
        ).join('');

        inputHtml = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-secondary">Organize as palavras:</span>
                <button id="reset-words-btn" style="display: ${wordOrderState.answer.length > 0 && !feedback ? 'block' : 'none'};">
                    Limpar
                </button>
            </div>
            <div id="answer-area" class="answer-area ${feedback ? 'pointer-events-none opacity-70' : ''}">
                ${answerWordsHtml}
            </div>
            <div id="word-bank" class="word-bank ${feedback ? 'pointer-events-none opacity-70' : ''}">
                ${bankWordsHtml}
            </div>
        `;
    }
    // --- Fim da lógica de renderização ---

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
                <button id="action-btn" class="btn-primary flex-grow !py-3 rounded-xl font-semibold">
                    ${feedback ? 'Próximo →' : 'Verificar'}
                </button>
            </div>
        </div>
    `;

    // --- ATUALIZAÇÃO: Listeners ---
    const actionBtn = document.getElementById('action-btn');

    if (exercise.type === 'fillBlank' || exercise.type === 'translation') {
        const input = document.getElementById('exercise-input');
        input.oninput = (e) => { 
            userAnswer = e.target.value; 
            if (!feedback) actionBtn.disabled = !userAnswer;
        };
        input.onkeydown = (e) => { if (e.key === 'Enter' && !feedback && userAnswer) actionBtn.click(); };
        if (!feedback) input.focus();
        actionBtn.disabled = !userAnswer && !feedback;
    
    } else if (exercise.type === 'multipleChoice') {
        document.querySelectorAll('.btn-secondary[data-option]').forEach(btn => {
            btn.onclick = () => { 
                if (feedback) return; 
                userAnswer = btn.dataset.option; 
                renderCurrentExerciseOnPage(); 
            };
        });
        actionBtn.disabled = !userAnswer && !feedback;

    } else if (exercise.type === 'wordOrder') {
        // Listener para o banco de palavras
        document.getElementById('word-bank')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-token')) {
                moveWordToAnswer(Number(e.target.dataset.wordId));
            }
        });
        // Listener para a área de resposta
        document.getElementById('answer-area')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-token')) {
                moveWordToBank(Number(e.target.dataset.wordId));
            }
        });
        // Listener para o botão de reset
        document.getElementById('reset-words-btn')?.addEventListener('click', resetWordOrder);
        
        // Habilita o botão de verificar se tiver palavras na resposta
        actionBtn.disabled = wordOrderState.answer.length === 0 && !feedback;
    }
    
    document.getElementById('grammar-btn').onclick = showGrammarModal;
    document.getElementById('action-btn').onclick = feedback ? nextExercise : checkAnswer;
}
