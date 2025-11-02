// ui/modal.js

const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');

function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
}

export function showModal(title, contentHtml) {
    modalContent.innerHTML = `
        <button id="modal-close-btn">
            <ion-icon name="close-outline" class="w-5 h-5"></ion-icon>
        </button>
        <div id="modal-body" class="mt-4">
             <h3 class="text-xl font-bold mb-4" style="color: var(--primary);">${title}</h3>
            ${contentHtml}
        </div>
    `;
    modalContainer.classList.remove('hidden');
    modalContainer.addEventListener('click', hideModal);
    modalContent.addEventListener('click', (e) => e.stopPropagation());
    document.getElementById('modal-close-btn').addEventListener('click', hideModal);
    document.addEventListener('keydown', handleEscKey);
}

export function hideModal() {
    modalContainer.classList.add('hidden');
    modalContent.innerHTML = '';
    document.removeEventListener('keydown', handleEscKey);
}

export function showLoading(message = 'Carregando...') {
    modalContent.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-center" style="color: var(--text);">
            <svg class="animate-spin h-8 w-8 mb-4" style="color: var(--primary);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg font-medium">${message}</p>
        </div>
    `;
    modalContainer.classList.remove('hidden');
    modalContainer.removeEventListener('click', hideModal);
    document.removeEventListener('keydown', handleEscKey);
}

export function hidePageLoader() {
    document.getElementById('page-loader').classList.add('hidden');
}

export function showPageLoaderError(error) {
     document.getElementById('page-loader').innerHTML = `<p class="text-red-500">Erro ao carregar perfil: ${error.message}</p>`;
}
