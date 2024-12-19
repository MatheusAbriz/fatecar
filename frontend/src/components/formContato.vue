<template>
<section>
    <h1 class="titulo-contato">Possui alguma crítica? Deixe-nos saber!</h1>
    <form action="" ref="form" class="form-contato" @submit.prevent="sendEmail" id="contact-form">
        <div class="container-input">
            <input type="text" name="nome" id="nome" required v-model="forms.nome">
            <label for="nome">Nome</label>
        </div>

        <div class="container-input">
            <input type="tel" name="telefone" id="telefone" required v-mask="'(##) #####-####'" v-model="forms.telefone">
            <label for="telefone">Telefone</label>
        </div>

        <div class="container-input">
            <input type="text" name="email" id="email" required v-model="forms.email">
            <label for="email">Email</label>
        </div>

        <div class="container-input">
            <input type="assunto" name="assunto" id="assunto" required v-model="forms.assunto">
            <label for="assunto">Assunto</label>
        </div>

        <div class="container-input input-mensagem">
            <textarea name="mensagem" id="mensagem" cols="30" rows="10" required v-model="forms.mensagem"></textarea>
            <label for="mensagem">Mensagem</label>
        </div>

        <input type="submit" value="Enviar" class="form-botao" @click="enviarEmail()">
    </form>
</section>
</template>

<script setup>
import { TheMask } from 'vue-the-mask'
import emailjs from '@emailjs/browser';
import { reactive, ref } from 'vue'

//REF para o formulario como um todo, reactive para os campos do formulario
const form = ref(null)
const forms = reactive({
    nome: '',
    telefone: '',
    email: '',
    assunto: '',
    mensagem: ''
})

//Função para enviar o email com a API já importada anteriormente
const enviarEmail = () =>{
    emailjs.sendForm('service_0ej57rk', 'template_goeflw5', form.value, {
        publicKey: 'Jx7ydsb8TqbwiP2LX'
    })
    .then(() =>{
        alert("Email enviado com sucesso!")
    }, (error) =>{
        console.log(`Erro! ${ error }`)
    })

    //Zerando os valores dos campos
    forms.nome = ''
    forms.telefone = ''
    forms.email = ''
    forms.assunto = ''
    forms.mensagem = ''
}

</script>

<style scoped>
*{
    color: var(--cor-texto);
}
section{
    padding: 2rem 3rem;
    background-color: var(--cor-fundo-escuro);
}

.titulo-contato{
    font-size: clamp(1rem, 10vw, 36px);
    text-align: center;
}

.form-contato{
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    flex-wrap: wrap;
    margin: 0 auto;
    column-gap: 2rem;
    row-gap: 2rem;
    border-radius: 15px;
    margin-top: 2rem;
    padding: 2rem 0;
    border: 2px solid #9EC6F2;
    -webkit-box-shadow: 0 0 5px #9EC6F2;
    box-shadow: 0 0 5px #9EC6F2;
    background-color: #FFFFFF;
}

.container-input{
    position: relative;
}

.container-input input, .container-input textarea{
    width: 30vw;
    max-width: 300px;
    border-radius: 10px;
    background-color: #E9E9E9;
    height: 40px;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
    color: #0B1215;
    padding: 0 .8rem;
}

label{
    position: absolute;
    cursor: text;
    z-index: 2;
    top: 13px;
    left: 10px;
    padding: 0 10px;
    transition: all ease-in-out .3s;
    background: #E9E9E9;
    color: #0B1215;
}

.container-input label:hover{
    cursor: pointer;
}

input:focus + label, input:valid + label, textarea:focus + label, textarea:valid + label{
    top: -15px;
}

input:focus + label, textarea:focus + label{
    color: #0B1215;
}

.input-mensagem textarea{
    height: unset;
    max-width: 632px;
    width: 60vw;
    resize: none;
    padding: 1rem .8rem;
}

.form-botao{
    color: #FFF;
    font-size: 18px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .7rem 7rem;
    transition: all ease-in-out .5s;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
}

.form-botao:hover{
    cursor: pointer;
    transform: translateY(-10px);
}

/*Responsividade*/
@media screen and (max-width: 550px){
    .form-contato{
        flex-direction: column;
        max-width: 80%;
    }

    .container-input input, .container-input select, .input-mensagem textarea{
        width: 50vw;
    }

    label{
        font-size: clamp(1vw, 12px, 18px);
    }

    .form-botao{
        padding: 1.4vw 17vw;
    }
}

@media screen and (max-width: 400px){
    section{
        padding: 2rem 1rem;
    }

    .container-input input, .container-input select, .input-mensagem textarea{
        width: 80vw;
    }
    
    .form-contato{
        max-width: 100%;
    }
}

@media screen and (max-width: 360px){
    .titulo-contato{
        font-size: 8vw;
    }
}

</style>