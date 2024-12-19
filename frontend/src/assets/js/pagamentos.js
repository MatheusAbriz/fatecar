const barraL = document.getElementsByClassName('barra-lateral');
//Adicionando a animação da barra lateral
const opcoesNav = document.getElementsByClassName('opcoes-nav');
for(let i = 0; i < opcoesNav.length; i++){
    opcoesNav[i].addEventListener('mouseover', function(){
        const barraL = document.getElementsByClassName('barra-lateral');
        const barraActive = document.getElementsByClassName('barra-lateral-active')
        const logout = document.getElementsByClassName('logout-usuario')
        
        //Verificando se o elemento está no hover e fazedno a barra o acompanhar
        //foto de perfil
        if(opcoesNav[0].matches(':hover')){
            barraActive[0].style.top = '20px';
        //Meu cadastro
        }else if(opcoesNav[1].matches(':hover')){
            barraActive[0].style.top = '96px';
        //Meus pagamentos
        }else if(opcoesNav[2].matches(':hover')){
            barraActive[0].style.top = '165px';
        }

        for(let i = 0; i < opcoesNav.length; i++){
            opcoesNav[i].style.maxWidth = '200px';
            barraActive[0].style.width = '263px';
            barraL[0].style.marginLeft = '0';
            //foto de perfil

            barraL[0].addEventListener('mouseover', function(){
                opcoesNav[i].style.maxWidth = '200px';
                barraActive[0].style.width = '263px';
                barraL[0].style.marginLeft = '0';
            })
        }
    });
}

//Adicionando a animação para quando o mouse sair da barra
barraL[0].addEventListener('mouseout', function(){
    const barraActive = document.getElementsByClassName('barra-lateral-active')

    for(let i = 0; i < opcoesNav.length; i++){
        opcoesNav[i].style.maxWidth = '40px';
        barraActive[0].style.width = '103px';
        barraL[0].style.marginLeft = '-25px';


        if(!opcoesNav[i].matches(':hover') && !barraL[0].matches(':hover')){
            barraActive[0].style.top = '165px';
        }
    }
})

//Função para abrir o modal
function abrirModal(tipoForm){
    const modalEndereco = document.getElementsByClassName('modal-endereco');
    const containerDados = document.getElementById('container-dados');
    const posicaoScroll = window.scrollY;
    const modalEmailT = document.getElementsByClassName('modal-email-telefone')

    //Verificando se é o formulário de endereco
    if(tipoForm == 'endereco'){
        modalEndereco[0].style.top = `calc(${posicaoScroll}px + 50px)`;
        modalEndereco[0].style.display = 'flex';
        containerDados.style.transition = 'all ease-in-out 300ms'
        setTimeout(function(){
            modalEndereco[0].style.opacity = '1';
            containerDados.style.filter = 'blur(2px)';
        }, 500)
    }else if(tipoForm == 'email' || tipoForm == 'telefone'){
        modalEmailT[0].style.top = `calc(${posicaoScroll}px + 50px)`;
        modalEmailT[0].style.display = 'flex';
        containerDados.style.transition = 'all ease-in-out 300ms';
        setTimeout(function(){
            modalEmailT[0].style.opacity = '1';
            containerDados.style.filter = 'blur(2px)';
        }, 500)
    }
    console.log(tipoForm)
}

//Função para fechar o modal
function fecharModal(tipoForm){
    const modalEndereco = document.getElementsByClassName('modal-endereco');
    const containerDados = document.getElementById('container-dados');
    const modalEmailT = document.getElementsByClassName('modal-email-telefone')
    //Verificando se é o formulário de endereço
    if(tipoForm == 'endereco'){
        modalEndereco[0].style.opacity = '0'
        containerDados.style.filter = 'unset'
        setTimeout(function(){
            modalEndereco[0].style.display = 'none'
            containerDados.style.transiton = 'unset'
        }, 500)

    }else if(tipoForm == 'email' || tipoForm == 'telefone'){
        modalEmailT[0].style.opacity = '0'
        containerDados.style.filter = 'unset'
        setTimeout(function(){
            modalEmailT[0].style.display = 'none'
            containerDados.style.transition = 'unset'
        }, 500)
    }
}

//Função para definir o objeto da máscara
function mascara(o, f){
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

//Função que executará a máscara
function execmascara(){
    v_obj.value = v_fun(v_obj.value)
}

//Máscara para o telefone
function mascaraTelefone(t){
    t = t.replace(/\D/g, ""); //Remove tudo o que não é dígito
    t = t.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    t = t.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return t
}

//Máscara para CPF
function mascaraCPF(c){
    c = c.replace(/\D/g, ""); //Remove tudo que não é número    
    c = c.replace(/^(\d{3})/g, "$1."); //Adiciona ponto após os 3 primeiros dígitos
    c = c.replace(/(\d{3})(\d{3})/g, "$1.$2-"); //Adiciona o ponto após os outros 3 dígitos e o hífen antes dos últimos dois números
    return c;
}