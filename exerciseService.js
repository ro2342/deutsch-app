// exerciseService.js
import { showModal, showLoading, hideModal } from './ui/modal.js'; 
import { parseSimpleMarkdown } from './utils.js';
import { saveProfileData, getProfileDataOnce } from './firebaseService.js';

// --- Estado do Exercício ---
let currentLektion = null;
let currentExerciseIndex = 0;
let userAnswer = ''; 
let feedback = null;
let wordOrderState = { bank: [], answer: [] };

// NOVO: Flag de modo de revisão e stats da sessão
let isInReviewMode = false;
let currentLektionStats = {
    correct: 0,
    incorrectIndices: new Set()
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

// --- Lógica Principal de Lição ---

export async function startLektion(lektionId) {
    const lektion = allLektions.find(l => l.id === lektionId);
    if (!lektion) return;

    // Reseta o estado para uma lição normal
    isInReviewMode = false;
    currentLektion = lektion;
    currentLektionStats = { correct: 0, incorrectIndices: new Set() };
    
    // Busca o progresso salvo
    const profileData = await getProfileDataOnce(userId);
    userProfile.inProgressLektions = profileData.inProgressLektions || {};
    
    const savedProgress = userProfile.inProgressLektions?.[lektionId];
    currentExerciseIndex = (savedProgress && savedProgress < lektion.exercises.length) ? savedProgress : 0;
    
    userAnswer = '';
    feedback = null;
    wordOrderState = { bank: [], answer: [] };
    window.location.hash = '#/exercise';
}

async function finishLektion() {
    showLoading("Salvando progresso...");

    const lektionId = currentLektion.id;
    const totalExercises = currentLektion.exercises.length;

    // 1. Atualiza o 'lektionStats'
    if (!userProfile.lektionStats) userProfile.lektionStats = {};
    userProfile.lektionStats[lektionId] = {
        correct: currentLektionStats.correct,
        total: totalExercises,
        completed: true
    };

    // 2. Remove o "inProgress"
    if (userProfile.inProgressLektions) {
        delete userProfile.inProgressLektions[lektionId];
    }

    // 3. Atualiza a lista de 'failedExercises'
    if (!userProfile.failedExercises) userProfile.failedExercises = {};
    
    // Pega todos os exercícios que o usuário acertou NESTA SESSÃO
    const sessionCorrectIndices = new Set();
    for (let i = 0; i < totalExercises; i++) {
        if (!currentLektionStats.incorrectIndices.has(i)) {
            sessionCorrectIndices.add(i);
        }
    }

    // Pega os exercícios errados de sessões ANTERIORES
    let existingFailed = userProfile.failedExercises[lektionId] || [];
    
    // Remove os que foram corrigidos AGORA
    existingFailed = existingFailed.filter(index => !sessionCorrectIndices.has(index));

    // Adiciona os novos errados desta sessão
    const newFailedSet = new Set([...existingFailed, ...currentLektionStats.incorrectIndices]);
    userProfile.failedExercises[lektionId] = Array.from(newFailedSet);

    // 4. Salva tudo no Firebase
    try {
        await saveProfileData(userId, { 
            lektionStats: userProfile.lektionStats,
            failedExercises: userProfile.failedExercises,
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
    // Verifica se há mais exercícios na lição
    if (currentExerciseIndex < currentLektion.exercises.length - 1) {
        currentExerciseIndex++;
        userAnswer = '';
        feedback = null;
        wordOrderState = { bank: [], answer: [] };
        renderCurrentExerciseOnPage();
    } else {
        // Se for o último exercício, finaliza
        if (isInReviewMode) {
            await finishReviewSession();
        } else {
            await finishLektion();
        }
    }
}

function checkAnswer() {
    if (!userAnswer && wordOrderState.answer.length === 0) return;
    
    const exercise = currentLektion.exercises[currentExerciseIndex];
    let userAns, correctAns, alternatives, correctAnswers, isCorrect;

    // Lógica de verificação (igual à anterior)
    if (exercise.type === 'wordOrder') {
        userAns = wordOrderState.answer.map(w => w.word).join(' ').toLowerCase();
        correctAns = exercise.answer.toLowerCase();
        alternatives = exercise.alternatives?.map(a => a.toLowerCase()) || [];
        correctAnswers = [correctAns, ...alternatives];
        isCorrect = correctAnswers.some(ans => userAns === ans);
    } else {
        userAns = userAnswer.trim().toLowerCase();
        correctAns = exercise.answer.toLowerCase();
        alternatives = exercise.alternatives?.map(a => a.toLowerCase()) || [];
        correctAnswers = [correctAns, ...alternatives];
        isCorrect = correctAnswers.some(ans => userAns === ans);
    }

    feedback = { isCorrect, explanation: exercise.explanation };

    // --- Lógica de Stats ---
    if (isCorrect) {
        if (isInReviewMode) {
            // Se acertou na REVISÃO, remove da lista de falhas
            const lId = exercise.originalLektionId;
            const eIdx = exercise.originalExerciseIndex;
            
            let failedList = userProfile.failedExercises[lId] || [];
            failedList = failedList.filter(idx => idx !== eIdx); // Remove
            userProfile.failedExercises[lId] = failedList;
            
            // Salva a remoção imediatamente
            saveProfileData(userId, { failedExercises: userProfile.failedExercises })
                .catch(err => console.error("Falha ao salvar remoção de revisão:", err));
        } else {
            // Se acertou na LIÇÃO NORMAL, conta como +1 correto
            currentLektionStats.correct++;
            userProfile.score = (userProfile.score || 0) + 10;
        }
    } else {
        if (!isInReviewMode) {
            // Se errou na LIÇÃO NORMAL, adiciona ao set de erros da sessão
            currentLektionStats.incorrectIndices.add(currentExerciseIndex);
        }
        // Se errou na REVISÃO, não faz nada (ele já está na lista)
    }

    // Salva o progresso parcial (índice e pontuação)
    if (!isInReviewMode) {
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

// --- NOVO: Lógica do Modo de Revisão ---

export function startReviewSession() {
    isInReviewMode = true;
    const reviewExercises = [];

    // 1. Coleta todos os exercícios errados
    if (userProfile.failedExercises) {
        for (const lektionId in userProfile.failedExercises) {
            const indices = userProfile.failedExercises[lektionId] || [];
            indices.forEach(exerciseIndex => {
                const lektion = allLektions.find(l => l.id == lektionId);
                const exercise = lektion?.exercises[exerciseIndex];
                
                if (exercise) {
                    // Adiciona o exercício e guarda sua origem
                    reviewExercises.push({
                        ...exercise,
                        originalLektionId: lektionId,
                        originalExerciseIndex: exerciseIndex
                    });
                }
            });
        }
    }

    if (reviewExercises.length === 0) {
        showModal("Parabéns!", "Você não tem nenhum exercício para revisar.");
        return;
    }

    // 2. Cria uma "lição virtual" com esses exercícios
    currentLektion = {
        id: 'review',
        title: 'Ponto de Revisão',
        exercises: reviewExercises // Idealmente, deveriam ser embaralhados
    };
    
    // 3. Reseta o estado e navega
    currentExerciseIndex = 0;
    userAnswer = '';
    feedback = null;
    wordOrderState = { bank: [], answer: [] };
    window.location.hash = '#/exercise';
}

async function finishReviewSession() {
    showLoading("Concluindo revisão...");
    
    // Limpa o estado
    isInReviewMode = false;
    currentLektion = null;
    
    hideModal();
    // Volta para a página de revisão
    window.location.hash = '#/review';
    
    // Atraso de 100ms para o modal aparecer *depois* da página carregar
    setTimeout(() => {
         showModal("Revisão Concluída", "Bom trabalho! Continue praticando.");
    }, 100);
}


// --- Funções de Renderização (Sem grandes mudanças, apenas no 'checkAnswer') ---

function showGrammarModal() {
    if (!currentLektion) return;
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
    
    // Define para onde o botão 'fechar' deve voltar
    const closeHash = isInReviewMode ? '#/review' : '#/map';
    
    page.innerHTML = `
        <div class="flex items-center justify-between gap-4 mb-6">
            <button id="close-exercise-btn" class="btn-secondary !border-0" style="padding: 0.75rem;">
                <ion-icon name="close-outline" class="w-6 h-6"></ion-icon>
            </button>
            <div class="flex-grow text-right">
                <h1 class="text-2xl font-bold" style="color: var(--primary);">${currentLektion.title}</h1>
                <p class="text-secondary">Exercício ${currentExerciseIndex + 1} de ${currentLektion.exercises.length}</p>
            </div>
        </div>
        <div id="exercise-container-page"></div>
    `;
    document.getElementById('close-exercise-btn').onclick = () => {
        currentLektion = null;
        isInReviewMode = false; // Garante que sai do modo revisão
        window.location.hash = closeHash;
    };
    renderCurrentExerciseOnPage();
}

// Funções de ajuda do wordOrder (sem mudanças)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
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
function moveWordToAnswer(wordId) {
    if (feedback) return; 
    const wordIndex = wordOrderState.bank.findIndex(w => w.id === wordId);
    if (wordIndex > -1) {
        const word = wordOrderState.bank[wordIndex];
        word.hidden = true; 
        wordOrderState.answer.push(word); 
        renderCurrentExerciseOnPage(); 
    }
}
function moveWordToBank(wordId) {
    if (feedback) return; 
    const wordIndex = wordOrderState.answer.findIndex(w => w.id === wordId);
    if (wordIndex > -1) {
        const [word] = wordOrderState.answer.splice(wordIndex, 1); 
        const bankWord = wordOrderState.bank.find(w => w.id === word.id);
        if (bankWord) bankWord.hidden = false; 
        renderCurrentExerciseOnPage(); 
    }
}
function resetWordOrder() {
    if (feedback) return; 
    wordOrderState.answer = [];
    wordOrderState.bank.forEach(w => w.hidden = false);
    renderCurrentExerciseOnPage();
}

// Renderização do exercício (sem mudanças na lógica de renderização)
function renderCurrentExerciseOnPage() {
    const container = document.getElementById('exercise-container-page');
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
    } else if (exercise.type === 'wordOrder') {
        initWordOrderState(exercise.words);
        const answerWordsHtml = wordOrderState.answer.map(word => 
            `<div class="word-token" data-word-id="${word.id}">${word.word}</div>`
        ).join('');
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

    // Listeners (sem mudanças)
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
        document.getElementById('word-bank')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-token')) {
                moveWordToAnswer(Number(e.target.dataset.wordId));
            }
        });
        document.getElementById('answer-area')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-token')) {
                moveWordToBank(Number(e.target.dataset.wordId));
            }
        });
        document.getElementById('reset-words-btn')?.addEventListener('click', resetWordOrder);
        actionBtn.disabled = wordOrderState.answer.length === 0 && !feedback;
    }
    document.getElementById('grammar-btn').onclick = showGrammarModal;
    document.getElementById('action-btn').onclick = feedback ? nextExercise : checkAnswer;
}
