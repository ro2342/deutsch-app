// ui/pageSettings.js
import { getPageHeader } from './components.js';

/**
 * Renderiza a página principal de Ajustes (iOS-style)
 */
export function renderSettings(userProfile, allThemes) { // allThemes não é mais usado aqui
    const page = document.getElementById('page-settings');
    
    // A lógica de 'currentTheme' foi movida para 'renderThemeSettings'
    const avatarUrl = userProfile.avatarUrl || `https://placehold.co/100x100/333/FFF?text=${userProfile.name.charAt(0)}`;

    page.innerHTML = `
        ${getPageHeader('Ajustes', '#/home', 'Início')}

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
                <span class="font-medium">Aparência</span>
                <span class="item-value">Modo e Cor</span>
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
 * ATUALIZADO: Renderiza a nova sub-página de Aparência
 * @param {object} userProfile 
 * @param {object} baseThemes (window.baseThemes)
 * @param {object} accentColors (window.accentColors)
 */
export function renderThemeSettings(userProfile, baseThemes, accentColors) {
    const page = document.getElementById('page-settings-theme');
    
    // Define os padrões
    const currentBase = userProfile.themeBase || 'light';
    const currentAccent = userProfile.themeAccent || 'purple';

    page.innerHTML = `
        <div class="ios-subpage-header">
            <a href="#/settings" class="back-link">
                <ion-icon name="chevron-back-outline"></ion-icon>
                <span>Ajustes</span>
            </a>
            <h2>Aparência</h2>
        </div>

        <h3 class="text-secondary font-semibold uppercase text-xs mb-2 px-4">Modo de Exibição</h3>
        <div class="inset-group">
            ${Object.keys(baseThemes).map(themeName => {
                const theme = baseThemes[themeName];
                const isSelected = themeName === currentBase;
                return `
                    <button class="inset-group-item theme-option-item" data-base-theme="${themeName}">
                        <span>${theme.name}</span>
                        ${isSelected ? '<ion-icon name="checkmark-outline"></ion-icon>' : ''}
                    </button>
                `;
            }).join('')}
        </div>
        
        <h3 class="text-secondary font-semibold uppercase text-xs mb-2 px-4 mt-8">Akzentfarbe (Cor em Destaque)</h3>
        <div class="inset-group">
            ${Object.keys(accentColors).map(colorKey => {
                const color = accentColors[colorKey];
                const isSelected = colorKey === currentAccent;
                return `
                    <button class="inset-group-item theme-option-item" data-accent-color="${colorKey}">
                        <span class="accent-color-option" style="--swatch-color: ${color.primary};">
                            <span>${color.name}</span>
                            ${isSelected ? '<ion-icon name="checkmark-outline"></ion-icon>' : ''}
                        </span>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}
