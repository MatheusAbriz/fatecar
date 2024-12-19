<template>
  <section class="why-us">
    <v-lazy :options="{'threshold': 0.5}" transition="slide-x-reverse-transition">
    <div class="container">
      <h2>Porque a Fatecar?</h2>
      <div class="content">
        <div class="image-container">
          <img src="../assets/img/img-corrida.svg" alt="Why choose our company" />
        </div>
        <div class="text-content">
          <h3>Vantagens do nosso sistema</h3>
          <ul>      
            <li>Expansão de Networking</li>
            <li>Facilidade e segurança</li>
            <li>Facilidade de uso</li>
            <li>Custo-benefício</li>
            <li>Comodidade</li>
          </ul>
      <RouterLink to="/corridaView" class="form-botao">Solicite uma corrida</RouterLink>
        </div>
      </div>
    </div>
    </v-lazy>
  </section>
</template>

<style scoped>
.why-us {
  background-color: var(--cor-fundo-claro);
  color: #FFFFFF;
  padding: 2rem 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: clamp(1rem, 10vw, 36px);
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.image-container {
  width: 100%;
  max-width: 400px;
}

.image-container img {
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: 8px;
}

.text-content {
  max-width: 600px;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #FFF;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
}

li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #FFF;
}

.form-botao{
    color: #FFF;
    font-size: 18px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px var(--cor-fundo-claro);
    box-shadow: 0 0 8px var(--cor-fundo-claro);
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


@media (min-width: 768px) {
  .content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .image-container {
    flex: 1;
  }

  .text-content {
    flex: 1;
  }
}
</style>