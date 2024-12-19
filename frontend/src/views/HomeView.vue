<template>
<!--HEADER-->
<Header/>

<!--BANNER-->
<Banner/>

<!--CARDS-->
<Cards/>

<!--FATECAR-->
<Fatecar/>

<!--Equipe cards-->
<EquipeCard/>

<!--FOOTER-->
<Footer/>
</template>

<script setup>
import Header from '../components/header.vue';
import Footer from '../components/footer.vue';
import Banner from '../components/banner.vue';
import Cards from '../components/cards.vue';
import Fatecar from '../components/fatecar.vue';
import EquipeCard from '../components/equipeCard.vue';
import { onMounted } from 'vue'

</script>

<style>
body{
    background-color: var(--cor-fundo-escuro); 
}

</style>
