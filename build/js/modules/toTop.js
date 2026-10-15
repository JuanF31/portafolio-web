export function Top() {
    const hint = document.querySelector('#scroll-hint');
    const toTop = document.querySelector('#top');
    const ring = document.querySelector('.top-bar');

    const len = ring.getTotalLength();
    ring.style.strokeDasharray = len;

    toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

    const update = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        hint.classList.toggle('is-hidden', scrollY > 60);
        toTop.classList.toggle('is-visible', scrollY > 500);
        ring.style.strokeDashoffset = len * (1 - scrollY / max);
    };

    addEventListener('scroll', update, { passive: true });
    update();
}