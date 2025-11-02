// ui/navigation.js

function moveLiquidPill(activeLinkEl) {
    const liquidPill = document.getElementById('nav-liquid-pill');
    const navContainer = document.querySelector('.liquid-nav');
    if (!liquidPill || !navContainer) return;

    if (activeLinkEl) {
        const navRect = navContainer.getBoundingClientRect();
        const linkRect = activeLinkEl.getBoundingClientRect();
        
        const pillLeft = linkRect.left - navRect.left;
        const pillWidth = linkRect.width;

        liquidPill.style.left = `${pillLeft}px`;
        liquidPill.style.width = `${pillWidth}px`;
        liquidPill.style.opacity = '1';
        liquidPill.style.transform = 'scale(1.05)';
        setTimeout(() => {
            liquidPill.style.transform = 'scale(1)';
        }, 150);
    } else {
        liquidPill.style.opacity = '0';
        liquidPill.style.transform = 'scale(0.95)';
    }
}

export function updateNavLinks(activePath) {
    const navContainer = document.querySelector('.liquid-nav');
    if (!navContainer) return;
    let activeLinkEl = null;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.linkId === activePath) {
            activeLinkEl = link;
            link.classList.add('active');
        }
    });
    moveLiquidPill(activeLinkEl);
}

export function initLiquidNav() {
    const currentHash = window.location.hash || '#/home';
    const [path] = currentHash.substring(2).split('/');
    requestAnimationFrame(() => {
        updateNavLinks(path || 'home');
    });
}
