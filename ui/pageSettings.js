// ui/pageSettings.js
import { getPageHeader } from './components.js';

/**
 * Renderiza a página principal de Ajustes (iOS-style)
 */
export function renderSettings(userProfile, allThemes) {
    const page = document.getElementById('page-settings');
    
    // ATUALIZADO: Fallback para o novo tema padrão
    const currentThemeName = userProfile.theme || 'verzaubert';
    const currentTheme = allThemes[currentThemeName]?.name || 'Padrão';
    const avatarUrl = userProfile.avatarUrl || `https://placehold.co/100x100/333/FFF?text=${userProfile.name.charAt(0)}`;

    page.innerHTML = `
        <h1 class="ios-main-title">Ajustes</h1>

        <div class="inset-group mb-6">
            <a href="#/settings/profile" class="inset-group-item account-header-item">
                <img src="${avatarUrl}" alt="Avatar" class="w-16 h-16 rounded-full object-cover">
                <div class="flex-grow">
                    <h3 class="text-lg font-bold">${userProfile.name}</h3>
                    <p class="text-sm text-secondary">${userProfile.email || 'Editar perfil'}</p>
                </div>
                <ion-icon name="chevron-forward-outline" class="w-5 h-5 text-secondary"></ion-icon>
            </a>
        </div>

        <div class="inset-group mb-6">
            <a href="#/settings/theme" class="inset-group-item navigation-item">
                <span class="font-medium">Tema do Aplicativo</span>
                <span class="item-value">${currentTheme}</span>
            </a>
        </div>

        <div class="inset-group">
            <button id="logout-btn" class="inset-group-item destructive w-full text-left cursor-pointer">
                Sair (Logout)
            </button>
        </div>
    `;
}

/**
 * Renderiza a sub-página de seleção de Tema
 */
export function renderThemeSettings(userProfile, allThemes) {
    const page = document.getElementById('page-settings-theme');
    // ATUALIZADO: Fallback para o novo tema padrão
    const currentThemeName = userProfile.theme || 'verzaubert';

    page.innerHTML = `
        <div class="ios-subpage-header">
            <a href="#/settings" class="back-link">
                <ion-icon name="chevron-back-outline"></ion-icon>
                <span>Ajustes</span>
            </a>
            <h2>Tema</h2>
        </div>

        <div class="inset-group">
            ${Object.keys(allThemes).map(themeName => {
                const theme = allThemes[themeName];
                const isSelected = themeName === currentThemeName;
                
                return `
                    <button class="inset-group-item theme-option-item" data-theme="${themeName}">
                        <span>${theme.name}</span>
                        ${isSelected ? '<ion-icon name="checkmark-outline"></ion-icon>' : ''}
                    </button>
                `;
            }).join('')}
        </div>
    `;
}
