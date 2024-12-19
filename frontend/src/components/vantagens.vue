<template>
  <section class="how-our-system-works">
    <div class="container">
      <h2>Como nosso sistema funciona?</h2>
      <div class="steps">
        <div v-for="(step, index) in steps" :key="index" class="step">
          <div class="step-number">
            {{ index + 1 }}
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <ArrowRight v-if="index < steps.length - 1" class="arrow" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const steps = ref([
  {
    title: "Coleta de informações",
    description: "Nosso sistema conta com a coleta de informações sensíveis e verificações essenciais para previnirmos ataques e falhas.",
  },
  {
    title: "Eficiência",
    description: "Nós focamos em processarmos as informações fornecidas com eficiência, para assim tornar nosso site amigável ao usuário.",
  },
  {
    title: "Caronas compartilhadas",
    description: "Nosso projeto, por meio de caronas compartilhadas, também fornecemos a possibilidade da expansão do networking de cada aluno.",
  },
  {
    title: "Histórico de corridas",
    description: "Para segurança de ambos os lados, nós armazenamos os dados de todos os usuários de cada corrida, assim como informações adicionais.",
  },
])
</script>

<style scoped>
.how-our-system-works {
  padding: 2rem 3rem;
  background-color: rgb(30, 41, 77);
  color: #FFFFFF;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

h2 {
  font-size: clamp(1rem, 10vw, 36px);
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.step-number {
  width: 4rem;
  height: 4rem;
  background-color: rgb(49, 88, 196);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
}

.arrow {
  display: none;
  color: rgb(49, 88, 196);
  width: 1.5rem;
  height: 1.5rem;
}

@media (min-width: 768px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
  }

  .arrow {
    display: block;
    position: absolute;
    right: -1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .step:last-child .arrow {
    display: none;
  }
}
</style>