const mfeCarregados = {};

/**
 * Função para carregar um MFE
 * @param {string} nomeMfe - Nome do MFE a ser carregado
 */
function loadMFE(nomeMfe) {
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    
    if (mfeCarregados[nomeMfe]) {
        console.log(`MFE ${nomeMfe} já carregado. Renderizando novamente.`);
        if (window[`render${nomeMfe.toUpperCase()}`]) {
            window[`render${nomeMfe.toUpperCase()}`]('app');
        }
        return;
    }

    const script = document.createElement('script');
    script.src = `public/${nomeMfe}/mfe${nomeMfe.slice(-1)}.js`;
    script.onload = () => {
        console.log(`MFE ${nomeMfe} carregado.`);
        if (window[`render${nomeMfe.toUpperCase()}`]) {
            window[`render${nomeMfe.toUpperCase()}`]('app');
            mfeCarregados[nomeMfe] = true; 
        }
    };
    script.onerror = () => {
        console.error(`Falha ao carregar o MFE: ${nomeMfe}`);
        app.innerHTML = `<p>Erro ao carregar o MFE: ${nomeMfe}</p>`;
    };
    document.body.appendChild(script);
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#/', '');
    if (hash) {
        loadMFE(hash);
    }
});

const initialHash = window.location.hash.replace('#/', '') || 'mfe1';
loadMFE(initialHash);
