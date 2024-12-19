<template>
<section>
    <v-carousel show-arrows="hover">
  <v-carousel-item
    src="src/assets/img/banner1.png"
    cover
  ></v-carousel-item>
  <v-carousel-item
    src="src/assets/img/banner5.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    cover
  ></v-carousel-item>
  <div class="container-texto">
    <h1>Faça parte você também!</h1>

    <div class="container-botao">
        <RouterLink to="/motoristaView" class="form-botao">Ser Motorista</RouterLink>
        <RouterLink to="/passageiroView" class="form-botao">Ser Passageiro</RouterLink>
    </div>
  </div>
</v-carousel>
</section>

</template>

<script setup>
import { onMounted } from 'vue';
//Funcao de aparecer X
const aparecerHorizontal = (div) =>{
  div.style.transform = "translateX(0)";
}

//Funcao de aparecer Y
const aparecerVertical = (div) =>{
  div.style.transform = "translateY(0)";
}

//Ao carregar a pagina, elas serao chamadas
onMounted(() =>{
  const section = document.getElementsByTagName('section')
  setTimeout(() =>{
    aparecerHorizontal(section[0])
  }, 500)
})
</script>

<style scoped>
section{
  transition: all ease-in-out .5s;
  transform: translateY(-800px);
}
section .v-btn--icon.v-btn--density-default{
    display: none;
}

.container-texto{
    position: absolute;
    top: 1.5rem;
    right: 0;
    left: 25vw;
}

.container-botao{
    display: flex;
    justify-content: center;
    column-gap: 2.5rem;
    margin-top: 1rem;
}

h1{
    color: #FFF;
    text-align: center;
    font-size: clamp(1rem, 10vw, 36px);
}

.form-botao{
    color: #FFF;
    font-size: 18px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .5rem 1rem;
    transition: all ease-in-out .5s;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
    text-decoration: none;
}

.form-botao:hover{
    cursor: pointer;
    transform: translateY(-8px);
}
</style>