<template>
<!--Header-->
<Header/>

<!--Formulario-->
<PassageiroForm  barraProgresso="true" motorista="true"/>


<!--Footer-->
<Footer/>
</template>

<script setup>
import Header from '../components/header.vue'
import PassageiroForm from '../components/formPassageiro.vue'
import Footer from '../components/footer.vue'
</script>