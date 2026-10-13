export function Header(selector = '.header'){
    const header = document.querySelector(selector);

    if(!header) { 
        return null;
    }

    const setHeight = () => {
        document.documentElement.style.setProperty(
            '--header-h', `${header.offsetHeight}px`
        );
    }

    const toggleScroll = () => {
        if(window.scrollY >= 80){
            header.classList.add('scroll-header');
        }else{
            header.classList.remove('scroll-header');
        }
    }

    setHeight();

    if('ResizeObserver' in window){
        new ResizeObserver(setHeight).observe(header);
    }else{
        window.addEventListener('resize', setHeight);
    }

    window.addEventListener('scroll', toggleScroll, {passive: true});
    toggleScroll();

    return header;

}