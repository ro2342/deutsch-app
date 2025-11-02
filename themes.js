// themes.js
// ATUALIZADO: Sistema refatorado para "Base Theme" + "Accent Color"

// 1. Temas Base (Fundo, Cards, Texto)
window.baseThemes = {
    light: {
        name: 'Claro',
        bg: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        text: '#2d3748',
        'text-rgb': '45, 55, 72',
        card: '#f8f9fa',
        'card-rgb': '248, 249, 250',
        border: '#e0e0e0',
        'border-rgb': '224, 224, 224'
    },
    dark: {
        name: 'Escuro',
        bg: 'linear-gradient(135deg, #121212, #1a1a1a)',
        text: '#f7fafc',
        'text-rgb': '247, 250, 252',
        card: '#1e1e1e',
        'card-rgb': '30, 30, 30',
        border: '#333333',
        'border-rgb': '51, 51, 51'
    }
};

// 2. Cores de Destaque (Botões, Títulos, Links)
// Seguindo a ordem solicitada
window.accentColors = {
    // 1. Verde azulado
    teal: {
        name: 'Verde azulado',
        primary: '#2a9d8f',
        accent: '#264653'
    },
    // 2. Amarelo
    yellow: {
        name: 'Amarelo',
        primary: '#b89b2e',
        accent: '#ffd700'
    },
    // 3. Roxo
    purple: {
        name: 'Roxo',
        primary: '#8e44ad',
        accent: '#9b59b6'
    },
    // 4. Vermelho
    red: {
        name: 'Vermelho',
        primary: '#c0392b',
        accent: '#e74c3c'
    },
    // 5. Azul claro
    lightBlue: {
        name: 'Azul claro',
        primary: '#3498db',
        accent: '#5dade2'
    },
    // 6. Verde neon
    neonGreen: {
        name: 'Verde neon',
        primary: '#03dac6', // Cor do antigo tema "Dark"
        accent: '#018786'
    },
    // 7. Rosa
    pink: {
        name: 'Rosa',
        primary: '#ff69b4',
        accent: '#ff1493'
    },
    // 8. Cinza
    gray: {
        name: 'Cinza',
        primary: '#808f8f',
        accent: '#95a5a6'
    },
    // 9. Marrom
    brown: {
        name: 'Marrom',
        primary: '#8b4513',
        accent: '#a0522d'
    },
    // 10. Azul escuro
    darkBlue: {
        name: 'Azul escuro',
        primary: '#483d8b',
        accent: '#4169e1'
    },
    // 11. Bege
    beige: {
        name: 'Bege',
        primary: '#a58a2a', // Cor do antigo tema "Taylor Swift"
        accent: '#c9a961'
    },
    // 12. Laranja
    orange: {
        name: 'Laranja',
        primary: '#f5a623',
        accent: '#f7c35f'
    }
};
