<template>
<section>
    <div class="container-footer">
        <div class="container-img">
            <img src="../assets/img/logo-fatecar.png" alt="svg logo fatecar" class="img-footer" style="width: 120px; height: 120px;">
        </div>

        <div class="container-paginas">
            <RouterLink to="/passageiroView" class="link-paginas">Passageiro</RouterLink>
            <RouterLink to="/motoristaView" class="link-paginas">Motorista</RouterLink>
            <RouterLink to="/" class="link-paginas">Meu Perfil</RouterLink>
            <RouterLink to="/documentacaoView" class="link-paginas">Documentação</RouterLink>
        </div>

        <div class="container-icones">
            <a href="#" class="link-icones"><img src="../assets/img/instagram.svg" alt="icone instagram"></a>
            <a href="#" class="link-icones"><img src="../assets/img/youtube.svg" alt="icone youtube"></a>
            <a href="#" class="link-icones"><img src="../assets/img/github.svg" alt="icone github"></a>
        </div>
    </div>

    <div class="container-direitos">
        <h1 class="titulo-direitos">@ 2024 Fatecar - Todos os direitos reservados</h1>
    </div>
</section>
</template>

<style scoped>
*{
    color: var(--cor-texto);
}

section{
    background-color: var(--cor-fundo-claro);
}

.container-footer{
    padding: 2rem 3rem;
}

.container-img, .container-paginas, .container-icones{
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-paginas, .container-icones{
    column-gap: 1.5rem;
}

.container-icones{
    margin-top: 2rem;
}

.link-paginas{
    text-decoration: none;
    font-size: var(--tamanho-texto);
    position: relative;
}

.link-paginas::before{
    content: '';
    position: absolute;
    display: block;
    width: 0;
    top: 25px;
    height: 3px;
    background-color: #F9F9F9;
    transition: width 350ms;
}

.link-paginas:hover::before{
    width: 100%;
}

.container-direitos{
    border-top: 2px solid #FFF;
    padding-bottom: 1rem;
}

.titulo-direitos{
    text-align: center;
    font-size: var(--tamanho-texto);
    color: #F1F6FD;
    margin-top: 2rem;
}

@media screen and (max-width: 550px){
    .link-paginas, .titulo-direitos{
        font-size: 3vw;
    }

    .link-icones img{
        width: 80%;
        height: auto;
    }

    .container-icones a{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

@media screen and (max-width: 430px){
    .container-paginas, .container-icones{
        column-gap: .5rem;
    }
}

@media screen and (max-width: 320px){
    .container-paginas{
        flex-direction: column;
        row-gap: 1rem;
    }
    .link-paginas{
        font-size: 6vw;
    }
}
</style>