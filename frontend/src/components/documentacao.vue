<template>
<div class = container>
    <div class = "tittles">
        <h1>Objetivo do Projeto</h1>
        <div class="text-objetivo">
                O projeto visa desenvolver e implementar uma plataforma de compartilhamento de caronas específica para a comunidade da FATEC, com o objetivo de melhorar a mobilidade acadêmica.
                A proposta é incentivar o compartilhamento de caronas para reduzir a quantidade de veículos nas estradas, promover a conexão entre as pessoas, criando transporte, 
                tornando o acesso à educação mais acessível e promovendo uma cultura de sustentabilidade.
                Para atingir esses objetivos, o projeto foca inicialmente no desenvolvimento de uma interface de usuário intuitiva e atraente para engajar mais pessoas na plataforma. 
                Em seguida, será implementada a funcionalidade de registros de usuários, permitindo que estudantes, professores e funcionários possam se cadastrar facilmente. A integração de sistemas 
                de geolocalização permitirá que os usuários solicitem ou ofereçam caronas com base em sua localização atual, enquanto um sistema de avaliação e comentários garantirá a segurança e a confiabilidade 
                das caronas.
                O projeto também incluirá a realização de testes de usabilidade para assegurar uma experiência satisfatória para os usuários e documentar resultados para futuras melhorias. Além disso, a integração 
                com APIs de terceiros permitirá recursos de compartilhamento nas redes sociais, ampliando a divulgação e adoção da plataforma. Por fim, será preparado material de marketing, incluindo imagens e textos 
                descritivos, para o lançamento oficial do aplicativo, atraindo e engajando os membros da comunidade FATEC. A organização dos objetivos segue em uma sequência lógica, começando pelo desenvolvimento da 
                interface de usuário e registro de usuários, passando pela implementação das funcionalidades essenciais do aplicativo, realização de testes de usabilidade, integração com APIs de terceiros, e culminando 
                na preparação para o lançamento oficial. Essa abordagem sequencial garante que cada etapa seja concluída antes de prosseguir para a próxima, proporcionando um fluxo de trabalho eficiente e ordenado. 
                Este projeto, portanto, não só visa melhorar a mobilidade da comunidade acadêmica da FATEC, mas também promover uma cultura de sustentabilidade e interação social, tornando o acesso à educação mais acessível e eficiente.
        </div>
    </div>
    <div class = 'pdf-local'>
        <embed src="/src/assets/docs/projetoIntegradorFinal.pdf" type="application/pdf" width="100%" height="600px">
    </div>
    <div class = "tittles">
        <h1>Agradecimentos</h1>
        <div class="text-agradecimento">
            Gostaríamos de expressar nossa profunda gratidão à FATEC Diadema e a todos os professores que nos apoiaram ao longo do desenvolvimento do Projeto FATECAR. Sem a colaboração, orientação e suporte incansáveis de 
            cada um de vocês, este projeto não teria sido possível.
            A FATEC Diadema tem sido um pilar fundamental para a realização de nossas ideias e objetivos. A estrutura fornecida, junto com o ambiente acadêmico estimulante, permiti-nos explorar, inovar e alcançar novas metas. 
            Agradecemos a oportunidade de fazer parte desta instituição que promove a excelência e o desenvolvimento contínuo.
            Aos professores envolvidos no Projeto FATECAR, nossa admiração e reconhecimento. Suas orientações foram cruciais para superar os desafios que encontramos ao longo do caminho. A paciência, o conhecimento compartilhado 
            e a dedicação de você inspiram-nos a dar o nosso melhor e acreditar na importância e no impacto de nosso trabalho.
            O sucesso do Projeto FATECAR é um reflexo direto do apoio inestimável que recebemos da FATEC DIADEMA e de seus brilhantes educadores. Este agradecimento é apenas uma pequena demonstração da nossa imensa gratidão 
            por tudo que fizeram por nós. Muito obrigado!

        </div>
    </div>
</div>

</template>

<style scoped>

.tittles {
    text-align: center;
    font-size: 20px;
    margin: 1em auto;
}

h1{
    font-size: clamp(1rem, 10vw, 36px);
    color: #FFF;
}

.text-objetivo {
    background-color: var(--cor-fundo-escuro);
    color: rgb(255, 255, 255);
    text-align: justify;
    font-size: 15px;
    overflow: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em auto;
    padding: 0 30px 0 30px; 
    width: 70%; 
}

.logo_imagem{
    float: center;
    align-items: center;
    margin: 2em auto;
}

.text-agradecimento {
    background-color: var(--cor-fundo-escuro);
    color: #FFF;
    overflow: auto;
    text-align: justify;
    font-size: 15px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em auto;
    padding: 0 30px 0 30px; 
    width: 80%; 
    box-sizing: border-box; 
}

.pdf-local {
  width: 100%;
  max-width: 950px;
  margin: 2em auto;
}


</style>