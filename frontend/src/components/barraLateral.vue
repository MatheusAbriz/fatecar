<template>
        <!--Área de dados-->
        <section id="container-dados">
            <div class="barra-lateral" style="margin-left: -25px">
                <div class="container-teste">
                        <RouterLink to="/perfilView" style="text-decoration: none"><a href="/perfilView" class="opcoes-nav"><img src="../assets/img/foto-usuario.png" alt="foto usuario">Meu Perfil</a></RouterLink>
                        <RouterLink to="/cadastroView" style="text-decoration: none"><a href="/cadastroView" class="opcoes-nav"><img src="../assets/img/cadastro-usuario.png" alt="foto cadastro">Meu Cadastro</a></RouterLink>

                </div>
                <span class="barra-lateral-active"></span>

                <a onclick="sair();" class='logout-usuario'><img src="../assets/img/logout-usuario.png" alt="icone logout usuario"></a>
            </div>
            <div class="container-cadastro">
                <h1 class='titulo-cadastro'>Meu Cadastro</h1>
                <h2 class="subtitulo-cadastro">Configure o seu cadastro</h2>

                <div class="container-form-cadastro">
                    <h2 class="titulo-form">Dados da conta</h2>

                    <form action="#" class="form-cadastro" @submit.prevent="sendForm">
                        <label for="nomeCadastro">Nome completo:</label>
                        <input type="text" name="nomeCadastro" id="nomeCadastro" class="input-cadastro input-nome" placeholder="Digite seu nome...">

                        <label for="cpfCadastro">CPF/CNPJ</label>
                        <input type="text" name="cpfCadastro" id="cpfCadastro" class="input-cadastro input-cpf" placeholder="Digite seu cpf..." maxlength="14" v-mask="'###.###.###-##'" disabled>

                        <label for="senhaCadastro">Senha Atual:</label>
                        <input type="password" name="senhaCadastro" id="senhaCadastro" class="input-cadastro input-senha" disabled>
                        <span class="span-senha" @click="senha(0)"></span>


                        <label for="nova-senha">Nova Senha:</label>
                        <input type="password" name="nova-senha" id="nova-senha" class="input-cadastro input-nova-senha" placeholder="Digite uma nova senha...">
                        <span class="span-senha span-nova-senha" @click="senha(1)"></span>

                        <span class='span-botao' v-if="!verificaLogado()"><button type='submit' class='form-botao' value='passageiro' 
                        @click="alterarDados('passageiro');">Salvar Alterações</button></span>

                        <span v-else><button type='button' class='form-botao' value='motorista' @click="alterarDados('motorista');">Salvar Alterações</button></span>
                        
                    </form>
                </div>
            </div>

            <div class="container-info">
                <div class="container-email">
                    <p class="texto-info mostraDados texto-email"></p>
                    <button class='botao-info' value = 'email' @click="abrirModal('email')">Alterar</button>
                </div>
                <div class="container-telefone">
                    <p class="texto-info texto-telefone"></p>
                    <button class="botao-info" value='telefone' @click="abrirModal('telefone')">Alterar</button>
                </div>
            </div>

            <div class="container-endereco">
                <h1 class="titulo-endereco">Endereços</h1>
                <div class="container-form">
                    <span class="span-alterar"><button class="botao-info" value="endereco" @click="abrirModal('endereco')">Alterar</button></span>
                    <div class="container-form-texto">
                        <p class='texto-endereco texto-endereco'></p>
                    </div>
                </div>
            </div>
        </section>

    <!--MODAL FORMULARIO ENDERECO-->
    <div class="modal-endereco">
    <span class="fechar-modal"><button class="botao-fechar-modal" style="color: #000" value = 'endereco' @click="fecharModal('endereco')">X</button></span>
    <form action="#" class="form-cadastro" @submit.prevent="sendForm">
        <label for="endereco">Endereço:</label>
        <input type="text" name="endereco" id="enderecoCadastro" class="input-cadastro input-endereco" placeholder="Digite seu endereço...">

        <label for="cidade">Cidade:</label>
        <input type="text" name="cidade" id="cidadeCadastro" class="input-cadastro input-cidade" placeholder="Digite sua cidade...">

        <span class='span-botao' v-if="!verificaLogado()"><button type='submit' class='form-botao' @click="alterarEndereco('passageiro')">Salvar Alterações</button></span>
        <span class='span-botao' v-else><button type='submit' class='form-botao' @click="alterarEndereco('motorista')">Salvar Alterações</button></span>

    </form>
    </div>

    <!--MODAL FORMULARIO EMAIL/TELEFONE-->
    <div class="modal-email-telefone">
    <span class="fechar-modal"><button class="botao-fechar-modal" style="color: #000" value = 'email' @click="fecharModal('email')">X</button></span>
    <form action="#" class="form-cadastro" @submit.prevent="sendForm">
        <label for="complemento">Email:</label>
        <input type="email" name="email" id="emailCadastro" class="input-cadastro input-email" placeholder="Digite seu email...">

        <label for="endereco">Telefone:</label>
        <input type="text" name="telefone" id="telefoneCadastro" class="input-cadastro input-telefone" v-mask="'(##) #####-####'" placeholder="Digite seu telefone..." maxlength="15">
        <span class='span-botao' v-if="!verificaLogado()"><button type='submit' class='form-botao' @click="alterarTelefoneEmail('passageiro')">Salvar Alterações</button></span>
        <span class='span-botao' v-else><button type='submit' class='form-botao' @click="alterarTelefoneEmail('motorista')">Salvar Alterações</button></span>
    </form>
    </div>
</template>

<script setup>
import { inicializarBarraLateral, abrirModal, fecharModal } from '../assets/js/perfil.js';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { TheMask } from 'vue-the-mask';
import axios from 'axios';


onMounted(() =>{
    verificaLogado()
    inicializarBarraLateral('cadastro');
})
const router = useRouter();
const usuario = ref('');
const usuarioBanco = ref('');
const usuarioFormulario = reactive({
    nome: '',
    senha: ''
})

//Realizando a busca pelo ID e tipo de usuario retornado em verificaLogado
const buscaUsuario = async(id, tipo) =>{
    //Requisicao com try catch
    try{
        const res = await axios.get(`http://localhost:3000/${tipo}/${id}`);
        usuarioBanco.value = res.data;

        //Agora, eu imprimo no HTML
        const textoEmail = document.getElementsByClassName('texto-email')
        const textoTelefone = document.getElementsByClassName('texto-telefone');
        const textoEndereco = document.getElementsByClassName('texto-endereco');
        const nome = document.getElementsByClassName('input-nome')
        const cpf = document.getElementsByClassName('input-cpf')
        const senha = document.getElementsByClassName('input-senha')

        textoEmail[0].innerHTML = `Email: ${usuarioBanco.value.email}`;
        textoTelefone[0].innerHTML = `Telefone: ${usuarioBanco.value.telefone}`
        textoEndereco[0].innerHTML = `${usuarioBanco.value.endereco}`
        nome[0].value = `${usuarioBanco.value.nome}`
        cpf[0].value = `${usuarioBanco.value.cpf}`
        senha[0].value = `${usuarioBanco.value.senha}`
        
    }catch(error){
        console.log("Erro!", error)
    }
}

//Verificando se o usuário está logado
const verificaLogado = () =>{
    if(localStorage.getItem('logadoMotorista')){
        usuario.value = JSON.parse(localStorage.getItem('logadoMotorista'));
        buscaUsuario(usuario.value.id, 'motorista')
        return true;
    }else if(localStorage.getItem('logadoPassageiro')){
        usuario.value = JSON.parse(localStorage.getItem('logadoPassageiro'));
        buscaUsuario(usuario.value.id, 'passageiro');
        return false;
    }else{
        alert("Você não está logado ou não possui um registro! Por favor, logue e/ou faça um cadastro antes");
        router.push({ name: 'passageiroView' });
    }
}

//Funcao para exibir a senha para o usuario
const senha = (tipo) =>{
    const senhaCadastro = document.getElementsByClassName('input-senha')[0];
    const senhaLogin = document.getElementsByClassName('input-nova-senha')[0];
    const spanSenha = document.getElementsByClassName('span-senha');
    
    //tipo 1 == formulario Cadastro, tipo 2 == formLogin
    if(tipo == 0){
        //Se o tipo tiver como password, irá transformar em text e vice-versa
        if(senhaCadastro.type == 'password'){
            senhaCadastro.type = 'text';
            spanSenha[0].style.backgroundImage = "url(/src/assets/img/senha-escondida.svg)";
            
        }else{
            senhaCadastro.type = 'password';
            spanSenha[0].style.backgroundImage = "url(/src/assets/img/senha-aberta.svg)";
        }
    }else{
        if(senhaLogin.type == 'password'){
            senhaLogin.type = 'text';
            spanSenha[1].style.backgroundImage = "url(/src/assets/img/senha-escondida.svg)";
        }else{
            senhaLogin.type = 'password';
            spanSenha[1].style.backgroundImage = "url(/src/assets/img/senha-aberta.svg)";
        }
    }
}

//Alterar dados da conta
const alterarDados = async(tipo) =>{
    try{
        const inputNome = document.getElementsByClassName('input-nome')[0]
        const inputSenha = document.getElementsByClassName('input-nova-senha')[0]

        const dados = { nome: inputNome.value, senha: inputSenha.value }
        const res = await axios.put(`http://localhost:3000/${tipo}/update/${usuario.value.id}`, dados)
        alert("Atualizado com sucesso!")
    }catch(error){
        console.log("Erro!", error)
    }
}

//Alterar telefone e email somente
const alterarTelefoneEmail = async(tipo) =>{
    try{
        const inputTelefone = document.getElementsByClassName('input-telefone')[0]
        const inputEmail = document.getElementsByClassName('input-email')[0]

        const dados = { telefone: inputTelefone.value, email: inputEmail.value}
        const res = await axios.put(`http://localhost:3000/${tipo}/update/${usuario.value.id}`, dados)
        alert("Atualizado com sucesso!");
    }catch(error){
        console.log("Erro!", error)
    }
}

//Alterar endereco somente
const alterarEndereco = async(tipo) =>{
    try{
        const inputEndereco = document.getElementsByClassName('input-endereco')[0]
        const inputCidade = document.getElementsByClassName('input-cidade')[0]

        const dados = { endereco: inputEndereco.value, cidade: inputCidade.value }
        const res = await axios.put(`http://localhost:3000/${tipo}/update/${usuario.value.id}`, dados)
        alert("Atualizado com sucesso!");
    }catch(error){
        console.log("Erro!", error)
    }
}
</script>

<style scoped>
*{
    color: #FFF;
}
body{
    background-color: var(--cor-fundo-escuro);
}
/*container area de dados*/
#container-dados{
    display: flex;
    justify-content: space-around;
}

.container-cadastro{
    display: flex;
    flex-direction: column;
    margin: 2rem 0;
    padding-left: 2rem;
    position: relative;
}

.titulo-cadastro{
    font-size: 34px;
}

.subtitulo-cadastro{
    font-size: 16px;
    color: #C2C2C2;
    margin-bottom: 1rem;
}

.barra-lateral{
    padding: 2rem;
    background-color: #2F2E2E;
    display: flex;
    align-items: center;    
    flex-direction: column;
    position: relative;
    width: fit-content;
    z-index: 1;
    justify-content: space-between;
    transition: all ease-in-out 500ms;
    align-self: stretch;
    margin-left: -25px;
}

.barra-lateral-active{
    background-color: var(--cor-fundo-escuro);
    position: absolute;
    width: 103px;
    height: 60px;
    z-index: -1;
    top: 96px;
    transition: all ease-in-out 500ms;
}

.container-teste{
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 2rem;
    transition: all ease-in-out 500ms;
}

.span-senha{
    background-image: url('../assets/img/senha-aberta.svg');
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 9px;
    bottom: 190px;
}

.span-senha:hover{
    cursor: pointer;
}

.span-nova-senha{
    bottom: 97px;
}

.opcoes-nav{
    display: flex;
    max-width: 40px;
    overflow: hidden;
    transition: all ease-in-out 500ms;
    text-decoration: none;
    font-size: 16px;
    column-gap: 2.5rem;
    align-items: center;
    white-space: nowrap;
}

.opcoes-nav a{
    text-decoration: none;
}

.opcoes-nav:nth-child(3), .opcoes-nav:nth-child(4){
    white-space: wrap;
}

.opcoes-nav img, .logout-usuario img{
    max-width: 40px;
    height: auto;
}

.container-form-cadastro{
    margin-top: 1rem;
    border: 2.5px solid #F9F9F9;
    border-radius: 20px;
    padding: 1rem 2rem;
}

.logout-usuario{
    margin-top: 2rem;
}

/*estilizacao formulario*/
.form-cadastro{
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: .8rem;
    position: relative;
}

.titulo-form{
    font-size: 20px;
    margin-bottom: .8rem;
}

.container-form-cadastro{
    width: vw;
    min-width: 400px;
}

.form-cadastro label{
    font-size: 16px;
}

.modal-email-telefone label, .modal-endereco label{
    color: #0B1215;
}

.input-cadastro{
    background-color: #C2C2C2;
    border-radius: 10px;
    height: 40px;
    padding: .6rem;
    width: 100%;
    color: #2F2E2E;
    position: relative;
}

.nova-senha{
    content: '';
    background-image: url('../img/senha-escondida.svg');
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 46px;
    top: 446px;
}

.nova-senha:hover, .confirmar-senha:hover{
    cursor: pointer;
}

.confirmar-senha{
    content: '';
    background-image: url('../img/senha-escondida.svg');
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 46px;
    top: 530px;
}


.form-botao{
    color: #FFF;
    font-size: 18px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .5rem 5rem;
    transition: all ease-in-out .5s;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
    margin: 1rem 0;
}

.form-botao:hover{
    cursor: pointer;
    transform: translateY(-10px);
}

/*container de email/telefone*/
.container-info{
    border: 2.5px solid #F9F9F9;
    border-radius: 20px;
    margin: 7.5rem 2rem 0 2rem;
    height: 350px;
    width: 30vw;
    min-width: 500px;
}

.container-email, .container-telefone{
    display: grid;
    grid-template-columns: 60% 20% 10%;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.container-email{
    border-bottom: 2px solid #C2C2C2;
}

.texto-info, .texto-endereco{
    font-size: 16px;
}

.botao-info{
    background-color: transparent;
    border: none;
    color: var(--cor-hover);
    font-size: 16px;
    grid-column-start: 3;
    grid-column-end: 4;
}

.botao-info:hover{
    cursor: pointer;
}

.sublinhado-info{
    width: 100%;
    height: 2px;
    background-color: #C2C2C2;
}

.container-endereco{
    display: flex;
    flex-direction: column;
    border: 2.5px solid #F9F9F9;
    height: 350px;
    width: 30vw;
    min-width: 450px;
    border-radius: 20px;
    margin: 7.5rem 2rem 0 0;
    padding: 1rem 2rem 2rem 2rem;
    row-gap: 1rem;
}

.container-endereco .container-form{
    border: 2.5px solid #C2C2C2;
    border-radius: 10px;
    -webkit-box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    -moz-box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    padding: .7rem;
}

.container-form{
    display: grid;
    grid-template-rows: 30px 30px;
}

.span-botao{
    align-self: center;
}

.span-alterar{
    grid-row-start: 1;
    grid-row-end: 2;
    justify-self: end;
    grid-column-start: 3;
    grid-column-end: 3;
}

.span-excluir{
    grid-row-start: 2;
    grid-row-end: 3;
    justify-self: end;
    grid-column-start: 3;
    grid-column-end: 3;
}

.subtexto-endereco{
    font-size: 12px;
    color: #C2C2C2;
}

.botao-endereco{
    background-color: transparent;
    border: 2.5px solid #C2C2C2;
    -webkit-box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    -moz-box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    box-shadow: .8px .8px .8px .8px rgba(249,249,249,0.51);
    border-radius: 10px;
    padding: 1rem;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.botao-endereco::after{
    content: '+';
    margin-left: .2rem;
    font-size: 20px;
    color: var(--cor-hover);
}

.botao-endereco:hover{
    cursor: pointer;
}

.modal-endereco, .modal-email-telefone{
    border: 2px solid #9EC6F2;
    -webkit-box-shadow: 0 0 5px #9EC6F2;
    box-shadow: 0 0 5px #9EC6F2;
    border-radius: 20px;
    width: 30vw;
    position: absolute;
    left: 50%;
    top: 90vh;
    transform: translateX(-50%);
    display: none;
    opacity: 0;
    transition: all ease-in-out 250ms;
    background-color: #f9f9f9;
    padding: 2rem;
    z-index: 3;
    flex-direction: column;
}

.modal-endereco input, .modal-email-telefone input{
    background-color: #E9E9E9;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
}

.fechar-modal{
    align-self: end;
}

.botao-fechar-modal{
    background-color: transparent;
    border: none;
    font-size: 20px;
}

.botao-fechar-modal:hover{
    cursor: pointer;
}



@media screen and (max-width: 1680px){
    #container-dados {
        display: grid;
        justify-content: center;
        flex-wrap: wrap;
        grid-template-columns: 7% 93%;
        align-items: center;
        justify-items: center;
        grid-auto-rows: auto;
        flex-wrap: wrap;
      }
      
      .barra-lateral {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 4;
        justify-self: start;
        margin-left: unset !important;
      }
      
      .container-cadastro {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 2;
        padding-left: 0;
        margin: 3rem auto 0 auto;
      }

      .container-form-cadastro, .container-info, .container-endereco{
        width: 50vw;
        min-width: unset;
        max-width: 500px;
      }
      
      .container-info {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 3;
        margin: 2rem auto 3rem auto;
        height: 280px;
      }
      
      .container-endereco {
        margin: 2rem auto 0 auto;
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 3;
        height: unset;
      }
}

@media screen and (max-width: 1440px){
    .modal-endereco, .modal-email-telefone{
        width: 40vw;
    }
}

@media screen and (max-width: 950px){
    #container-dados{
        grid-template-columns: 104px auto;
        justify-content: unset;
    }

    .texto-info, .texto-endereco{
        font-size: clamp(10px, 1.5vw, 16px);
    }

    .container-form-cadastro, .container-info, .container-endereco{
        width: 60vw;
    }
}

@media screen and (max-width: 900px){
    .modal-endereco, .modal-email-telefone{
        width: 60vw;
    }
}

@media screen and (max-width: 550px){
    .container-form-cadastro, .container-info, .container-endereco{
        width: 70vw;
    }

    .input-cadastro::placeholder, .botao-info{
        font-size: clamp(11px, 2vw, 16px);
    }
}
</style>