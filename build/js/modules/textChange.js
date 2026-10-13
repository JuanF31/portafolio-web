const ROLES = [
    'Desarrollador de software',
    'Desarrollador Full Stack',
    'Experiencia en PHP / Laravel',
    'Soporte técnico y sistemas'
];

export function Writer() {
    const h1 = document.querySelector('.hero-title');
    const tw = document.querySelector('[data-real]');
    if (!h1 || !tw) return;

    let timer, resizeTimer, i = 0, pos = ROLES[0].length, dir = -1;

    function reserve() {
        const keep = tw.textContent;
        let max = 0;
        h1.style.minHeight = '';
        ROLES.forEach((r) => {
            tw.textContent = r;
            max = Math.max(max, h1.offsetHeight);
        });
        tw.textContent = keep;
        h1.style.minHeight = max + 'px';
    }

    function step() {
        const r = ROLES[i];
        pos += dir === 1 ? 1 : -1;
        tw.textContent = r.slice(0, Math.max(pos, 0));

        if (dir === 1 && pos >= r.length) {
            dir = -1;
            timer = setTimeout(step, 2400);
        } else if (dir === -1 && pos <= 0) {
            dir = 1;
            i = (i + 1) % ROLES.length;
            timer = setTimeout(step, 350);
        } else {
            timer = setTimeout(step, dir === 1 ? 55 + Math.random() * 35 : 28);
        }
    }

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(reserve, 200);
    });

    document.addEventListener('visibilitychange', () => {
        clearTimeout(timer);
        if (!document.hidden) timer = setTimeout(step, 800);
    });

    tw.textContent = ROLES[0];
    reserve();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserve);

    timer = setTimeout(step, 3000);
}