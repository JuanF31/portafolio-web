export function Top() {
    const hint = document.getElementById('scroll-hint');
    const toTop = document.getElementById('to-top');
    const ring = document.querySelector('#to-top .ring-progress');

    const ringLength = ring ? ring.getTotalLength() : 0;
    if (ring) ring.style.strokeDasharray = ringLength;

    const update = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;

        if (hint) hint.classList.toggle('is-hidden', y > 60);
        if (toTop) toTop.classList.toggle('is-visible', y > 500);
        if (ring) ring.style.strokeDashoffset = ringLength * (1 - (max > 0 ? y / max : 0));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
}