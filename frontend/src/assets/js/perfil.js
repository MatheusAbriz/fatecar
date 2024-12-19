const barraL = document.getElementsByClassName('barra-lateral');
const opcoesNav = document.getElementsByClassName('opcoes-nav');


// Função para inicializar a animação da barra lateral
export function inicializarBarraLateral(tipo) {
    for (let i = 0; i < opcoesNav.length; i++) {
        opcoesNav[i].addEventListener('mouseover', function () {
            const barraActive = document.getElementsByClassName('barra-lateral-active');
            // Verificando se o elemento está no hover e fazendo a barra o acompanhar
            if (opcoesNav[0].matches(':hover')) {
                barraActive[0].style.top = '20px';
            } else if (opcoesNav[1].matches(':hover')) {
                barraActive[0].style.top = '96px';
            }

            for (let j = 0; j < opcoesNav.length; j++) {
                opcoesNav[j].style.maxWidth = '200px';
                barraActive[0].style.width = '263px';
                barraL[0].style.marginLeft = '0';
            }
        });
    }

    barraL[0].addEventListener('mouseout', function () {
        const barraActive = document.getElementsByClassName('barra-lateral-active');

        for (let i = 0; i < opcoesNav.length; i++) {
            opcoesNav[i].style.maxWidth = '40px';
            barraActive[0].style.width = '103px';
            if(tipo == 'cadastro'){
                barraL[0].style.marginLeft = '-25px';
                barraActive[0].style.top = '96px';
            }
            
            if (!opcoesNav[i].matches(':hover') && !barraL[0].matches(':hover')) {
                barraActive[0].style.top = '20px';
            }
        }
    });
}

// Função para abrir o modal
export function abrirModal(tipoForm) {
    const modalEndereco = document.getElementsByClassName('modal-endereco');
    const containerDados = document.getElementById('container-dados');
    const posicaoScroll = window.scrollY;
    const modalEmailT = document.getElementsByClassName('modal-email-telefone');

    if (tipoForm === 'endereco') {
        modalEndereco[0].style.top = `calc(${posicaoScroll}px + 50px)`;
        modalEndereco[0].style.display = 'flex';
        containerDados.style.transition = 'all ease-in-out 300ms';
        setTimeout(() => {
            modalEndereco[0].style.opacity = '1';
            containerDados.style.filter = 'blur(2px)';
        }, 500);
    } else if (tipoForm === 'email' || tipoForm === 'telefone') {
        modalEmailT[0].style.top = `calc(${posicaoScroll}px + 50px)`;
        modalEmailT[0].style.display = 'flex';
        containerDados.style.transition = 'all ease-in-out 300ms';
        setTimeout(() => {
            modalEmailT[0].style.opacity = '1';
            containerDados.style.filter = 'blur(2px)';
        }, 500);
    } else if (tipoForm === 'perfil') {
        modalEndereco[0].style.top = `calc(${posicaoScroll}px + 50px)`;
        modalEndereco[0].style.display = 'flex';
        containerDados.style.transition = 'all ease-in-out 300ms';
        setTimeout(() => {
            modalEndereco[0].style.opacity = '1';
            containerDados.style.filter = 'blur(2px)';
        }, 500);
    }
}

// Função para fechar o modal
export function fecharModal(tipoForm) {
    const modalEndereco = document.getElementsByClassName('modal-endereco');
    const containerDados = document.getElementById('container-dados');
    const modalEmailT = document.getElementsByClassName('modal-email-telefone');

    if (tipoForm === 'endereco') {
        modalEndereco[0].style.opacity = '0';
        containerDados.style.filter = 'unset';
        setTimeout(() => {
            modalEndereco[0].style.display = 'none';
            containerDados.style.transition = 'unset';
        }, 500);
    } else if (tipoForm === 'email' || tipoForm === 'telefone') {
        modalEmailT[0].style.opacity = '0';
        containerDados.style.filter = 'unset';
        setTimeout(() => {
            modalEmailT[0].style.display = 'none';
            containerDados.style.transition = 'unset';
        }, 500);
    }
}