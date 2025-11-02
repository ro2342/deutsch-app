// ui/theme.js

let allBaseThemes = {};
let allAccentColors = {};

export function initThemeService(baseThemes, accentColors) {
    allBaseThemes = baseThemes;
    allAccentColors = accentColors;
    
    // Aplica o tema salvo no localStorage imediatamente
    const savedBase = localStorage.getItem('deutschAppThemeBase') || 'light';
    const savedAccent = localStorage.getItem('deutschAppThemeAccent') || 'purple';
    
    applyTheme(savedBase, savedAccent);
}

/**
 * Aplica o tema combinando uma base (light/dark) e uma cor de destaque.
 * @param {string} baseName - "light" ou "dark"
 * @param {string} accentName - "purple", "red", "teal", etc.
 */
export function applyTheme(baseName, accentName) {
    const base = allBaseThemes[baseName];
    const accent = allAccentColors[accentName];

    if (!base) {
        console.warn(`Tema base "${baseName}" não encontrado. Usando 'light'.`);
        baseName = 'light';
        base = allBaseThemes.light;
    }
    if (!accent) {
        console.warn(`Cor de destaque "${accentName}" não encontrada. Usando 'purple'.`);
        accentName = 'purple';
        accent = allAccentColors.purple;
    }

    // 1. Aplica todas as propriedades do tema BASE
    document.documentElement.style.setProperty('--bg', base.bg);
    document.documentElement.style.setProperty('--card', base.card);
    document.documentElement.style.setProperty('--text', base.text);
    document.documentElement.style.setProperty('--border', base.border);
    document.documentElement.style.setProperty('--text-rgb', base['text-rgb']);
    document.documentElement.style.setProperty('--card-rgb', base['card-rgb']);
    document.documentElement.style.setProperty('--border-rgb', base['border-rgb']);

    // 2. Sobrescreve as cores de DESTAQUE
    document.documentElement.style.setProperty('--primary', accent.primary);
    document.documentElement.style.setProperty('--accent', accent.accent);

    // 3. Salva as escolhas no localStorage
    localStorage.setItem('deutschAppThemeBase', baseName);
    localStorage.setItem('deutschAppThemeAccent', accentName);
}
