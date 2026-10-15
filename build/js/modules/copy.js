export function Copy(){

    const toast = document.querySelector('#toast');
    let toastT;

    const toastMessage = msg => {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastT);
        toastT = setTimeout( () => toast.classList.remove('show'), 2200 )
    }

    const copyText = text => {
        if(navigator.clipboard && window.isSecureContext){
            return navigator.clipboard.writeText(text)
                        .then( () => true, () => false );
        }
        return Promise.resolve(false);
    }

    const copyValue = btn => {
        const val = btn.dataset.copy;
        const isPhone = btn.dataset.kind = 'phone';

        copyText(val).then(ok => {
            toastMessage(ok
                ? (isPhone ? '¡Teléfono copiado!' : '¡Correo copiado!')
                : 'No se pudo copiar: ' + val);

            if (ok) {
                btn.classList.add('is-copied');
                setTimeout(() => btn.classList.remove('is-copied'), 1600);
            }
        });
    };

    

    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => copyValue(btn))
    });
}