const cards = '.about,.timeline-card,.about-stat,.skill-box,.contact-row,.contact-terminal,.code-mockup,.footer-contact-item,.education-card'

export function Spotlight(selector = cards) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            card.style.setProperty('--mx', `${e.clientX - r.left}px`)
            card.style.setProperty('--my', `${e.clientY - r.top}px`)
        })
    })
}