
export function Active(header) {
    const sections = document.querySelectorAll('section[id]');

    if (!sections.length) {
        return;
    }

    const linkFor = id => document.querySelector(`.nav-list a[href$="#${id}"]`);

    function update() {
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - headerHeight - 20,
                sectionId = current.getAttribute('id');

            const link = linkFor(sectionId);

            if (!link) {
                return;
            }

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        })


        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
            document.querySelectorAll('.nav-list a').forEach(l => {
                l.classList.remove('active-link');
            })

            const last = linkFor(sections[sections.length - 1].id);

            if (last) {
                last.classList.add('active-link');
            }
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}