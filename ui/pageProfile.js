// ui/pageProfile.js
import { getPageHeader } from './components.js';

/**
 * Renderiza a sub-página de edição de perfil
 */
export function renderProfileSettings(userProfile) {
    const page = document.getElementById('page-settings-profile');
    
    page.innerHTML = `
        <div class="ios-subpage-header">
            <a href="#/settings" class="back-link">
                <ion-icon name="chevron-back-outline"></ion-icon>
                <span>Ajustes</span>
            </a>
            <h2>Editar Perfil</h2>
        </div>

        <div class="inset-group">
            <div class="inset-group-item">
                <label for="profile-name-input" class="text-secondary w-20">Nome</label>
                <input 
                    type="text" 
                    id="profile-name-input" 
                    class="w-full bg-transparent p-2 rounded-md" 
                    style="color: var(--text); outline: none;" 
                    value="${userProfile.name || ''}"
                >
            </div>
        </div>
        
        <div class="p-4">
            <button id="save-profile-btn" class="btn-primary w-full text-lg py-3 rounded-xl font-semibold">
                Salvar Alterações
            </button>
        </div>
    `;
}
