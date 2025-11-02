// ui/pageSettings.js
import { getPageHeader } from './components.js';

export function renderSettings(userProfile, allThemes) {
    const page = document.getElementById('page-settings');
    if (Object.keys(allThemes).length === 0) { /* ... (código de erro) ... */ }
    
    const currentThemeName = userProfile.theme || 'taylorSwift';
    page.innerHTML = `
        ${getPageHeader(userProfile, 'Configurações')}
        
        <div class="inset-group p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Tema do Aplicativo</h2>
            <p class="text-secondary mb-6">Escolha seu tema favorito.</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                ${Object.keys(allThemes).map(themeName => {
                    const theme = allThemes[themeName];
                    const isSelected = themeName === currentThemeName;
                    return `
                        <button class="theme-option p-4 rounded-lg border-2 text-center" data-theme="${themeName}" style="border-color: ${isSelected ? theme.primary : 'var(--border)'}; background: ${theme.bg};">
                            <span class="font-medium" style="color: ${theme.text};">${theme.name}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="inset-group p-6">
            <h2 class="text-xl font-bold mb-4">Conta</h2>
            <p class="text-secondary mb-4">Você está logado como ${userProfile.name} (${userProfile.email || 'sem e-mail'}).</p>
            <button id="logout-btn" class="btn-secondary w-full py-3 rounded-xl font-semibold" style="border-color: #ef4444; color: #ef4444; background-color: transparent;">
                Sair (Logout)
            </button>
        </div>
    `;
    // Listeners de clique SÃO ADICIONADOS NO main.js,
    // pois eles precisam chamar o firebaseService e o themeService.
}
