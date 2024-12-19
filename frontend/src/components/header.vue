<template>
<!--Mensagem de cookies ao usuario-->
<div class="text-center" v-if="cookies">
    <v-snackbar
      v-model="snackbar"
      multi-line
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="#3158C4"
          variant="text"
          @click="snackbar = false, criaCookies()"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>


<header>
    <nav>
        <div class="container-header">
            <RouterLink to="/"><img src="../assets/img/logo-fatecar.png" alt="logo projeto fatecar" style="width: 80px; height: 80px;"></RouterLink>
            <ul class="nav-opcoes">
                <li class="nav-itens"><RouterLink to="/passageiroView">Passageiro</RouterLink></li>
                <li class="nav-itens"><RouterLink to="/motoristaView">Motorista</RouterLink></li>
                <li class="nav-itens"><RouterLink to="/documentacaoView">Documentação</RouterLink></li>
                <li class="nav-itens nav-itens-ultimo"><RouterLink to="/cadastroView"><img src="../assets/img/usuario.svg" alt="imagem do icone de perfil usuario" style="width: 30px; height: 30px;"></RouterLink></li>
            </ul>
        </div>

        <!--Menu Mobile-->
        <div class="container-header container-header-mobile" id='container-mobile'>
            <RouterLink to="/"><img src="../assets/img/logo-fatecar.png" alt="logo projeto fatecar" style="width: 80px; height: 80px;"></RouterLink>
            <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="var(--cor-fundo-claro)"
          v-bind="props"
          :icon="!menuAberto ? 'mdi-menu' : 'mdi-close'"
          @click="showMenu()"
        >

        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="item in data"
            :key="item.id"
        >
          <v-list-item-title><RouterLink :to="item.rota">{{ item.nome }}</RouterLink></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
        </div>

    </nav>
</header>
</template>

<style scoped>
*{
    color: var(--cor-texto);
}

header{
    background-color: var(--cor-fundo-claro);
}

.container-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--espacamento-padrao);
}

.container-header-mobile{
    display: none;
}

.nav-opcoes{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.nav-itens{
    list-style-type: none;
}

.nav-itens a{
    color: var(--cor-texto);
    font-size: var(--tamanho-texto);
    position: relative;
    text-decoration: none;
}

.nav-itens a::before{
    content: '';
    position: absolute;
    display: block;
    width: 0;
    top: 25px;
    height: 3px;
    background-color: #F9F9F9;
    transition: width 350ms;
}

.nav-itens-ultimo a::before{
    background-color: unset;
    opacity: 0;
}

.nav-itens-ultimo{
    transition: all ease-in-out .5s;
}

.nav-itens-ultimo:hover{
    cursor: pointer;
    transform: translateY(-2px) scale(1.1);
}

.nav-itens a:hover{
    color: var(--cor-texto);
    text-decoration: none;
}

.nav-itens a:hover::before{
    width: 100%;
}

.v-list-item-title a{
    color: #000;
    text-decoration: none;
}

#profile{
    width: 60px;
    height: 60px;
}

@keyframes giro {
    0%{
        transform: rotate(0);
        border: 3px solid #b0b0b0;
    }100%{
        transform: rotate(360deg);
        border: 3px solid #F9F9F9;
    }
}

.nav-opcoes-mobile{
    display: none;
    margin-top: -10rem;
}

.nav-opcoes-mobile, .nav-itens-mobile{
    transition: all ease-in-out 450ms;
}



/*RESPONSIVIDADE HEADER*/
@media screen and (max-width: 670px){
    .container-header{
        display: none;
    }

    .container-header-mobile{
        display: flex;
    }

    #menu-hamburguer{
        display: block;
    }

    .container-opcoes-mobile{
        background-image: url('../img/menu-aberto.png');
        width: 32px;
        height: 32px;
        background-size: cover;
        transition: all ease-in-out 350ms;
        cursor: pointer;
    }

    .nav-opcoes-mobile{
        flex-direction: column;
        padding-bottom: 2rem;
    }
}

@media screen and (max-width: 350px){
    .container-header-mobile{
        flex-direction: column;
    }

    #menu-hamburguer{
        margin-bottom: 40px;
    }
}
</style>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const cookies = ref(false);
const snackbar = ref(true)
const text = ref("Nós usamos cookies para melhorar a sua experiência em nosso site, analisar nosso tráfego e personalizar conteúdo. Ao continuar navegando, você concorda com o uso de cookies.")

//Assim, a mensagem será exibida 'para sempre'
const timeout = ref(10000000000000)

//Adicionando os botoes do menu
const data = [
    { nome: 'Passageiro', rota: '/passageiroView', id: 1 },
    { nome: 'Motorista', rota: '/motoristaView', id: 2 },
    { nome: 'Documentação', rota: '/documentacaoView', id: 3 },
    { nome: "Perfil", rota: "perfilView", id: 4 }
]

const menuAberto = ref(false)
const showMenu = () =>{
    if(menuAberto.value){
        return menuAberto.value = false;
    }
    return menuAberto.value = true;
}

//Funcao para a criacao do localStorage dos cookies
const criaCookies = () =>{
    localStorage.setItem('cookies', false);
}

onMounted(() =>{
    if(localStorage.getItem('cookies')){
        return;
    }else{
        cookies.value = true;
    }
})
</script>