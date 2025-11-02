// ui/components.js

export function getPageHeader(userProfile, title) {
    const avatarUrl = userProfile.avatarUrl || `https://placehold.co/100x100/333/FFF?text=${userProfile.name.charAt(0)}`;
    return `
        <div class="flex items-center gap-4 mb-8 pt-8">
            <img src="${avatarUrl}" alt="Avatar" class="w-16 h-16 rounded-full object-cover shadow-lg border-2" style="border-color: var(--primary);">
            <div>
                <h1 class="font-bold text-3xl md:text-4xl">${title}</h1>
                <p class="text-lg text-secondary">Olá, ${userProfile.name.split(' ')[0]}!</p>
            </div>
        </div>
    `;
}
