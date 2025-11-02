// themes.js - Definições dos 14 temas
// ATUALIZADO: Nomes temáticos (Alemão/Português) e cores mais distintas

window.themes = {
    // --- Temas Padrão ---
    light: {
        name: 'Hell (Claro)',
        primary: '#667eea',
        bg: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        text: '#2d3748',
        'text-rgb': '45, 55, 72',
        card: '#f8f9fa',
        'card-rgb': '248, 249, 250',
        accent: '#764ba2',
        border: '#e0e0e0',
        'border-rgb': '224, 224, 224'
    },
    dark: {
        name: 'Dunkel (Escuro)',
        primary: '#bb86fc',
        bg: 'linear-gradient(135deg, #121212, #1a1a1a)',
        text: '#f7fafc',
        'text-rgb': '247, 250, 252',
        card: '#1e1e1e',
        'card-rgb': '30, 30, 30',
        accent: '#03dac6',
        border: '#333333',
        'border-rgb': '51, 51, 51'
    },
    
    // --- Temas Temáticos ---
    lied: {
        name: 'Lied (Canção)', // Debut
        primary: '#2a9d8f',
        bg: 'linear-gradient(135deg, #f0fbf9, #e3f5f3)',
        text: '#0d302c',
        'text-rgb': '13, 48, 44',
        card: '#e3f5f3',
        'card-rgb': '227, 245, 243',
        accent: '#264653',
        border: '#b8e3de',
        'border-rgb': '184, 227, 222'
    },
    furchtlos: {
        name: 'Furchtlos (Destemido)', // Fearless
        primary: '#b89b2e',
        bg: 'linear-gradient(135deg, #fffef9, #faf5e4)',
        text: '#3d3019',
        'text-rgb': '61, 48, 25',
        card: '#faf5e4',
        'card-rgb': '250, 245, 228',
        accent: '#ffd700',
        border: '#f0e6c8',
        'border-rgb': '240, 230, 200'
    },
    verzaubert: {
        name: 'Verzaubert (Encantado)', // Speak Now
        primary: '#8e44ad',
        bg: 'linear-gradient(135deg, #f9f5ff, #f0e6ff)',
        text: '#2d2033',
        'text-rgb': '45, 32, 51',
        card: '#f0e6ff',
        'card-rgb': '240, 230, 255',
        accent: '#9b59b6',
        border: '#d8c3e8',
        'border-rgb': '216, 195, 232'
    },
    scharlachrot: {
        name: 'Scharlachrot (Escarlate)', // Red
        primary: '#c0392b',
        bg: 'linear-gradient(135deg, #fff5f5, #ffe6e6)',
        text: '#2d1a1a',
        'text-rgb': '45, 26, 26',
        card: '#ffe6e6',
        'card-rgb': '255, 230, 230',
        accent: '#e74c3c',
        border: '#f5c6cb',
        'border-rgb': '245, 198, 203'
    },
    stil: {
        name: 'Stil (Estilo)', // 1989
        primary: '#3498db',
        bg: 'linear-gradient(135deg, #f0f8ff, #e3f2fd)',
        text: '#1a2d3d',
        'text-rgb': '26, 45, 61',
        card: '#e3f2fd',
        'card-rgb': '227, 242, 253',
        accent: '#5dade2',
        border: '#b3d9f2',
        'border-rgb': '179, 217, 242'
    },
    schlangenhaut: {
        name: 'Schlangenhaut (Pele de Cobra)', // Reputation
        primary: '#cccccc',
        bg: 'linear-gradient(135deg, #111111, #1e1e1e)',
        text: '#f5f5f5',
        'text-rgb': '245, 245, 245',
        card: '#1e1e1e',
        'card-rgb': '30, 30, 30',
        accent: '#95a5a6',
        border: '#333333',
        'border-rgb': '51, 51, 51'
    },
    tageslicht: {
        name: 'Tageslicht (Luz do Dia)', // Lover
        primary: '#ff69b4',
        bg: 'linear-gradient(135deg, #fff0f8, #e3f2fd)', // Pink e Azul
        text: '#3d1a2d',
        'text-rgb': '61, 26, 45',
        card: '#ffe6f5',
        'card-rgb': '255, 230, 245',
        accent: '#89cff0', // Baby blue
        border: '#ffc0e0',
        'border-rgb': '255, 192, 224'
    },
    strickjacke: {
        name: 'Strickjacke (Cardigã)', // folklore
        primary: '#5f6e65', // Verde musgo
        bg: 'linear-gradient(135deg, #f5f5f5, #e8ebe9)',
        text: '#2c3e50',
        'text-rgb': '44, 62, 80',
        card: '#ecf0f1',
        'card-rgb': '236, 240, 241',
        accent: '#95a5a6',
        border: '#bdc3c7',
        'border-rgb': '189, 195, 199'
    },
    goldrausch: {
        name: 'Goldrausch (Corrida do Ouro)', // evermore
        primary: '#8b4513', // Marrom
        bg: 'linear-gradient(135deg, #faf5f0, #f0e6d8)',
        text: '#2d1a0f',
        'text-rgb': '45, 26, 15',
        card: '#f0e6d8',
        'card-rgb': '240, 230, 216',
        accent: '#a0522d', // Sienna
        border: '#d4c4b0',
        'border-rgb': '212, 196, 176'
    },
    mitternacht: {
        name: 'Mitternacht (Meia-noite)', // Midnights
        primary: '#483d8b', // Dark slate blue
        bg: 'linear-gradient(135deg, #0f0f1e, #1a1a3e)',
        text: '#e8e8ff',
        'text-rgb': '232, 232, 255',
        card: '#1a1a3e',
        'card-rgb': '26, 26, 62',
        accent: '#4169e1', // Royal blue
        border: '#2d2d5f',
        'border-rgb': '45, 45, 95'
    },
    dichter: {
        name: 'Dichter (Poeta)', // TTPD
        primary: '#708090', // Slate gray
        bg: 'linear-gradient(135deg, #f8f8fa, #e8e8ed)',
        text: '#2d2d33',
        'text-rgb': '45, 45, 51',
        card: '#e8e8ed',
        'card-rgb': '232, 232, 237',
        accent: '#778899', // Light slate gray
        border: '#c0c0cc',
        'border-rgb': '192, 192, 204'
    },
    scheinwerfer: {
        name: 'Scheinwerfer (Holofote)', // TLOAS
        primary: '#f5a623',
        bg: 'linear-gradient(135deg, #fef9f3, #fff5e8)',
        text: '#3a2e1f',
        'text-rgb': '58, 46, 31',
        card: '#fff5e8',
        'card-rgb': '255, 245, 232',
        accent: '#f7c35f',
        border: '#f8e6ce',
        'border-rgb': '248, 230, 206'
    }
};
