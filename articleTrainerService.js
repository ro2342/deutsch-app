// articleTrainerService.js
import { saveProfileData } from './firebaseService.js';
import { renderArticleTrainer } from './ui/pageArticleTrainer.js';

let allWords = [];
let userProfile = {};
let userId = '';
let currentWord = null;
let feedback = null;
let stats = {};

/**
 * NOVO: Função que o router vai chamar.
 * Renderiza a página com o estado atual do serviço.
 */
export function renderCurrentTrainerState() {
    // VERIFICAÇÃO: Se não houver palavra (ex: refresh),
    // mas os dados (allWords) já estiverem carregados,
    // pegue uma nova palavra.
    if (currentWord === null && allWords.length > 0) {
        pickNextWord(); // Esta função já chama renderArticleTrainer
    } else {
        // Se currentWord não for nulo, ou se allWords
        // ainda não estiver carregado, deixe o renderArticleTrainer
        // mostrar o "Carregando..."
        renderArticleTrainer(currentWord, feedback, stats);
    }
}

/**
 * Inicializa o serviço com os dados estáticos.
 */
export function initArticleTrainer(words) {
    allWords = words;
}

/**
 * Atualiza o serviço com os dados do usuário.
 */
export function updateTrainerProfile(profile, uId) {
    userProfile = profile;
    userId = uId;
    // Garante que os stats locais estejam sincronizados
    stats = userProfile.articleTrainingStats || { streak: 0, correctAnswers: 0, totalAttempts: 0 };
}

/**
 * Inicia uma nova sessão do treinador.
 */
export function startTrainer() {
    console.log("Iniciando Treinador de Artigos...");
    stats = userProfile.articleTrainingStats; // Carrega os stats atuais
    pickNextWord(); // Isso vai escolher a palavra e renderizar
    window.location.hash = '#/trainer'; // Isso vai acionar o router
}

/**
 * Escolhe uma nova palavra aleatória.
 */
export function pickNextWord() {
    feedback = null;
    const randomIndex = Math.floor(Math.random() * allWords.length);
    currentWord = allWords[randomIndex];
    
    // Re-renderiza a página com a nova palavra
    renderArticleTrainer(currentWord, feedback, stats);
}

/**
 * Verifica a resposta do usuário.
 */
export function checkArticle(chosenArticle) {
    if (feedback) return; // Já respondeu

    const isCorrect = chosenArticle === currentWord.article;
    stats.totalAttempts++;

    if (isCorrect) {
        stats.correctAnswers++;
        stats.streak++;
        feedback = { correct: true };
    } else {
        stats.streak = 0; // Zera a sequência
        feedback = { 
            correct: false, 
            correctAnswer: currentWord.article 
        };
    }

    // Salva os stats no Firebase (sem esperar)
    saveProfileData(userId, { articleTrainingStats: stats })
        .catch(err => console.error("Falha ao salvar stats do treinador:", err));

    // Atualiza o userProfile local
    userProfile.articleTrainingStats = stats;

    // Re-renderiza a página com o feedback
    renderArticleTrainer(currentWord, feedback, stats);
}
