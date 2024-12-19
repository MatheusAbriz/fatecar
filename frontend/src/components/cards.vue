<template>
<h1>O que nós fazemos?</h1>
<section>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="src/assets/img/banner2.jpg"
      cover
    ></v-img>

    <v-card-title>
      Viagem Personalizada
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="#FFF"
        text="Saiba Mais"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="showViagem ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showViagem = !showViagem"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showViagem">
        <v-divider></v-divider>

        <v-card-text>
            <p>No nosso sistema, o motorista terá total liberdade para escolher as corridas que deseja, assim como escolher quantos passageiros ele queira levar de uma só vez, ou até caso não queira levar nenhum em algum dia específico. Nosso projeto é pensado totalmente nos nossos usuários: Tanto motorista como passageiro: Pagamentos rentáveis para um e preço acessível para o outro.</p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="src/assets/img/banner4.jpg"
      cover
    ></v-img>

    <v-card-title>
      Transparência
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="#FFF"
        text="Saiba Mais"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="showTransparencia ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showTransparencia = !showTransparencia"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showTransparencia">
        <v-divider></v-divider>

        <v-card-text>
            <p>Nosso projeto foca em total transparência com os motoristas e passageiros, sempre exibindo as formas que monetizamos o sistema, trazendo assim as fórmulas de precificação e taxas, a fim de criarmos uma relação de confiança e confiabilidade com nossos clientes, para que assim conquistemos cada vez mais respeito, visibilidade e eficiência na comunidade acadêmica.</p>

        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="src/assets/img/banner3.jpg"
      cover
    ></v-img>

    <v-card-title>
      Portabilidade
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="#FFF"
        text="Saiba Mais"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="showPortabildade ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showPortabildade = !showPortabildade"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showPortabildade">
        <v-divider></v-divider>

        <v-card-text>
            <p>Desenvolvido para ser acessível em diferentes arquiteturas e dispositivos, nosso site conta com portabilidade para todos os aparelhos, desde celulares até notebooks e computadores, pois entendemos que nosso público-alvo possui uma diversificada base de dispositivos, necessitando assim de um desenvolvimento pensado em todos, para que nosso produto se torne escalável.</p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</section>
</template>

<script setup> 
import { ref, onMounted } from 'vue'
const showViagem = ref(false)
const showTransparencia = ref(false)
const showPortabildade = ref(false)


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
  const titulo = document.getElementsByTagName('h1');
  const section = document.getElementsByTagName('section')
  setTimeout(() =>{
    aparecerHorizontal(section[1])
    aparecerVertical(titulo[1])
  }, 500)
})
</script>

<style scoped>
section{
    padding: 2rem 3rem;
    display: flex; 
    justify-content: center;
    gap: 2rem;
    overflow: hidden;
    transition: all ease-in-out .5s;
    transform: translateX(-2000px);
}

.v-card{
    width: 100%;
    height: fit-content;
    border: 1px solid #9EC6F2;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 12px #3158C4;
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
    transition: all ease-in-out .5s;
    border-radius: 10px;
}

.v-card:hover{
  transform: translateY(-10px);
}

.v-card-title{
  border-top: 1px solid #000;
}

.v-card-text, .v-card-actions{
    padding: 0 1rem .8rem 1rem;
}

.v-card-text{
    padding-top: .5rem;
}

.v-btn{
    transition: all ease-in-out .5s;
}

.v-btn:first-child{
    color: #FFF;
    font-size: 14px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .5rem 1rem;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
}

.v-btn:hover{
    cursor: pointer;
    transform: translateY(-5px);
}

h1{
    color: #FFF;
    font-size: clamp(1rem, 10vw, 36px);
    text-align: center;
    margin-top: 2rem;
    transition: all ease-in-out .5s;
    transform: translateY(-800px);
}

p{
    margin: 0;
}

</style>