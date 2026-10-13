export function Reveal(selector = '.reveal') {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        })
    }, { threshold: 0.15 });
 
    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    })
}