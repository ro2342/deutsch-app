// ui/components.js

/**
 * ATUALIZADO: Retorna o cabeçalho principal da página no estilo "iOS",
 * apenas com o título, conforme solicitado.
 */
export function getPageHeader(userProfile, title) {
    // O userProfile não é mais necessário aqui, mas mantemos a assinatura
    // da função para não quebrar as importações nos outros arquivos.
    
    return `
        <h1 class="ios-main-title">${title}</h1>
    `;
}
