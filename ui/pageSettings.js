// ui/pageSettings.js
import { getPageHeader } from './components.js';

export function renderSettings(userProfile, allThemes) {
    const page = document.getElementById('page-settings');
    if (Object.keys(allThemes).length === 0) { 
        /* ... (código de erro) ... */ 
        // Você pode adicionar uma mensagem de erro aqui se necessário
    }
    
    const currentThemeName = userProfile.theme || 'taylorSwift';
    
    // Pega a lógica do avatar que já existe no seu components.js
    const avatarUrl = userProfile.avatarUrl || `https://placehold.co/100x100/333/FFF?text=${userProfile.name.charAt(0)}`;

    page.innerHTML = `
        ${getPageHeader(userProfile, 'Ajustes')}

        <div class="inset-group mb-6">
            <div class="inset-group-item account-header-item">
                <img src="${avatarUrl}" alt="Avatar" class="w-16 h-16 rounded-full object-cover">
                <div class="flex-grow">
                    <h3 class="text-lg font-bold">${userProfile.name}</h3>
                    <p class="text-sm text-secondary">${userProfile.email || 'Detalhes do perfil'}</p>
                </div>
                <ion-icon name="chevron-forward-outline" class="w-5 h-5 text-secondary"></ion-icon>
            </div>
        </div>

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

        <div class="inset-group">
            <button id="logout-btn" class="inset-group-item destructive w-full text-left cursor-pointer">
                Sair (Logout)
            </button>
        </div>
    `;
    // Os listeners de clique (para .theme-option e #logout-btn)
    // JÁ ESTÃO no main.js, então tudo continua funcionando!
}
