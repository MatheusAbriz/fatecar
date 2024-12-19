<template>
        <!--Área de dados-->
        <section id="container-dados">
            <div class="barra-lateral">
                <div class="container-teste">
                        <RouterLink to="/perfilView" style="text-decoration: none"><a href="/perfilView" class="opcoes-nav"><img src="../assets/img/foto-usuario.png" alt="foto usuario">Meu Perfil</a></RouterLink>
                        <RouterLink to="/cadastroView" style="text-decoration: none"><a href="/cadastroView" class="opcoes-nav"><img src="../assets/img/cadastro-usuario.png" alt="foto cadastro">Meu Cadastro</a></RouterLink>

                </div>
                <span class="barra-lateral-active"></span>

                <a onclick="sair();" class='logout-usuario'><img src="../assets/img/logout-usuario.png" alt="icone logout usuario"></a>
            </div>
            <div class="container-perfil">
                <h1 class='titulo-perfil'>Meu Perfil</h1>
                <h2 class="subtitulo-perfil">Configure o seu perfil</h2>

                <div class="container-form-cadastro">
                    <h2 class="titulo-form">Dados do seu perfil</h2>

                    <form action="#" class="form-cadastro" @submit.prevent="sendForm">
                        <img src="../assets/img/img-usuario.png" alt="foto do usuario" class="img-perfil">
                        <button class="botao-info" value='perfil' @click="abrirModal('perfil')">Alterar Foto de Perfil</button>
                        <button class="botao-info" value='deletarConta' onclick="deletarPassageiro();">Deletar Conta</button>
                    </form>
                </div>
            </div>
        </section>
    <!--MODAL FORMULARIO FOTO DE PERFIL-->
    <div class="modal-endereco">
    <span class="fechar-modal"><button class="botao-fechar-modal" style="color: #000" value = 'perfil' @click="fecharModal('endereco')">X</button></span>
    <form action="#" class="form-cadastro">
        <input type="file" name="fotoP" id="input-file" class="input-foto" accept="image/*" style="margin-bottom: 1.2rem;">
        <button type='button' v-if="!verificaLogado()" class='form-botao' @click="alterarFoto('passageiro')">Alterar</button>
        <button type='button' class='form-botao' @click="alterarFoto('motorista')" v-else>Alterar</button>
    </form>
    </div>
</template>

<script setup>
import { inicializarBarraLateral, abrirModal, fecharModal } from '../assets/js/perfil.js';
import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabaseClient'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() =>{
    verificaLogado()
    inicializarBarraLateral('motorista');
    const imgPerfil = document.getElementsByClassName('img-perfil')[0];
    imgPerfil.src = `https://qnmtccqlagouvoxloevj.supabase.co/storage/v1/object/public/fatecar/${usuario.value.foto}`
})

const usuario = ref('');
//Verificando se o usuário está logado
const verificaLogado = () =>{
    if(localStorage.getItem('logadoMotorista')){
        usuario.value = JSON.parse(localStorage.getItem('logadoMotorista'));
        return true;
    }else if(localStorage.getItem('logadoPassageiro')){
        usuario.value = JSON.parse(localStorage.getItem('logadoPassageiro'));
        return false;
    }else{
        alert("Você não está logado ou não possui um registro! Por favor, logue e/ou faça um cadastro antes");
        router.push({ name: 'passageiroView' });
    }
}

//Funcao para alterar a foto de perfil do usuario
const alterarFoto = async(tipo) =>{
    const file = document.getElementById('input-file').files;
    const { data, error }  = await supabase.storage.from('fatecar').upload(`${tipo}/${usuario.value.id}/${file[0].name}`, file[0])
    const foto = data.path;
    usuario.value.foto = data.path
    const urlFoto = { foto: foto };

    //Criando a requisicao para atualizar a tabela no BD para incluir a URL
    const res = await axios.put(`http://localhost:3000/${tipo}/update/${usuario.value.id}`, urlFoto)
    alert("Foto alterada com sucesso!")
    if(tipo == 'passageiro'){
        localStorage.setItem('logadoPassageiro', JSON.stringify(usuario.value))
    }else{
        localStorage.setItem('logadoMotorista', JSON.stringify(usuario.value))
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
    align-items: center;
    flex-direction: column;
    row-gap: .8rem;
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

.img-perfil{
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.input-cadastro{
    background-color: #C2C2C2;
    border-radius: 10px;
    height: 40px;
    padding: .6rem;
    width: 100%;
    color: #2F2E2E;
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

.span-botao{
    max-width: fit-content;
    transition: width 500ms;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    margin: 1rem 0;
}

.span-botao::before{
    background-color: #000;
    content: '';
    width: 0;
    display: block;
    height: 53px;
    position: absolute;
    border-radius: 30px;
    transition: width 500ms;
    transform: translateX(0) skew(-10deg);
}

.span-botao:hover::before{
    width: 153.7px;
}

.btn-cadastro{
    color: var(--cor-texto);
    font-size: clamp(14px, 2vw, 12px);
    border: var(--borda-div);
    border-radius: 40px;
    padding: 15px 20px;
    position: relative;
    transition: width ease-in-out 500ms;
    text-decoration: none;
    background-color: transparent;
    z-index: 1;
}

.btn-cadastro:hover{
    cursor: pointer;
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

.container-perfil{
    margin: 3rem auto;
}

.texto-info, .texto-endereco{
    font-size: 16px;
}

.botao-info{
    background-color: transparent;
    border: none;
    color: var(--cor-hover);
    font-size: 16px;
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

.modal-endereco label, .modal-email-telefone label{
    color: #0B1215;
}

.input-foto{
    padding: .4rem .6rem !important;
    background-color: #E9E9E9;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
    border-radius: 20px;
    color: #0B1215;
}

.input-foto:hover{
    cursor: pointer;
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
.form-botao{
    color: #FFF;
    font-size: 16px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .7rem 7rem;
    transition: all ease-in-out .5s;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
    max-width: 350px;
}

.form-botao:hover{
    cursor: pointer;
    transform: translateY(-10px);
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