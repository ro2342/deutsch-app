// ui/components.js

/**
 * ATUALIZADO: Retorna o cabeçalho no estilo "iOS subpage".
 * - Se 'backLink' e 'backText' forem fornecidos, mostra o botão de voltar.
 * - Se não, mostra apenas o título centralizado (usado para a Home).
 */
export function getPageHeader(title, backLink = null, backText = 'Voltar') {
    
    let backButtonHtml = '';

    if (backLink) {
        backButtonHtml = `
            <a href="${backLink}" class="back-link">
                <ion-icon name="chevron-back-outline"></ion-icon>
                <span>${backText}</span>
            </a>
        `;
    }
    
    return `
        <div class="ios-subpage-header">
            ${backButtonHtml}
            <h2>${title}</h2>
        </div>
    `;
}
