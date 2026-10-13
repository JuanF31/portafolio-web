export function Progress(selector = '.progress') {
    const bar = document.querySelector(selector);

    if (!bar) {
        return;
    }

    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const percent = max > 0 ? (window.scrollY / max) * 100 : 0;

        bar.style.width = `${percent}%`;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}