<template>
    <v-lazy
    :options="{'threshold': 0.5}"
    transition="slide-x-transition">
    <section>
        <h1 class="titulo-card">Conheça nossa equipe</h1>  
        
        <swiper
        :slides-per-view="1"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :loop="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        >
    <swiper-slide>
        <img src="../assets/img/matheusA.jfif" alt="imagem membro grupo fatecar" class="img-membros">
        <h1 class="titulo">Matheus Abriz</h1>
        <h3 class="subtitulo">Full-Stack Developer</h3>
        <p class="texto">Atuou tanto no desenvolvimento das interfaces visuais como na elaboração, implementação e integração do Back-End. Também foi responsável por gerenciar o consumo das APIs e bibliotecas utilizadas em todo o projeto.</p>

        <div class="container-links">
            <a href="https://github.com/MatheusAbriz" target="_blank"><img src="../assets/img/github-preto.svg" alt="link github"></a>
            <a href="https://www.linkedin.com/in/matheus-abriz-rios-ayaviri-b4611a260/" target="_blank"><img src="../assets/img/linkedin.svg" alt="link linkedin"></a>
            <a href="mailto:matheus.abriz@gmail.com" target="_blank"><img src="../assets/img/email-preto.svg" alt="link email"></a>
        </div>
    </swiper-slide>

    <swiper-slide>
        <img src="../assets/img/mayandersonS.jfif" alt="imagem membro grupo fatecar" class="img-membros">
        <h1 class="titulo">Mayanderson dos Santos</h1>
        <h3 class="subtitulo">Documentador</h3>
        <p class="texto">Atuou na documentação, sendo responsável pela padronização de nomenclaturas dos arquivos, criação de diagramas, regras de negócio, além de ajudar no design do site de maneira pontual conforme fosse necessitado.</p>

        <div class="container-links">
            <a href="#"><img src="../assets/img/github-preto.svg" alt="link github"></a>
            <a href="#"><img src="../assets/img/linkedin.svg" alt="link linkedin"></a>
            <a href="#"><img src="../assets/img/email-preto.svg" alt="link email"></a>
        </div>
    </swiper-slide>

    <swiper-slide>
        <img src="../assets/img/matheusSilva.jpg" alt="imagem membro grupo fatecar" class="img-membros">
        <h1 class="titulo">Matheus Silva</h1>
        <h3 class="subtitulo">Front-End Developer</h3>
        <p class="texto">Atuou no desenvolvimento front-end do site realizando a criação e estilização de páginas web. Ajudou também a produzir os padrões de nomenclatura utilizados no sistema, além de ser responsável pela criação da logo.</p>

        <div class="container-links">
            <a href="#"><img src="../assets/img/github-preto.svg" alt="link github"></a>
            <a href="#"><img src="../assets/img/linkedin.svg" alt="link linkedin"></a>
            <a href="#"><img src="../assets/img/email-preto.svg" alt="link email"></a>
        </div>
    </swiper-slide>

        <swiper-slide>
        <img src="../assets/img/henriqueM.jfif" alt="imagem membro grupo fatecar" class="img-membros">
        <h1 class="titulo">Henrique Moroni</h1>
        <h3 class="subtitulo">Documentador</h3>
        <p class="texto">Atuou na documentação, sendo responsável pela padronização de nomenclaturas dos arquivos, criação de diagramas, regras de negócio, além de ajudar em outras etapas do site, conforme fosse necessário.</p>

        <div class="container-links">
            <a href="#"><img src="../assets/img/github-preto.svg" alt="link github"></a>
            <a href="#"><img src="../assets/img/linkedin.svg" alt="link linkedin"></a>
            <a href="#"><img src="../assets/img/email-preto.svg" alt="link email"></a>
        </div>
    </swiper-slide>

    <swiper-slide>
        <img src="../assets/img/henriqueM.jfif" alt="imagem membro grupo fatecar" class="img-membros">
        <h1 class="titulo">Gabriel Dos Santos</h1>
        <h3 class="subtitulo">Ajudante Geral</h3>
        <p class="texto">Responsável por realizar diversas tarefas de apoio no desenvolvimento do site, como na documentação, coleta de imagens, produção textual, levantamento de requisitos, estudos de tecnologias parecidas, etc.</p>

        <div class="container-links">
            <a href="#"><img src="../assets/img/github-preto.svg" alt="link github"></a>
            <a href="#"><img src="../assets/img/linkedin.svg" alt="link linkedin"></a>
            <a href="#"><img src="../assets/img/email-preto.svg" alt="link email"></a>
        </div>
    </swiper-slide>
  </swiper>
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>

    </section>
</v-lazy>
</template>

<script setup>
  // import Swiper core and required modules
import {Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

  // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

 // Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const onSwiper = (swiper) =>{
    //console.log(swiper)
}

const onSlideChange = () =>{
    //console.log('Slide change');
}


</script>

<style scoped>
section{
    padding: 0 3rem 2rem 3rem;
    position: relative;
}

.titulo-card{
    font-size: clamp(1rem, 10vw, 36px);
    color: #FFF;
    text-align: center;
    margin-bottom: 1rem;
}

.swiper{
    width: 100%;
    max-width: 400px;
}

.swiper-slide{
    display: flex;
    flex-direction: column;
    align-items: inherit;
    width: 100% !important;
    max-width: 400px;
    height: 555px;
    background-color: #FFF;
    border-radius: 10px;
    border-radius: 30px;
}

.swiper-button-prev, .swiper-button-next {
    display: block !important; 
    top: 50%;
}

.swiper-button-prev{
    left: 30%
}

.swiper-button-next{
    right: 30%;
}

.img-membros{
    width: 100%;
    max-width: 400px;
    height: 300px;
    border-radius: 30px 30px 0 0;
}

.titulo{
    font-size: clamp(1rem, 10vw, 30px);
}

.titulo, .subtitulo{
    text-align: center;
}

.subtitulo{
    color: #A7A4A4;
    font-size: 12px;
}

.texto{
    padding: 0 1rem 1rem 1.5rem;
}

.container-links{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 1rem;
}

.container-links a{
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out .5s;
    padding: .5rem;
    border-radius: 50%;

}


.container-links a:hover{
    transform: translateY(-5px);
    background-color: #cdd3d5;
}

</style>