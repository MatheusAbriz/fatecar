<template>
<div class="container">
<!--Barra de progresso-->
<div class="stepper-wrapper">
  <div class="stepper-item">
    <div class="step-counter"><img src="../assets/img/ra-formulario.svg" alt="icone formulario cadastro" class='img-form'></div>
    <div class="step-name"><p class="titulo-barra">Verificação RA</p></div>
  </div>
  <div class="stepper-item">
    <div class="step-counter"><img src="../assets/img/img-cadastro.svg" alt="icone RA fatec" class="img-form"></div>
    <div class="step-name"><p class="titulo-barra">Cadastro Formulário</p></div>
  </div>
    <div class="stepper-item" v-if="props.barraProgresso">
    <div class="step-counter"><img src="../assets/img/img-cadastro.svg" alt="icone formulario cadastro" class='img-form'></div>
    <div class="step-name"><p class="titulo-barra">Cadastro Veículo</p></div>
  </div>
  <div class="stepper-item">
    <div class="step-counter"><img src="../assets/img/img-avancar.svg" alt="icone avançar" class="img-form"></div>
    <div class="step-name"><p class="titulo-barra">Tudo certo!</p></div>
  </div>
</div>
</div>


<!--Formulario Usuário-->
<section id='section-formUsu'>
    <div class="container-titulo">
        <h1 class="titulo-formulario" @click="exibirCadastro()">Cadastro</h1>
        <h1 class="titulo-formulario" @click="exibirLogin()">Login</h1>
    </div>
    <!--Form RA-->
    <div class="container-form">
    <form method="" @submit.prevent="sendForm" class="formulario-ra">
        <div class="container-input">
            <label for="matricula">Matrícula</label>
            <input type="text" name="matricula" id="anoIngresso" placeholder="Digite a sua matrícula..." v-model="matricula.ra" v-mask="'#############'" minlength="13">
        </div>
        <div class="container-input">
            <label for="curso">Curso</label>
            <select name="curso" required v-model="matricula.curso">
                    <option disabled selected hidden>Selecione</option>
                    <option :value="'cos'">Cosméticos</option>
                    <option :value="'dsm'">DSM</option>
                    <option :value="'gpi'">GPI</option>
                </select>
        </div>
        <div class="container-input">
            <label for="anoIngresso">Ano de ingresso</label>
            <input type="text" name="anoIngresso" id="anoIngresso" placeholder="Digite os dois últimos dígitos..." v-model="matricula.anoIngresso" v-mask="'##'" minlength="2">
        </div>
        <div class="container-input">
            <label for="semIngresso">Semestre de ingresso</label>
            <select name="semIngresso" required v-model="matricula.semestreIngresso">
                    <option disabled selected hidden>Selecione</option>
                    <option :value="'1'">1 Semestre</option>
                    <option :value="'2'">2 Semestre</option>
                </select>
        </div>
        
        <input type="submit" class="form-botao" value="Enviar" @click="verificaRA"  v-if="!props.motorista">
        <input type="submit" class="form-botao" value="Enviar" @click="verificaRA"  v-if="props.motorista">
    </form>
    </div>

    <!--Form cadastro-->
    <form class="formulario-cadastro" method="POST" @submit.prevent="sendEmail">
        <div class="container-input">
            <label for="nomeP">Nome</label>
            <input type="text" name="nomeP" id="nomeP" placeholder="Digite seu nome..." required v-model="usuario.nome">
        </div>

        <div class="container-input">
            <label for="email">Email</label>
            <input type="email" name="emailP" id="emailP" placeholder="Digite seu email..." required v-model="usuario.email">
        </div>

        <div class="container-input">
            <label for="cpfP">CPF</label>
            <input type="text" name="cpfP" id="cpfP" placeholder="Digite seu cpf..." v-mask="'###.###.###-##'" v-model="cpf.texto" required>
        </div>

        <div class="container-input">   
            <label for="telefoneP">Telefone</label>
            <input type="text" name="telefoneP" id="telefoneP" placeholder="Digite seu telefone..." v-mask="'(##) #####-####'" required v-model="usuario.telefone">
        </div>

        <div class="container-input">
            <label for="senhaP">Senha</label>
            <input type="password" name="senhaP" id="senhaP" placeholder="Digite sua senha..." class="input-senha" required v-model="usuario.senha">
            <span class="span-senha" @click="senha(1)"></span>
        </div>

        <div class="container-input">
            <label for="generoP">Gênero</label>
            <select name="generoP" required v-model="usuario.genero">
                <option disabled selected hidden>Selecione</option>
                <option :value="'M'">Masculino</option>
                <option :value="'F'" selected>Feminino</option>
            </select>
        </div>

        <div class="container-logradouro">
            <div class="container-input">
                <label for="enderecoP">Endereço</label>
                <input type="text" name="enderecoP" id="enderecoP" placeholder="Digite seu endereco..." required v-model="usuario.endereco">
            </div>

            <div class="container-input">
                <label for="fotoP">Anexe sua foto</label>
                <input type="file" name="fotoP" id="input-file" class="input-foto" accept="image/*">
            </div>

            <div class="container-input">
                <label for="estadoP">Estado</label>
                <select name="estado" required v-model="usuario.estado">
                    <option disabled selected hidden>Selecione</option>
                    <option :value="'SP'">São Paulo</option>
                </select>
            </div>
            <div class="container-input">
                <label for="cidadeP">Cidade</label>
                <input type="text" name="cidadeP" id="cidadeP" placeholder="Digite sua cidade..." required v-model="usuario.cidade">
            </div>
            <input type="submit" value="Enviar" class="form-botao" @click="criarUsuario('passageiro')" v-if="!props.motorista">
            <input type="submit" value="Enviar" class="form-botao" @click="criarUsuario('motorista')" v-if="props.motorista">
        </div>
    </form>

    <!-- form login -->
    <div class="container-login">
        <form class="formulario-login" method="POST" @submit.prevent="sendEmail">
            <div class="container-input">
                <label for="email">Email</label>
                <input type="email" name="emailP" id="emailP" placeholder="Digite seu email..." required v-model="usuario.email">
            </div>

            <div class="container-input">
                <label for="senhaP">Senha</label>
                <input type="password" name="senhaP" id="senhaP" placeholder="Digite sua senha..." class="input-senha" required v-model="usuario.senha">
                <span class="span-senha" @click="senha(0)"></span>
            </div>
            <input type="submit" value="Enviar" class="form-botao" @click="logar">
        </form>
    </div>
    
    <!--Form veículo-->
    <div class="container-veiculo" v-if="props.motorista">
    <form class="formulario-cadastro" method="POST" @submit.prevent="sendEmail">
        <div class="container-input">
                <label for="crlv">Anexe sua CRLV</label>
                <input type="file" name="crlv" id="input-crlv" class="input-foto input-foto-veiculo" accept="application/pdf">
        </div>

        <div class="container-input">
            <label for="cnh">Anexe sua CNH</label>
            <input type="file" name="cnh" id="input-cnh" class="input-foto input-foto-veiculo" accept="application/pdf">
        </div>

        <div class="container-input">
            <label for="nomeCarro">Nome do carro</label>
            <input type="text" name="nomeCarro" id="nomeCarro" placeholder="Digite o nome do carro..." required v-model="carro.nome"> 
        </div>

        <div class="container-input">   
            <label for="modeloCarro">Modelo do carro</label>
            <input type="text" name="modeloCarro" id="modeloCarro" placeholder="Digite o modelo do carro..." required v-model="carro.modelo">
        </div>

        <div class="container-input">
            <label for="anoCarro">Ano do carro</label>
            <input type="text" name="anoCarro" id="anoCarro" placeholder="Digite o ano do carro..." required v-model="carro.ano">
        </div>

        <div class="container-input">
            <div class="container-input">
                <label for="corCarro">Cor do carro</label>
                <input type="text" name="corCarro" id="corCarro" placeholder="Digite a cor do carro..." required v-model="carro.cor">
            </div>
        </div>
            <input type="submit" value="Enviar" class="form-botao" @click="criarCarro()">
    </form>

    </div>
</section>

<section></section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { TheMask } from 'vue-the-mask';
import axios  from 'axios'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router'

const router = useRouter();

const cpf = reactive({
    texto: ''
});

const usuario = reactive({
    id: '',
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    genero: 'Selecione',
    endereco: '',
    estado: 'Selecione',
    cidade: '',
    foto: ''
})

const carro = reactive({
    crlv: '',
    cnh: '',
    nome: '',
    modelo: '',
    ano: '',
    cor: ''
})

//Armazenando o que o usuário digitar de CPF e senha nos inputs
const matricula = reactive({
    curso: 'Selecione',
    anoIngresso: '',
    semestreIngresso: 'Selecione',
    ra: ''
})

//Declarando um props para ser utilizado de forma diferente entre as páginas
const props = defineProps({
    tipoProps: {
        type: Boolean
    },
    barraProgresso:{
        default: false
    },
    motorista:{
        default: false
    }
})

//Verificando o RA
const verificaRA = () =>{
    //Verificando se os campos não estão vazios
    if(matricula.curso == 'Selecione' || matricula.anoIngresso == '' || matricula.semestreIngresso == 'Selecione' || matricula.ra == ''){
        alert('Insira as informações corretamente!');
    }else{
        //4 etapas: 3 digitos fatec + 3 digitos curso + ano de ingresso + semestre de ingresso
        const ra = matricula.ra;
        //Array que será construído um RA para verificacao
        const verificaRA = [];
        //Verificando se os 3 dígitos(217) combinam
        if(ra[0] != 2 && ra[1] != 1 && ra[2] != 7){
            alert("RA incorreto! Insira novamente");
            matricula.ra = '';
        }else{
            //Verificando os dígitos da matrícula
            if(matricula.curso == 'cos'){//cos - 101, GPI - 077, DSM - 139
                verificaRA.push(matricula.ra[0], matricula.ra[1], matricula.ra[2], '1', '0', '1');
            }else if(matricula.curso == 'gpi'){
                verificaRA.push(matricula.ra[0], matricula.ra[1], matricula.ra[2], '0', '7', '7');
                
            }else if(matricula.curso == 'dsm'){
                verificaRA.push(matricula.ra[0], matricula.ra[1], matricula.ra[2], '1', '3', '9');
            }

            //Verifico agora se o ano de ingresso bate
            if(matricula.anoIngresso > 24){
                alert("RA incorreto! Insira novamente");
            }else{
                //Aqui não é verificado nada por enquanto, somente guardo o ano que o usuário colocar(verificacao posteriormente)
                verificaRA.push(matricula.anoIngresso[0], matricula.anoIngresso[1]);
            }

            //Verificando e adicionando o semestre de ingresso
            verificaRA.push(matricula.semestreIngresso);
            verificaRA.push(matricula.ra[9], matricula.ra[10], matricula.ra[11], matricula.ra[12]);
            var raFinal = '';

            //Juntando todo o array em uma string
            for(let i = 0; i < verificaRA.length; i++){
                raFinal += verificaRA[i];
            }

            //Verificacao final para saber se todos os dados batem. Transferir o createUsers para cá
            if(raFinal == matricula.ra){
                alert("Tudo certo!")
                //Adicionando manualmente a animação de formulários
                ocultarRA(0);
            }else{
                alert("Tudo errado!")
                matricula.ra = '';
                matricula.anoIngresso = ''
            }
        }
    }
}

//Declarando a variavel usuarios
const users = ref([])

//Requisicao para a API NESTJS - SELECT Passageiros
const fetchUsers = async () =>{
    try{
        const res = await axios.get('http://localhost:3000/passageiro');
        users.value = res.data;
    }catch (error){
        console.log('Erro ao buscar usuário mano', error);
    }
}

//Requisicao para NEST - CREATE Usuario Passageiro
const criarUsuario = async (tipo) =>{
    //Se tipo for igual passageiro, o tipo do usuário é passageiro
    if(tipo == 'passageiro'){
         verificacaoCpf()
        //Caso os campos estejam vazios, será impossível continuar
        if(usuario.nome == '' || usuario.email == '' || cpf.texto == '' || usuario.telefone == '' || usuario.senha == '' || usuario.genero == 'Selecione' || usuario.endereco == '' || usuario.estado == 'Selecione' || usuario.cidade == ''){
            alert('Insira as informações corretamente!');

        //Verificacao == true cpf valido, false == invalido
        }else if(!verificacaoCpf()){
            alert('CPF Inválido! Tente novamente')
            cpf.texto = ''
        }else{
            //Try catch para tratamento de erro, após isso, é criado um localStorage para ser usado para verificar se o usuario está logado ou não
            try{
                const res = await axios.post('http://localhost:3000/passageiro',{
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: cpf.texto,
                    telefone: usuario.telefone,
                    senha: usuario.senha,
                    genero: usuario.genero,
                    endereco: usuario.endereco,
                    estado: usuario.estado,
                    cidade: usuario.cidade,
                    ra: matricula.ra
                });

                //Retornando o ID selecionado pelo email unico
                const id = await axios.get(`http://localhost:3000/passageiro/email/${usuario.email}`);
                usuario.id = id.data.id;
                localStorage.setItem('logadoPassageiro', JSON.stringify(usuario));

                //Armazenando a imagem que o usuário colocar na nuvem
                const file = document.getElementById('input-file').files;
                const { data, error } = await supabase.storage.from('fatecar').upload(`passageiro/${usuario.id}/${file[0].name}`, file[0]);
                usuario.foto = data.path;
                //Pegando a classe para colocar como verde, depois chamando o modal para verificar o RA
                const stepper = document.getElementsByClassName('stepper-item');
                stepper[0].classList.add('completed');
                alert("Cadastro realizado com sucesso! Te redirecionando para a página principal");
                router.push({ name: 'home' })

                //Se der erro, será imprimido uma mensagem
                }catch (error){
                    alert("Email, telefone e/ou CPF já cadastrados!");
                }

                //Criando a requisição para atualizar a tabela de dados
                const urlFoto = { foto: usuario.foto }
                const response = await axios.put(`http://localhost:3000/passageiro/update/${usuario.id}`, urlFoto)
                console.log('passageiro atualizado com sucesso!', response.data);            
                cpf.texto = '';
        }
    }else{ //Se o tipo for motorista, então...
        verificacaoCpf()
        //Caso os campos estejam vazios, será impossível continuar
        if(usuario.nome == '' || usuario.email == '' || cpf.texto == '' || usuario.telefone == '' || usuario.senha == '' || usuario.genero == 'Selecione' || usuario.endereco == '' || usuario.estado == 'Selecione' || usuario.cidade == ''){
            alert('Insira as informações corretamente!');
        //Verificacao == true cpf valido, false == invalido
        }else if(!verificacaoCpf()){
            alert('CPF Inválido! Tente novamente')
            cpf.texto = ''
        }else{ //Aqui começa o código
            //Try catch para tratamento de erro, após isso, é criado um localStorage para ser usado para verificar se o usuario está logado ou não
            try{
                const res = await axios.post('http://localhost:3000/motorista',{
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: cpf.texto,
                    telefone: usuario.telefone,
                    senha: usuario.senha,
                    genero: usuario.genero,
                    endereco: usuario.endereco,
                    estado: usuario.estado,
                    cidade: usuario.cidade,
                    ra: matricula.ra
                });

                //Retornando o ID selecionado pelo email unico
                const id = await axios.get(`http://localhost:3000/motorista/email/${usuario.email}`);
                usuario.id = id.data.id;
                localStorage.setItem('logadoMotorista', JSON.stringify(usuario));

                //Armazenando a imagem que o usuário colocar na nuvem
                const fotoMotorista = document.getElementById('input-file').files;
                const { data, error } = await supabase.storage.from('fatecar').upload(`motorista/${usuario.id}/${fotoMotorista[0].name}`, fotoMotorista[0]);
                usuario.foto = data.path;
                console.log(usuario.foto)
                exibirVeiculo(2);
                //Se der erro, será imprimido uma mensagem
                }catch (error){
                    alert('Email, telefone e/ou CPF já cadastrados!');
                }

                //Criando a requisição para atualizar a tabela de dados
                const urlFoto = { foto: usuario.foto }
                const response = await axios.put(`http://localhost:3000/motorista/update/${usuario.id}`, urlFoto)
                console.log('passageiro atualizado com sucesso!', response.data);            
                cpf.texto = '';
        }
    }
}

//Funcao para criar o carro no BD
const criarCarro = async () =>{
    const fileCrlv = document.getElementsByClassName('input-foto-veiculo')[0].files;
    const fileCNH = document.getElementsByClassName('input-foto-veiculo')[1].files;

    const logadoMotorista = JSON.parse(localStorage.getItem('logadoMotorista'));
    console.log(JSON.parse(logadoMotorista.id));
    var { data, error } = await supabase.storage.from('fatecar').upload(`motorista/${logadoMotorista.id}/${fileCrlv[0].name}`, fileCrlv[0]);
    carro.crlv = data.path;
    console.log(carro.crlv)
    var { data, error } = await supabase.storage.from('fatecar').upload(`motorista/${logadoMotorista.id}/${fileCNH[0].name}`, fileCNH[0]);
    carro.cnh = data.path;
    console.log(carro.cnh);

    //Inserindo na tabela carro, e ja insiro o ID do motorista tambem
    try{
        const res = await axios.post('http://localhost:3000/carro',{
            nome: carro.nome,
            fotoCrlv: carro.crlv,
            fotoCnh: carro.cnh,
            modelo: carro.modelo,
            ano: carro.ano,
            cor: carro.cor,
            motorista: JSON.parse(logadoMotorista.id)
        })
        console.log(res.data.id);
        //Agora, eu faço um update pelo ID, onde no campo 'carroId' na tabela motorista eu coloco o ID do carro
        const response = await axios.patch(`http://localhost:3000/motorista/motoristaCarro/${JSON.parse(logadoMotorista.id)}`,{
        carro: res.data.id
        })

    alert("Cadastrado com sucesso! Te redirecionando para a página principal")
    router.push({ name: 'home' })
    }catch(error){
        console.log("Erro!", error);
    }

}

//Funcao para logar o passageiro
const logar = async () =>{
    try{
        const response = await axios.get(`http://localhost:3000/passageiro/${usuario.email}/${usuario.senha}`);
        const res = await axios.get(`http://localhost:3000/motorista/${usuario.email}/${usuario.senha}`)
        //Caso os dados batam...
        if(usuario.email == response.data.email && usuario.senha == response.data.senha){
            localStorage.setItem('logadoPassageiro', JSON.stringify(response.data));
            alert("Seja bem vindo!");
            router.push({name: 'corridaView'})
            //Redirecionar para alguma página
        }else if(usuario.email == res.data.email && usuario.senha == res.data.senha){
            localStorage.setItem('logadoMotorista', JSON.stringify(res.data));
            alert("Seja bem vindo!")
            router.push({ name: 'corridaView' })
        }else{ //Se tiver algo errado...
            alert("Dados incorretos! Tente novamente")
        }
    }catch(error){
        console.log("Error!", error)
    }
}

//Agora, renderizando os usuarios cadastrados
onMounted(() =>{
    fetchUsers();
    //Vendo se o usuário já possui um login ativo
    if(localStorage.getItem('logadoPassageiro')){
        console.log('ja ta logado espertinho')
    }else{
        console.log('bem vindo omi')
    }
})

//Função para verificar se o CPF existe
const verificacaoCpf = () =>{
    //Criando o array para armazenar os valores
    const arrayCpf = [];

    //Array para armazenar o produto do calculo de CPF
    var produtosCpf = [];
    let j = 1;

    //Armazenando a soma dos dígitos do CPF
    let soma = 0;;
    
    //Armazenando o valor sem os pontos e traços no array
    arrayCpf[0] = cpf.texto.split('.').join('').split('-').join('');

    //Agora, armazenando em cada índice um valor
    arrayCpf.push(arrayCpf[0].split(''));
    
    //Criando uma variável clone para armezanar o CPF pós formatação
    const cpfFinal = ref(cpf.texto.split('.').join('').split('-').join(''));

    //Looping para calcular o produto de cada índice do array
    for(let i = 0; i < 9; i++){
        produtosCpf.push(arrayCpf[1][i] * j);
        soma += produtosCpf[i];
        j++;
    }

    //Armazenando o resto da divisao ao CPF
    produtosCpf.push(soma % 11);

    //Se der maior ou igual a 10, pela regra = 0
    if(soma % 11 >= 10){
        arrayCpf[1][9] = 0;
    }else{
        arrayCpf[1][9] = soma % 11;
    }
    
    //Zerando os valores para começar a conta do 11 dígito
    soma = 0;
    j = 0;
    produtosCpf = [];
    //Looping para calcular o ultimo digito do CPF
    for(let i = 0; i < 10; i++){
        produtosCpf.push(arrayCpf[1][i] * j);
        soma += produtosCpf[i];
        j++; 
    }

    //Se der maior ou igual a 10, pela regra = 0
    if(soma % 11 >= 10){
        arrayCpf[1][10] = 0;
    }else{
        arrayCpf[1][10] = soma % 11;
    }
    
    //Se o valor calculado for igual ao CPF final, cpf valido
    if(arrayCpf[1].toString().split(',').join('') == cpfFinal.value){
        return true
    }else{
        return false
    }
}

//Funcoes de animacoes CSS via JS
//Funcao para exibir a senha para o usuario
const senha = (tipo) =>{
    const senhaCadastro = document.getElementsByClassName('input-senha')[0];
    const senhaLogin = document.getElementsByClassName('input-senha')[1];
    const spanSenha = document.getElementsByClassName('span-senha');
    
    //tipo 1 == formulario Cadastro, tipo 2 == formLogin
    if(tipo == 1){
        //Se o tipo tiver como password, irá transformar em text e vice-versa
        if(senhaCadastro.type == 'password'){
            senhaCadastro.type = 'text';
            spanSenha[0].style.backgroundImage = "url(/src/assets/img/senha-escondida.svg)";
            
        }else{
            senhaCadastro.type = 'password';
            spanSenha[0].style.backgroundImage = "url(/src/assets/img/senha-aberta.svg)";
        }
    }else{
        if(senhaLogin.type == 'password'){
            senhaLogin.type = 'text';
            spanSenha[1].style.backgroundImage = "url(/src/assets/img/senha-escondida.svg)";
        }else{
            senhaLogin.type = 'password';
            spanSenha[1].style.backgroundImage = "url(/src/assets/img/senha-aberta.svg)";
        }
    }
}

//Funcao para exibir o formulario de login
const exibirLogin = () => {
    const formCadastro = document.getElementsByClassName('formulario-cadastro');
    const formLogin = document.getElementsByClassName('container-login');
    const containerProgress = document.getElementsByClassName('container');
    const sectionUsu = document.getElementById('section-formUsu');
    const formRA = document.getElementsByClassName('container-form');
    
    usuario.email = '';
    usuario.senha = '';
    formRA[0].style.opacity = '0';
    formRA[0].style.transform = 'translateY(-800px)';
    sectionUsu.style.paddingTop = '4rem';
    containerProgress[0].style.transform = 'translateY(-800px)';
    formCadastro[0].style.opacity = '0';
    formCadastro[0].style.transform = 'translateY(-800px)'
    setTimeout(()=>{
        formLogin[0].style.display = 'block';
        setTimeout(() => {
            formCadastro[0].style.position = 'absolute'
            formRA[0].style.display = 'none';
            formLogin[0].style.transform = 'translateY(0)';
        }, 5)
    }, 400)

    setTimeout(() =>{
        containerProgress[0].style.display = 'none';
    }, 600)
}

//Funcao para exibir o formulario de cadastro
const exibirCadastro = () =>{
    const formLogin = document.getElementsByClassName('container-login');
    const formCadastro = document.getElementsByClassName('formulario-cadastro');
    const containerProgress = document.getElementsByClassName('container');
    const sectionUsu = document.getElementById('section-formUsu');
    const formRA = document.getElementsByClassName('container-form');
    const stepper = document.getElementsByClassName('stepper-item');

    if(stepper[0].classList.contains('completed')){
        formRA[0].style.transform = 'translateY(-800px)'; 
        formRA[0].style.position = 'absolute';
        formCadastro[0].style.transform = 'translateY(0)';
        formCadastro[0].style.position = 'unset';
    }else{
        formRA[0].style.position = 'unset';   
    }
    containerProgress[0].style.display = 'block';
    formCadastro[0].style.opacity = '1';
    formCadastro[0].style.position = 'unset'
    formLogin[0].style.transform = 'translateY(-800px)';
    setTimeout(() =>{
        containerProgress[0].style.transform = 'translateY(0)';
        formLogin[0].style.display = 'none';
        sectionUsu.style.paddingTop = '2rem';
        if(stepper[0].classList.contains('completed')){
            formRA[0].style.display = 'none';
        }else{
            formRA[0].style.display = 'flex';
        }

        setTimeout(() =>{
            formRA[0].style.opacity = '1';
            if(stepper[0].classList.contains('completed')){
                formRA[0].style.transform = 'translateY(-800px)';
            }else{
                formRA[0].style.transform = 'translateY(0)';   
            }
        }, 400)

    }, 400)
}

//Funcao para ocultar o formulario de RA e exibir o de cadastro(parametro fase para a progress bar)
const ocultarRA = (fase) =>{
    const formRA = document.getElementsByClassName('container-form');
    const formCadastro = document.getElementsByClassName('formulario-cadastro');
    const stepper = document.getElementsByClassName('stepper-item');

    formRA[0].style.opacity = '0';
    formRA[0].style.transform = 'translateY(-800px)';
    //Pegando a classe para colocar como verde, depois chamando o modal para verificar o RA
    stepper[fase].classList.add('completed');
    
    setTimeout(() =>{
        formCadastro[0].style.display = 'flex';
        setTimeout(() =>{
            formRA[0].style.position = 'absolute';
            formCadastro[0].style.transform = 'translateY(0)';
        }, 5)
    }, 400)
}

//Funcao para exibir o formulario de veiculo
const exibirVeiculo = (fase) =>{
    const formCadastro = document.getElementsByClassName('formulario-cadastro')[0];
    const formVeiculo = document.getElementsByClassName('formulario-cadastro')[1];
    const stepper = document.getElementsByClassName('stepper-item');

    formCadastro.style.opacity = '0';
    formCadastro.style.transform = 'translateY(-800px)';
    stepper[fase].classList.add('completed');

    setTimeout(() =>{
        formVeiculo.style.display = 'flex';
        setTimeout(()=>{
            formCadastro.style.position = 'absolute';
            formVeiculo.style.transform = 'translateY(0)';
        }, 5)
    }, 400)
}
</script>

<style scoped>
*{
    color: var(--cor-texto);
}
section{
    padding: 2rem 3rem;
    overflow: hidden;
}

#section-formUsu{
    transition: all ease-in-out .8s;
}

.container{
    overflow: hidden;
    transition: all ease-in-out .8s;
}

.titulo-formulario{
    font-size: clamp(1rem, 10vw, 36px);
}

.titulo-formulario:hover{
    cursor: pointer;
}

.stepper-wrapper {
  margin-top: 4.5rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step-counter{
    margin-top: -1.8rem;
}

.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.stepper-item::before {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: -50%;
  z-index: 2;
  transition: all ease-in-out 1.5s;
}

.stepper-item.completed::before{
    position: absolute;
    content: "";
    border-bottom: 2px solid #4bb543;
    width: 100%;
    top: 20px;
    left: -50%;
    z-index: 2;
}

.stepper-item::after {
  position: absolute;
  content: "";
  border-bottom: 2px solid #ccc;
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 2;
}

.stepper-item.completed::after {
  position: absolute;
  content: "";
  border-bottom: 2px solid #4bb543;
  width: 100%;
  top: 20px;
  left: 50%;
  z-index: 3;
}


.titulo-barra{
    font-size: 18px;
    margin-top: .5rem;
}

.img-form{
    width: 100px;
    height: 100px;
    position: relative;
    z-index: 99;
}

.container-titulo{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 4rem;
}

.titulo-barra{
    font-size: 18px;
    text-align: center;
}

.formulario-cadastro, .container-input, .formulario-login, .formulario-ra{
    display: flex;
    justify-content: center;
    align-items: center;
}

.formulario-cadastro, .formulario-login, .formulario-ra{
    max-width: 700px;
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
    flex-direction: column;
    column-gap: 2rem;
    align-items: flex-start;
    position: relative;
}

.container-input input, .container-input select{
    width: 30vw;
    max-width: 300px;
    border-radius: 10px;
    background-color: #E9E9E9;
    height: 40px;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
}

.container-input input, .container-input select{
    padding: 0 .8rem;
}

.input-foto{
    padding: .4rem .6rem !important;
}

.input-foto:hover{
    cursor: pointer;
}

.container-input select, .container-input select option, .container-input label, .container-input input{
    color: #0B1215;
}

.container-input select option, .container-input input, .container-input select{
    font-size: clamp(0, 12px, 13px);
}

.container-input input::placeholder{
    color: #0B1215;
}

.span-senha{
    background-image: url('../assets/img/senha-aberta.svg');
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 9px;
    top: 33px;
}

.span-senha:hover{
    cursor: pointer;
}

.container-input label{
    margin-bottom: .3rem;
}

.container-input label:hover{
    cursor: pointer;
}

.container-logradouro{
    border-top: 1.5px solid #0B1215;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    column-gap: 2rem;
    row-gap: 2rem;
    padding-top: 1rem;
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

.container-login, .formulario-cadastro, .container-form{
    transition: all ease-in-out .8s;
}

.container-form{
    animation: baixo .8s ease-in-out;
}

.container-login, .formulario-cadastro{
    display: none;
    transform: translateY(700px);
}

/*Teste*/
.teste{
    transition: all 500ms;
    transition-behavior: allow-discrete;
}

.sumir{
    opacity: 0;
    display: none;
}

.aparecer{
    display: block;
    opacity: 1;
}

@keyframes cima{
    0%{
        transform: translateY(0);
        opacity: 1;
    }100%{
        transform: translateY(-800px);
        opacity: 0;
    }
}

@keyframes baixo{
    0%{
        transform: translateY(-800px);
        opacity: 0;
    }100%{
        transform: translateY(0);
        opacity: 1;
    }
}

/*Responsividade*/
@media screen and (max-width: 700px){
    .formulario-cadastro, .formulario-login, .formulario-ra{
        flex-direction: column;
        max-width: 80%;
    }

    .container-input input, .container-input select{
        width: 50vw;
    }

    .form-botao{
        padding: 1.4vw 17vw;
    }
}

@media screen and (max-width: 400px){
    #section-formUsu{
        padding: 2rem 1rem;
    }

    .img-form{
        width: 50px;
        height: 50px;
    }

    .step-counter{
        margin-top: 0;
    }

    .titulo-barra{
        font-size: 4vw;
    }

    .container-input input, .container-input select{
        width: 80vw;
    }

    .formulario-cadastro, .formulario-login, .formulario-ra{
        max-width: 100%;
    }
}

@media screen and (max-width: 360px){
    .titulo-formulario{
        font-size: 8vw;
    }
}
</style>