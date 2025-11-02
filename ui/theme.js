// ui/theme.js

let allThemes = {};

export function initThemeService(themes) {
    allThemes = themes;
    // Aplica o tema salvo no localStorage imediatamente
    const savedTheme = localStorage.getItem('deutschAppTheme');
    if (savedTheme && allThemes[savedTheme]) {
        applyTheme(savedTheme);
    }
}

export function applyTheme(themeName) {
    const theme = allThemes[themeName];
    if (!theme) {
        console.warn(`Tema "${themeName}" não encontrado.`);
        return;
    }

    // Define as variáveis CSS globais
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--card', theme.card);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--border', theme.border);
    document.documentElement.style.setProperty('--text-rgb', theme['text-rgb'] || '45, 32, 51');
    document.documentElement.style.setProperty('--card-rgb', theme['card-rgb'] || '240, 230, 255');
    document.documentElement.style.setProperty('--border-rgb', theme['border-rgb'] || '216, 195, 232');

    localStorage.setItem('deutschAppTheme', themeName);
}
