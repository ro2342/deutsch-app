// utils.js

/**
 * Converte o texto simples (quase-markdown) das explicações em HTML.
 */
export function parseSimpleMarkdown(text = '') {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/• (.*?)(\n|$)/g, '<ul><li>$1</li></ul>')
        .replace(/<\/ul><ul>/g, '')
        .replace(/\n/g, '<br>');
}
