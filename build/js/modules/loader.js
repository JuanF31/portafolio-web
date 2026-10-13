export function Loader(id = 'loader'){
    const loader = document.querySelector(`#${id}`);

        if (!loader) {
        return
    }
 
    const start = Date.now()
    let hidden = false
 
    function hide() {
        if (hidden) {
            return
        }
 
        hidden = true
 
        setTimeout(() => {
            loader.classList.add('is-hidden')
            setTimeout(() => {
                loader.remove()
            }, 600)
        }, Math.max(0, 500 - (Date.now() - start)))
    }
 
    if (document.readyState === 'complete') {
        hide()
    } else {
        window.addEventListener('load', hide)
    }
 
    setTimeout(hide, 5000)
}