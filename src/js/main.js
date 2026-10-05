/*=============== HEADER (una sola declaración) ===============*/
const header = document.querySelector('.header')

/*=============== ALTURA DEL HEADER EN VARIABLE CSS ===============*/
const setHeaderHeight = () => {
    if (!header) return
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
}

setHeaderHeight()

if (header) {
    if ('ResizeObserver' in window) {
        new ResizeObserver(setHeaderHeight).observe(header)
    } else {
        window.addEventListener('resize', setHeaderHeight)
    }
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset
    const headerHeight = header ? header.offsetHeight : 0

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - headerHeight - 20,
            sectionId = current.getAttribute('id')

        const link = document.querySelector('.nav-list a[href$="#' + sectionId + '"]')
        if (!link) return

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            link.classList.add('active-link')
        } else {
            link.classList.remove('active-link')
        }
    })

    // Si llegaste al final de la página, activa solo la última sección
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
        document.querySelectorAll('.nav-list a').forEach(l => l.classList.remove('active-link'))
        const last = document.querySelector('.nav-list a[href$="#' + sections[sections.length - 1].id + '"]')
        if (last) last.classList.add('active-link')
    }
}
window.addEventListener('scroll', scrollActive, { passive: true })
window.addEventListener('resize', scrollActive)
scrollActive()

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    if (!header) return
    // Cuando el scroll pasa de 80px, agrega la clase scroll-header
    if (window.scrollY >= 80) header.classList.add('scroll-header')
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader, { passive: true })
scrollHeader()

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
document.addEventListener('DOMContentLoaded', function () {
    var revealEls = document.querySelectorAll('.reveal')
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15 })
    revealEls.forEach(function (el) { observer.observe(el) })
})

/*=============== EFECTO DE LUZ DEL MOUSE EN TARJETAS ===============*/
document.querySelectorAll('.about,.timeline-card,.about-stat,.skill-box,.contact-row,.contact-terminal,.code-mockup,.footer-contact-item,.education-card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect()
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px')
        c.style.setProperty('--my', (e.clientY - r.top) + 'px')
    })
})

/*=============== BARRA DE PROGRESO ===============*/
;(function () {
    var p = document.querySelector('.progress')
    if (!p) return
    function u() {
        var h = document.documentElement.scrollHeight - innerHeight
        p.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'
    }
    addEventListener('scroll', u, { passive: true })
    u()
})()

// LLOADER
            var loader = document.getElementById('loader');
            if (loader) {
                var t = Date.now(), hidden = false;
                var hideLoader = function () {
                    if (hidden) return;
                    hidden = true;
                    setTimeout(function () {
                        loader.classList.add('is-hidden');
                        setTimeout(function () { loader.remove(); }, 600);
                    }, Math.max(0, 500 - (Date.now() - t)));
                };
                if (document.readyState === 'complete') hideLoader();
                else window.addEventListener('load', hideLoader);
                setTimeout(hideLoader, 5000); /* seguro por si algún recurso tarda demasiado */
            }