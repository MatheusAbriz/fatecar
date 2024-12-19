<template>
<section>
    <input type="text" name="origem" id="origem" v-model="ruaOrigem.endereco">
    <input type="text" name="destino" id="destino" v-model="ruaDestino.endereco">
    <button class="form-botao" @click="calcularRota();">Calcular Rota</button>
    <div ref="map" style="width: 500px; height: 500px;" id="map">
    </div>

    <button @click="selecionaStatusCorrida('passageiro')" v-if="!verificaLogado()" class="form-botao">Ficar online</button>
    <button @click="selecionaStatusCorrida('motorista')" v-else class="form-botao">Ficar online</button>

    <div class="carregando-corrida">
        <h1 class="titulo-mapa">Procurando motorista...</h1>
        <p class="cronometro-corrida"></p>
        <div class="carregando"></div>
    </div>

    <div class="solicitar-corrida">
        <span class="fechar-modal" @click="fecharModal('solicitarCorrida')">X</span>
        <div class="container-info-motorista">
            <img alt="imagem do motorista" class="img-motorista">
            <div class="corrida-info">
                <p class="nome-motorista"></p>
                <p class="carro-motorista"></p>
                <p class="tempo-corrida"></p>
                <p class="distancia-corrida"></p>
            </div>

            <div class="container-preco">
                <p class="preco-corrida"></p>
            </div>

            <div class="container-botao">
                <button @click="aceitarCorrida()" class="form-botao">Aceitar Corrida</button>
            </div>
        </div>
    </div>

    <div class="aceitar-corrida">
        <div id="map-aceitar"></div>
    </div>

    <div class="comecar-corrida">
        <!--<h1 class="titulo-motorista">Sua carona chegou!</h1>-->
        <h1 class="titulo-motorista">Você chegou ao passageiro!</h1>
        <!--<p class="texto-corrida">Por favor, confirme a chegada do motorista para começar a corrida</p>-->
        <p class="texto-corrida">Por favor, confirme sua chegada para começar a corrida</p>
        <button @click="acompanharCorrida()" class="form-botao">Começar corrida</button>
        <div id="map-acompanhar"></div>
    </div>
</section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient'
import leaflet from 'leaflet'
import L from 'leaflet'
import "leaflet-routing-machine"

// Personalizar css no mapa
let myCustomColourUser = ''
const markerHtml = ``

const router = useRouter();
const coords = ref({ lat: 0, lng: 0 });
const ruaOrigem = reactive({
    endereco: ''
})
const ruaDestino = reactive({
    endereco: ''
})
const waypoints = ref(['Avenida Paulista 300, São Paulo', 'Rua Da Consolação 2004, São Paulo', 'Fatec Zona Sul'])
const usuario = ref([]);

const pagamento = reactive({
    formaPagamento: 'Selecione'
})

let map;
let directionsService;
let directionsRenderer;
let sourceAutocomplete;
let desAutocomplete;


//Verificando se o usuário está logado para realizar a corrida
const verificaLogado = () =>{
    if(localStorage.getItem('logadoMotorista')){
        usuario.value = JSON.parse(localStorage.getItem('logadoMotorista'));
        return true;
    }else if(localStorage.getItem('logadoPassageiro')){
        usuario.value = JSON.parse(localStorage.getItem('logadoPassageiro'));
        return false;
    }else{
        alert("Você não está logado ou não possui um registro! Por favor, logue e/ou faça um cadastro antes");
        router.push({ name: 'passageiroView' });
    }
}

//Criando a rota
const criandoMapa = async() =>{
    const { Map } = await google.maps.importLibrary('maps');
    map = new Map(document.getElementById('map'),{
        center: { lat: -34.397, lng: 150.644 },
        zoom: 13,
    })

    //API de origem e destino
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    //Autocomplete nos campos de texto
    sourceAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('origem')
    );
    desAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('destino')
    );
}

//Funcao para pegar a posicao atual do usuario
const posicaoUsuario = () =>{
    //Funcoes para pegar a localizacao do usuario
    navigator.geolocation.getCurrentPosition(function() { }, function () { }, {});
    navigator.geolocation.getCurrentPosition(async function(position){
        //Atribuindo a posicao do usuario a minha variavel coords
        coords.value.lat = position.coords.latitude;
        coords.value.lng = position.coords.longitude;
        const newCenter = { lat: coords.value.lat, lng: coords.value.lng };
        map.setCenter(newCenter);

        //Try e Catch para formatacao de erros quando usado axios
        //Transformando de Latitude e Longitude para endereço real
        try{
            const res = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.value.lat},${coords.value.lng}&sensor=true&key=AIzaSyAwbJtgkmfJTY0TYh0r1O9-9e975P9caZA`)
            
            //Atribuindo a minha variavel rua de origem o endereco formatado
            ruaOrigem.endereco = res.data.results[0].formatted_address;
        }catch(error){
            console.log(error);
        }
        }, function (e) {
            console.log('deu errado');
        }, {
            enableHighAccuracy: true
        });
}
var tempoFinal = 0;
var distanciaCorrida = 0;
//Funcao para calcular a rota
const calcularRota = () =>{
    const request = {
        origin: document.getElementById('origem').value,
        destination: document.getElementById('destino').value,
        travelMode: 'DRIVING',
        //waypoints: waypoints.value.map(location =>({location, stopover: true})), -> Waypoints serão usados depois!
    }

    //Se a rota estiver certa, trará o resultado
    directionsService.route(request, function(result, status){
        if(status == 'OK'){
            directionsRenderer.setDirections(result);
        }
    });

    //Calculando a distancia em KM
    const rota = {
        origin: document.getElementById('origem').value,
        destination: document.getElementById('destino').value,
        travelMode: 'DRIVING',
        //waypoints: waypoints.value.map(location =>({location, stopover: true})) -> serao usados depois!
    }

    //Adicionando as rotas para calcular
    directionsService.route(rota, function(response, status){
        if(status != 'OK'){
            window.alert('Direcçoes falharam devido a ' + status);
            return;
        }else{
            directionsRenderer.setDirections(response);
        }

        const direcaoDuracao = [];
        const direcaoDistancia = [];
        for(let i = 0; i < response.routes[0].legs.length; i++){
            direcaoDuracao.push(response.routes[0].legs[i].duration.text);
            direcaoDistancia.push(response.routes[0].legs[i].distance.text);
        }
        
        if(!direcaoDuracao && !direcaoDistancia){
            window.alert('Direcoes Falharam');
            return;
        }else{
            //Laço for para somar o tempo e a distancia de todas as corridas(waypoints inclusos)
            for(let i = 0; i < direcaoDuracao.length; i++){
                tempoFinal += Number(direcaoDuracao[i].split(' ')[0]);
                distanciaCorrida += direcaoDistancia[i].split(/,\s*/).map(item => Number(item.replace(' km', '').replace(',', '.'))).reduce((acc, curr) => acc + curr, 0);
            }

            //Pegando a quantidade de minutos e convertendo para horas
            tempoFinal = tempoFinal / 60;

            //Precificando a corrida
            //F(x) = ax + b -> a = 0.5 // x = kms rodados // b = 3
            //const precoCorrida = ((0.5 * distanciaCorrida) + 3).toFixed(2);
            console.log('Preço da corrida: R$ ' + 3.50);

            console.log('Tempo de corrida: ' + tempoFinal.toFixed(1) + ' horas');
            console.log('Distância de corrida: ' + distanciaCorrida + ' km');
        }
    })
}

//Variavel com escopo global para utilizar como condição entre as funcoes
var intervalo;
//Funcao para atualizar o status da corrida para ativo de ambos usuarios
const selecionaStatusCorrida = async(tipo) =>{
    //Atualizando o status do usuario para true
    const statusCorrida = { statusCorrida: true };
    try{
        const res = await axios.put(`http://localhost:3000/${tipo}/update/${usuario.value.id}`, statusCorrida)
    }catch(error){
        console.log(error);
    }
    console.log("Atualizado com sucesso!");

    if(tipo == 'motorista'){
       procurandoPassageiro()
    }else{
        //Adicionando a animacao de popup
        const carregando = document.getElementsByClassName('carregando-corrida')[0];
        animacaoPopup(carregando)
        cron = setInterval(() =>{
            timer();
        }, tempo)
        intervalo = setInterval(procurandoMotorista, 3000)
    }
}
const looping = ref(false);

//Procurando motorista(parte do passageiro)
const procurandoMotorista = async() =>{
    const req = await axios.get(`http://localhost:3000/motorista`);
    //Se looping for verdadeiro, entao rodará um looping que irá verificar cada motorista cadastrado e, o primeiro que estiver online, será chamado para a corrida(posteriormente adicionar um limitador com max 4 passageiros)
    if(!looping.value){
        for(let i = 0; i < req.data.length; i++){
            if(req.data[i].statusCorrida == false){
                console.log("Procurando motorista...");
            }else{
                console.log(`Motorista achado! Nome: ${req.data[i].nome}`);
                looping.value = true;
                //Chamando o modal de exibir corrida e passando junto os valores
                clearInterval(cron);
                motoristaAchado(req.data)
                fecharModal('carregandoCorrida');
                break;
            }
        }
    }else{
        clearInterval(intervalo);
    }
}
//Como estamos usando um endereço fixo, vou deixar o endereço do passageiro fixo mesmo(Rua Icaturama, 385) - Primeiro passageiro
//Segundo passageiro - 'Estrada do Rufino 1045', 
//Terceiro passageiro - 'Rua porfilio Martins, 165'
//Quarto passageiro - 'Rua Ana Maria, 166'
//Destino: Fatec Diadema
const usuarioLatLng = [ -23.6727038, -46.6589553, -23.6881481, -46.6671813, -23.7028682, -46.6161837, -23.704995, -46.60581699999999, -23.6736289, -46.618921]
//Procurando passageiro(parte do motorista)
const passageirosEncontrados = new Set();
const passageiros = [];
const procurandoPassageiro = async (index = 0) => {
    const req = await axios.get('http://localhost:3000/passageiro');
    if (!looping.value) {
        //Verifica se o numero ja estourou 4 passageiros
        if(passageirosEncontrados.size >= 4){
            //aceitarCorridaMotorista()
            alert('Busca acabou! Máximo de 4 passageiros atingidos');
            const buttonAcompanharCorrida = document.getElementsByClassName('comecar-corrida')[0];
            animacaoPopup(buttonAcompanharCorrida);
            //acompanharCorrida();
        }
        if (index < req.data.length) {
            if (req.data[index].statusCorrida === false) {
                console.log("Procurando passageiro...");
                // Chama a função novamente com um pequeno atraso
                setTimeout(() => procurandoPassageiro(index + 1), 3000);
            } else {
                // Verifica se o passageiro já foi encontrado
                if (!passageirosEncontrados.has(req.data[index].id)){
                    console.log(`Passageiro achado! Nome: ${req.data[index].nome}`);
                    passageirosEncontrados.add(req.data[index].id); // Adiciona o ID ao conjunto
                    passageiros.push(req.data[index]);
                    var precoCorrida = 3.5;

                    // Pergunta ao usuário se quer continuar a busca
                    setTimeout(() =>{
                        const continuar = confirm(`Passageiro achado! Nome: ${req.data[index].nome}. Deseja continuar procurando?`);
                        if (continuar) {
                            // Reinicia a busca a partir do próximo índice
                            setTimeout(() => procurandoPassageiro(index + 1), 3000);
                        } else {
                            try{
                                const res = axios.post(`http://localhost:3000/corrida`,{
                                passageirosIds: passageiros,
                                motoristaId: usuario.value.id,
                                tempoCorrida: `${tempoFinal.toFixed(2)} h`,
                                distanciaCorrida: `${distanciaCorrida} kms`,
                                precoCorrida: `R$ ${3.5 * passageiros.length}`,
                                formaPagamento: `${ pagamento.formaPagamento }`
                            })
                            console.log(pagamento.formaPagamento)
                            }catch(error){
                                console.log("Erro!", error);
                            }
                            console.log(`Busca acabou! ${JSON.stringify(passageiros)}, tempo final: ${tempoFinal}, distancia: ${distanciaCorrida} e preco final: ${precoCorrida}`);
                            //aceitarCorridaMotorista()
                            const buttonAcompanharCorrida = document.getElementsByClassName('comecar-corrida')[0];
                            animacaoPopup(buttonAcompanharCorrida);
                            //acompanharCorrida();
                        }
                    }, 3000)
                } else {
                    // Se o passageiro já foi encontrado, continua a busca
                    setTimeout(() => procurandoPassageiro(index + 1), 3000);
                }
            }
        } else {
            if(confirm(`Nenhum passageiro encontrado. Deseja reiniciar a busca?`)){
                // Reinicia a busca do índice 0 após um tempo
                setTimeout(() => procurandoPassageiro(0), 3000);
            }else{
                try{
                    const res = await axios.post(`http://localhost:3000/corrida`,{
                    passageirosIds: passageiros,
                    motoristaId: usuario.value.id,
                    tempoCorrida: `${tempoFinal} h`,
                    distanciaCorrida: `${distanciaCorrida} kms`,
                    precoCorrida: `R$ ${3.5 * passageiros.length}`
                })

                console.log(pagamento.formaPagamento)

                }catch(error){
                    console.log("Erro!", error);
                }

                //Return para matar a funcao e retornar um valor
                //aceitarCorridaMotorista()
                const buttonAcompanharCorrida = document.getElementsByClassName('comecar-corrida')[0];
                animacaoPopup(buttonAcompanharCorrida);
                //acompanharCorrida();
                console.log(`Busca Encerrada! ${passageiros}, tempo final: ${tempoFinal}, distancia: ${distanciaCorrida} e preco final: ${3.5 * passageiros.length}`);
            }
        }
    } else {
        console.log("Busca encerrada, looping ativo.");
    }
};

//Valor 'default'
const motoristaEndereco = ref('Rua robelia');

//Motorista/passageiro achado
const motoristaAchado = async(motorista) =>{
    const solicitarCorrida = document.getElementsByClassName('solicitar-corrida')[0]
    animacaoPopup(solicitarCorrida)

    const nomeMotorista = document.getElementsByClassName('nome-motorista')[0]
    const carroMotorista = document.getElementsByClassName('carro-motorista')[0]
    const tempoCorrida = document.getElementsByClassName('tempo-corrida')[0]
    const distancia = document.getElementsByClassName('distancia-corrida')[0]
    const precoCorrida = document.getElementsByClassName('preco-corrida')[0]
    const imgMotorista = document.getElementsByClassName('img-motorista')[0];

    var carro = '';
    //Fazendo a requisicao com axios para puxar o carro do motorista
    try{
        const res = await axios.get(`http://localhost:3000/carro/${motorista[0].id}`);
        carro = res.data;
    }catch(error){
        console.log("Erro!", error)
    }

    //Adicionando a imagem ao motorista
    //Imprimindo no HTML as informacoes passadas via parametro
    motoristaEndereco.value = motorista[0].endereco;
    imgMotorista.src = `https://qnmtccqlagouvoxloevj.supabase.co/storage/v1/object/public/fatecar/${motorista[0].foto}`
    nomeMotorista.innerHTML = motorista[0].nome.charAt(0).toUpperCase() + motorista[0].nome.slice(1)
    carroMotorista.innerHTML = carro.modelo + ' ' + carro.nome;
    tempoCorrida.innerHTML = tempoFinal > 60 ? (tempoFinal / 60 + ' horas') : (tempoFinal * 100).toFixed(0)  + ' minutos';
    distancia.innerHTML = `${distanciaCorrida} km`;
    precoCorrida.innerHTML = 'R$ 3.5';
}

//Aceitar corrida
const aceitarCorrida = () =>{
    // Coordenadas do Ponta A - Táxi(Rua Avenida Leonor) - longitude e latitude
	const coordTaxi = [-23.67122, -46.65794];
	// Coordenadas do Ponta B - Usuário(Fatec Diadema) - longitude e latitude
	const coordUser = [-23.673492102672295, -46.61876475881608];

    // Iniciar o mapa com coordenadas do ponto A
	const map = L.map('map-aceitar').setView(coordTaxi, 13);

    //leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	// Personalizar Ponto na mapa com imagem do táxi.
	const taxiIcon = L.icon({
		className: "taxi-pointers",
		iconUrl: 'src/assets/img/taxi.svg',
		iconSize: [45, 45]
	})

    //Como estamos usando um endereço fixo, vou deixar o endereço do passageiro fixo mesmo(Rua Icaturama, 385)
    const passageiroLatLng = [ -23.67122, -46.65794]

    //No motorista usa também um endereço fixo, rua robelia!!!
    const motoristaLatLng = []
    const solicitarCorrida = document.getElementsByClassName('solicitar-corrida')[0]
    const aceitarCorrida = document.getElementsByClassName('aceitar-corrida')[0]
    animacaoSumir(solicitarCorrida);
    animacaoPopup(aceitarCorrida);
    $.ajax({
        method: 'POST',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${motoristaEndereco.value}&sensor=true&key=AIzaSyAwbJtgkmfJTY0TYh0r1O9-9e975P9caZA`,
        success: function(data){
            motoristaLatLng.push(data.results[0].geometry.location.lat);
            motoristaLatLng.push(data.results[0].geometry.location.lng);
            const marker = L.marker(motoristaLatLng, { icon: taxiIcon }).addTo(map);

            function startService(){
                // Array de coordenadas. Simula o táxi enviando a localização para o APP.
                const latlng = [
                    { lat:  -23.652296, lng: -46.676648 },
                    { lat:  -23.653950, lng: -46.677377 },
                    { lat:  -23.654835, lng: -46.677265 },
                    { lat:  -23.655404, lng: -46.676780  },
                    { lat:  -23.656160, lng: -46.675074  },
                    { lat:  -23.656797, lng: -46.674570  },
                    { lat:  -23.657620, lng: -46.674283  },
                    { lat:  -23.657514, lng: -46.673769  },
                    { lat:  -23.656681, lng: -46.671282  },
                    { lat:  -23.655467, lng: -46.669132 },
                    { lat:  -23.656477, lng: -46.668416  },
                    { lat:  -23.659670, lng: -46.665447 },
                    { lat:  -23.661389, lng: -46.663476},
                    { lat:  -23.662612, lng: -46.662294  },
                    { lat:  -23.666049, lng: -46.656680  },
                    { lat:  -23.667739, lng: -46.656190  },
                    { lat:  -23.671320, lng: -46.657979 },
                    { lat: passageiroLatLng[0], lng: passageiroLatLng[1] }
                ]

                //Personalizar Ponto no mapa com a imagem do usuario
                const icon = L.divIcon({
                    className: "pointers",
                    iconAnchor: [0, 24],
                    labelAnchor: [-6, 0],
                    popupAnchor: [0, -36],
                })

                //Identifica a melhor rota para realizar a viagem
                L.Routing.control({
                    waypoints: [
                        L.latLng(motoristaLatLng[0], motoristaLatLng[1]),
                        L.latLng(passageiroLatLng[0], passageiroLatLng[1]),
                    ]
                }).on('routesfound', function(e){
                    //Looping de coordenadas. Simula o táxi enviando a localização para o APP
                    latlng.forEach(function (coord, index){
                        setTimeout(function(){
                            marker.setLatLng([coord.lat, coord.lng]);
                            //Identifica o final da viagem
                            if(coord.lat === passageiroLatLng[0] && coord.lng === passageiroLatLng[1]){
                                //Chamando o modal para iniciar a corrida
                                const aceitarCorrida = document.getElementsByClassName('aceitar-corrida')[0]
                                const comecarCorrida = document.getElementsByClassName('comecar-corrida')[0]
                                animacaoSumir(aceitarCorrida)
                                animacaoPopup(comecarCorrida)
                                alert("O seu motorista chegou!");
                            }
                        }, 1000 * index)
                    })
                }).addTo(map)
            }
            startService()
                }
            })
}

//Comecar corrida
const comecarCorrida = () =>{
    // Coordenadas do Ponta A - Táxi(Rua Avenida Leonor) - longitude e latitude
	const coordTaxi = [-23.675907756277052, -46.62769666643045];
	// Coordenadas do Ponta B - Usuário(Fatec Diadema) - longitude e latitude
	const coordUser = [-23.673492102672295, -46.61876475881608];

    // Iniciar o mapa com coordenadas do ponto A
	const map = L.map('map-comecar').setView(coordTaxi, 40);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	// Personalizar Ponto na mapa com imagem do táxi.
	const taxiIcon = L.icon({
		className: "taxi-pointers",
		iconUrl: 'src/assets/img/taxi.svg',
		iconSize: [45, 45]
	})
	const marker = L.marker(coordTaxi, { icon: taxiIcon }).addTo(map);

    function comecarServico(){
        // Array de coordenadas. Simula o táxi enviando a localização para o APP.
		const latlng = [
                { lat: -23.673492102672295 , lng: -46.61876475881608},
				{ lat: -23.677296569310176, lng:  -46.614748631927355},
				{ lat: -23.68082317954772, lng:  -46.616308535715},
                { lat: -23.680456846374504, lng: -46.61589318340366},
                { lat: -23.682059702885233, lng: -46.61735472146519},
                { lat: -23.684406117154126, lng: -46.61639840643727},
                { lat: -23.68534797581537, lng: -46.619556050397385},
                { lat: -23.685265356906307, lng: -46.6241211013797},
                { lat: -23.68462092762208, lng: -46.63029203986173},
                { lat: -23.6831833431463, lng: -46.63491122188337},
                { lat: -23.68123349064488, lng: -46.63453230460816},
                { lat: -23.681596065672323, lng: -46.63655926697631},
                { lat: -23.681919051043, lng: -46.638581767021485},
                { lat: -23.68400513090962, lng: -46.63981787761739},
                { lat: -23.684403275393667, lng: -46.64056405497151},
                { lat: -23.683376541386032, lng: -46.64116486978534},
                { lat: -23.68341092973309, lng: -46.64306923818883},
                { lat: -23.684912653548377, lng: -46.64530684566484},
                { lat: -23.68512654256355, lng: -46.64665225064809},
                { lat: -23.68411848844061, lng: -46.649739257884775},
                { lat: -23.675988309829016, lng: -46.66023359711596},
                { lat: -23.66484812698164, lng: -46.678883750764804},
                { lat: -23.66353929884076, lng: -46.690137018880414},
                { lat: -23.66064207694469, lng: -46.694845241647336},
                { lat: -23.65844620277578, lng: -46.698472587023566},
                { lat: -23.661405850682048, lng: -46.706123367297366},
                { lat: -23.66570199448649, lng: -46.71202301523687},
                { lat: -23.666330731466864, lng: -46.71900639136125},
                { lat: -23.667184369108995, lng: -46.72659590594749},
                { lat: -23.663608340292846, lng: -46.726845785357725},
                { lat: -23.66263258392399, lng: -46.729343608907975}
			]

        //Personalizar Ponto no mapa com a imagem do usuario
        const icon = L.divIcon({
            className: "pointers",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
        })

        var newMarker = L.marker([coordUser[0], coordUser[1]], { icon }).addTo(map);

        //Identifica a melhor rota para realizar a viagem
        L.Routing.control({
            waypoints: [
                L.latLng(coordTaxi[0], coordTaxi[1]),
                L.latLng(coordUser[0], coordUser[1])
            ]
        }).on('routesfound', function(e){
            //Looping de coordenadas. Simula o táxi enviando a localização para o APP
            latlng.forEach(function (coord, index){
                setTimeout(function(){
                    marker.setLatLng([coord.lat, coord.lng]);
                    //Identifica o final da viagem
                    if(coord.lat === coordUser[0] && coord.lng === coordUser[1]){
                        //Chamando o modal para iniciar a corrida
                        const comecarCorrida = document.getElementsByClassName('comecar-corrida')[0]
                        animacaoPopup(comecarCorrida);
                        alert("O seu motorista chegou!");
                    }
                }, 1000 * index)
            })
        }).addTo(map)
    }
    comecarServico()
}

//Acompanhar corrida
const acompanharCorrida = () =>{
		// Coordenadas do Ponta A - Usuário Origem - Fatec Diadema - longitude e latitude
		const coordTaxi = [-23.673492102672295, -46.61876475881608];
		// Coordenadas do Ponta B - Destino Final - Fatec Zona Sul
		const coordUser = [-23.66263258392399, -46.729343608907975];

    // Iniciar o mapa com coordenadas do ponto A
	const map = L.map('map-acompanhar').setView(coordTaxi, 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	// Personalizar Ponto na mapa com imagem do táxi.
	const taxiIcon = L.icon({
		className: "taxi-pointers",
		iconUrl: 'src/assets/img/taxi.svg',
		iconSize: [45, 45]
	})
    
    function comecarServico(){
        // Array de coordenadas. Simula o táxi enviando a localização para o APP.
        //Simulando os endereços de waypoints. Ponto A - Endereco do usuario principal(ruaOrigem.endereco)
        //Ponto B -> Estrada do rufino, 1045(passageiro B)
        //Ponto C -> Rua porfilio Martins 165(passageiro C)
        //Ponto D -> Rua Ana Maria 166(passageiro D)
        //Ponto E -> Fatec Diadema(ruaDestino.endereco)
        const pontos = [ruaOrigem.endereco, "Estrada do Rufino, 1045", "Rua Porfilio Martins, 165", "Rua Ana Maria, 166", "Fatec Diadema"];
        const pontosLat = [];
        const pontosLng = [];
        //Convertendo de endereco real lat e lng
        $.ajax({
            method: 'POST',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${pontos}&sensor=true&key=AIzaSyAwbJtgkmfJTY0TYh0r1O9-9e975P9caZA`,
            success:function(data){
                //Pegando todas as lat e lng dos enderecos cadastrados e fazendo um looping para automatizar o processo
                for(let i = 0; i < pontos.length + 1; i++){
                    pontosLat.push(data.results[i].geometry.location.lat);
                    pontosLng.push(data.results[i].geometry.location.lng);
                }
                //Personalizar Ponto no mapa com a imagem do usuario
                const icon = L.divIcon({
                    className: "pointers",
                    iconAnchor: [0, 24],
                    labelAnchor: [-6, 0],
                    popupAnchor: [0, -36],
                })

                //Adicionando manualmente todas as 'atualizacoes' na rota
                const latlng = [ 
                    //Primeiro endereco(origem - Rua Icaturama, 385)
                    { lat: pontosLat[0], lng: pontosLng[0] },
                    //INDO DO PRIMEIRO ENDEREÇO A RUA JAPAO
                    { lat: -23.670803, lng: -46.657658}, 
                    { lat:  -23.668070, lng: -46.655688 }, 
                    { lat:  -23.667194, lng: -46.654263}, 
                    { lat:  -23.670698, lng: -46.647262}, 
                    { lat:  -23.675061, lng: -46.642625 }, 
                    { lat:  -23.682199, lng: -46.636634 }, 
                    { lat:  -23.684463, lng: -46.632628 }, 
                    { lat:  -23.685264, lng: -46.626689 }, 
                    { lat:  -23.686203, lng:  -46.625865 }, 
                    { lat:  -23.687835, lng: -46.626506 }, 
                    { lat:  -23.689132, lng: -46.626088 }, 
                    { lat:  -23.691134, lng: -46.627757}, 
                    { lat:  -23.694315, lng: -46.628694}, 
                    
                    //MUDAR DAQ PARA CIMA 
                    //RUA JAPAO---
                    {  lat: -23.696230, lng: -46.628881 },
                    {  lat: -23.697620, lng: -46.627797 },
                    {  lat: -23.701175, lng: -46.627159  },
                    {  lat:  -23.702176, lng: -46.626248 },
                    {  lat:  -23.702350, lng:  -46.624701},
                    {  lat:  -23.703706, lng:  -46.625388},
                    {  lat:  -23.704752, lng: -46.624508 },
                    {  lat:  -23.705352, lng:  -46.621332},
                    {  lat: -23.704875, lng:  -46.617163 },
                    {  lat:  -23.704367, lng:  -46.616821},
                    //Chegando no segundo endereco
                    { lat: -23.7028682, lng: -46.6161837 },
                    //Segundo endereco
                    { lat: pontosLat[1], lng: pontosLng[1] },
                    //MUDANDO DO SEGUNDO ENDEREÇO ATÉ CHEGAR NO TERCEIRO ENDEREÇO
                    { lat: -23.701290, lng: -46.615393 },
                    { lat: -23.700484, lng: -46.614600 },
                    { lat: -23.699703, lng: -46.613094 },
                    { lat: -23.699419, lng: -46.611519},
                    { lat: -23.698943, lng: -46.608557 },
                    { lat: -23.700074, lng: -46.607918  },
                    { lat: -23.700566, lng: -46.607264 },
                    { lat: -23.701233,  lng: -46.606329},
                    { lat: -23.702150, lng: -46.605155},
                    { lat: -23.703218, lng: -46.604791 },
                    { lat: -23.704225, lng:-46.605138  },
                    //Terceiro endereco
                    { lat: pontosLat[2], lng: pontosLng[2] },
                    //Indo do terceiro endereço até o quarto
                    //{ lat: -23.702075, lng: -46.605247},
                    { lat: -23.701019, lng: -46.605123},
                    //Chegou no quarto endereço
                    { lat: pontosLat[4], lng: pontosLng[4] }, 
                    //INDO PARA A FACULDADE(destino final)
                    { lat: -23.699117, lng: -46.608328 },
                    //{ lat: -23.695747, lng: -46.607165},
                    { lat: -23.690687, lng:-46.603532  },
                    { lat: -23.688665, lng: -46.600973},
                    { lat: -23.685277, lng: -46.600272 },
                    { lat: -23.686096, lng: -46.603252},
                    { lat: -23.686016, lng: -46.606390},
                    { lat: -23.684683, lng: -46.604917 },
                    { lat: -23.683818, lng: -46.608151},
                    { lat: -23.684974, lng: -46.614322},
                    { lat: -23.682084, lng: -46.617401},
                    { lat: -23.679101, lng: -46.614486},
                    { lat: -23.676816, lng: -46.617612 },
                    { lat: -23.675878, lng: -46.620632},
                    { lat: -23.673882, lng: -46.621236},
                    { lat: pontosLat[5], lng: pontosLng[5]}
                    ]
                //Identifica a melhor rota para realizar a viagem
                const coordInicio = [ pontosLat[0], pontosLng[0] ]
                const marker = L.marker(coordInicio, { icon: taxiIcon }).addTo(map);
                L.Routing.control({
                    waypoints: [
                        //Primeiro endereco(origem)
                        L.latLng(pontosLat[0], pontosLng[0]),
                        //Segundo endereco(Estrada do rufino 1045)
                        L.latLng(pontosLat[1], pontosLng[1]),
                        //Terceiro endereco(Rua porfilio Martins 165)
                        L.latLng(pontosLat[2], pontosLng[2]),
                        //Quarto endereco(Rua Ana Maria 166)
                        L.latLng(pontosLat[4], pontosLng[4]),
                        //Ultimo endereco(Fatec Diadema)
                        L.latLng(pontosLat[5], pontosLng[5]),
                    ]
                }).on('routesfound', function(e){
                    //Looping de coordenadas. Simula o táxi enviando a localização para o APP
                    latlng.forEach(function (coord, index){
                        setTimeout(function(){
                            marker.setLatLng([coord.lat, coord.lng]);
                            //Identifica o final da viagem
                            if(coord.lat === pontosLat[5] && coord.lng === pontosLng[5]){
                                //Chamando o modal para finalizar a corrida
                                const comecarCorrida = document.getElementsByClassName('comecar-corrida')[0]
                                alert("Corrida finalizada com sucesso! Agradecemos a preferência!");
                                animacaoSumir(comecarCorrida)
                            }
                        }, 1000 * index)
                    })
                }).addTo(map)
                    }
                });
    }
    comecarServico()  
}

//Acompanhar corrida
const acompanharCorridaMotorista = () =>{
		// Coordenadas do Ponta A - Usuário Origem - Fatec Diadema - longitude e latitude
		const coordTaxi = [-23.673492102672295, -46.61876475881608];
		// Coordenadas do Ponta B - Destino Final - Fatec Zona Sul
		const coordUser = [-23.66263258392399, -46.729343608907975];

    // Iniciar o mapa com coordenadas do ponto A
	const map = L.map('map-acompanhar').setView(coordTaxi, 30);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	// Personalizar Ponto na mapa com imagem do táxi.
	const taxiIcon = L.icon({
		className: "taxi-pointers",
		iconUrl: 'src/assets/img/taxi.svg',
		iconSize: [45, 45]
	})
    
    function comecarServico(){
        // Array de coordenadas. Simula o táxi enviando a localização para o APP.
        //Simulando os endereços de waypoints. Ponto A - Endereco do usuario principal(ruaOrigem.endereco)
        //Ponto B -> Estrada do rufino, 1045(passageiro B)
        //Ponto C -> Rua porfilio Martins 165(passageiro C)
        //Ponto D -> Rua Ana Maria 166(passageiro D)
        //Ponto E -> Fatec Diadema(ruaDestino.endereco)
        const pontos = [ruaOrigem.endereco, "Estrada do Rufino, 1045", "Rua Porfilio Martins, 165", "Rua Ana Maria, 166", "Fatec Diadema"];
        const pontosLat = [];
        const pontosLng = [];
        //Convertendo de endereco real lat e lng
        $.ajax({
            method: 'POST',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${pontos}&sensor=true&key=AIzaSyAwbJtgkmfJTY0TYh0r1O9-9e975P9caZA`,
            success:function(data){
                //Pegando todas as lat e lng dos enderecos cadastrados e fazendo um looping para automatizar o processo
                for(let i = 0; i < pontos.length + 1; i++){
                    pontosLat.push(data.results[i].geometry.location.lat);
                    pontosLng.push(data.results[i].geometry.location.lng);
                }
                console.log(pontosLat)
                console.log(pontosLng)
                //Personalizar Ponto no mapa com a imagem do usuario
                const icon = L.divIcon({
                    className: "pointers",
                    iconAnchor: [0, 24],
                    labelAnchor: [-6, 0],
                    popupAnchor: [0, -36],
                })

                //Adicionando manualmente todas as 'atualizacoes' na rota
                const latlng = [ 
                    //Primeiro endereco(origem)
                    { lat: pontosLat[0], lng: pontosLng[0] },
                    //INDO DO PRIMEIRO ENDEREÇO A RUA JAPAO
                    { lat: -23.670803, lng: -46.657658}, 
                    { lat:  -23.668070, lng: -46.655688 }, 
                    { lat:  -23.667194, lng: -46.654263}, 
                    { lat:  -23.670698, lng: -46.647262}, 
                    { lat:  -23.675061, lng: -46.642625 }, 
                    { lat:  -23.682199, lng: -46.636634 }, 
                    { lat:  -23.684463, lng: -46.632628 }, 
                    { lat:  -23.685264, lng: -46.626689 }, 
                    { lat:  -23.686203, lng:  -46.625865 }, 
                    { lat:  -23.687835, lng: -46.626506 }, 
                    { lat:  -23.689132, lng: -46.626088 }, 
                    { lat:  -23.691134, lng: -46.627757}, 
                    { lat:  -23.694315, lng: -46.628694}, 
                    
                    //MUDAR DAQ PARA CIMA 
                    //RUA JAPAO---
                    {  lat: -23.696230, lng: -46.628881 },
                    {  lat: -23.697620, lng: -46.627797 },
                    {  lat: -23.701175, lng: -46.627159  },
                    {  lat:  -23.702176, lng: -46.626248 },
                    {  lat:  -23.702350, lng:  -46.624701},
                    {  lat:  -23.703706, lng:  -46.625388},
                    {  lat:  -23.704752, lng: -46.624508 },
                    {  lat:  -23.705352, lng:  -46.621332},
                    {  lat: -23.704875, lng:  -46.617163 },
                    {  lat:  -23.704367, lng:  -46.616821},
                    //Chegando no segundo endereco
                    { lat: -23.7028682, lng: -46.6161837 },
                    //Segundo endereco
                    { lat: pontosLat[1], lng: pontosLng[1] },
                    //MUDANDO DO SEGUNDO ENDEREÇO ATÉ CHEGAR NO TERCEIRO ENDEREÇO
                    { lat: -23.701290, lng: -46.615393 },
                    { lat: -23.700484, lng: -46.614600 },
                    { lat: -23.699703, lng: -46.613094 },
                    { lat: -23.699419, lng: -46.611519},
                    { lat: -23.698943, lng: -46.608557 },
                    { lat: -23.700074, lng: -46.607918  },
                    { lat: -23.700566, lng: -46.607264 },
                    { lat: -23.701233,  lng: -46.606329},
                    { lat: -23.702150, lng: -46.605155},
                    { lat: -23.703218, lng: -46.604791 },
                    { lat: -23.704225, lng:-46.605138  },
                    //Terceiro endereco
                    { lat: pontosLat[2], lng: pontosLng[2] },
                    //Indo do terceiro endereço até o quarto
                    //{ lat: -23.702075, lng: -46.605247},
                    { lat: -23.701019, lng: -46.605123},
                    //Chegou no quarto endereço
                    { lat: pontosLat[4], lng: pontosLng[4] }, 
                    //INDO PARA A FACULDADE(destino final)
                    { lat: -23.699117, lng: -46.608328 },
                    //{ lat: -23.695747, lng: -46.607165},
                    { lat: -23.690687, lng:-46.603532  },
                    { lat: -23.688665, lng: -46.600973},
                    { lat: -23.685277, lng: -46.600272 },
                    { lat: -23.686096, lng: -46.603252},
                    { lat: -23.686016, lng: -46.606390},
                    { lat: -23.684683, lng: -46.604917 },
                    { lat: -23.683818, lng: -46.608151},
                    { lat: -23.684974, lng: -46.614322},
                    { lat: -23.682084, lng: -46.617401},
                    { lat: -23.679101, lng: -46.614486},
                    { lat: -23.676816, lng: -46.617612 },
                    { lat: -23.675878, lng: -46.620632},
                    { lat: -23.673882, lng: -46.621236},
                    { lat: pontosLat[5], lng: pontosLng[5]}
                    ]
                //Identifica a melhor rota para realizar a viagem
                const coordInicio = [ pontosLat[0], pontosLng[0] ]
                const marker = L.marker(coordInicio, { icon: taxiIcon }).addTo(map);
                L.Routing.control({
                    waypoints: [
                        //Primeiro endereco(origem)
                        L.latLng(pontosLat[0], pontosLng[0]),
                        //Segundo endereco(Estrada do rufino 1045)
                        L.latLng(pontosLat[1], pontosLng[1]),
                        //Terceiro endereco(Rua porfilio Martins 165)
                        L.latLng(pontosLat[2], pontosLng[2]),
                        //Quarto endereco(Rua Ana Maria 166)
                        L.latLng(pontosLat[4], pontosLng[4]),
                        //Ultimo endereco(Fatec Diadema)
                        L.latLng(pontosLat[5], pontosLng[5]),
                    ]
                }).on('routesfound', function(e){
                    //Looping de coordenadas. Simula o táxi enviando a localização para o APP
                    latlng.forEach(function (coord, index){
                        setTimeout(function(){
                            marker.setLatLng([coord.lat, coord.lng]);
                            //Identifica o final da viagem
                            if(coord.lat === pontosLat[5] && coord.lng === pontosLng[5]){
                                //Chamando o modal para finalizar a corrida
                                const comecarCorrida = document.getElementsByClassName('comecar-corrida')[0]
                                alert("Corrida finalizada com sucesso! Agradecemos a preferência!");
                                animacaoSumir(comecarCorrida)
                            }
                        }, 1000 * index)
                    })
                }).addTo(map)
                    }
                });
    }
    comecarServico()  
}

//Animacoes via JS
const animacaoPopup = (div) =>{
    div.style.display = "flex";
    setTimeout(() =>{
        div.style.opacity = '1';
    }, 200)
}

const animacaoSumir = (div) =>{
    div.style.opacity = '0'
    setTimeout(() =>{
        div.style.display = 'none';
    }, 500)
}

//Criando um cronômetro de 5 minutos
var tempo = 1000; //quantos milésimos valem 1 segundo
var minutos = 0;
var segundos = 0;
var cron;
function timer(){
    var formato = minutos + ':' + (segundos < 60 ? '0' + segundos : segundos);
    const cronometroCorrida = document.getElementsByClassName('cronometro-corrida');
    //Formatando para o padrão de minutos e segundos

    segundos++;
        if(segundos == 60){
            segundos = 0;
            minutos++;
        }
    //Imprimindo no HTML
    cronometroCorrida[0].innerText = formato;
}

//animacao fechar modal
const fecharModal = (modal) =>{
    const carregandoCorrida = document.getElementsByClassName('carregando-corrida')[0];
    const solicitarCorrida = document.getElementsByClassName('solicitar-corrida')[0];
    if(modal == "carregandoCorrida"){
        animacaoSumir(carregandoCorrida);
    }else if(modal == "solicitarCorrida"){
        animacaoSumir(solicitarCorrida)
    }
}
onMounted(() =>{
    verificaLogado();
    criandoMapa();
    posicaoUsuario();
})
</script>

<style scoped>
section{
    padding: 2rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 1rem;
}

input{
    width: 30vw;
    max-width: 300px;
    border-radius: 10px;
    background-color: #E9E9E9;
    height: 40px;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
    padding: 0 .8rem;
}

.container-pagamento{
    flex-direction: column;
    align-items: center;
}

form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: .5rem;
}

.container-pagamento select{
    width: 30vw;
    max-width: 300px;
    border-radius: 10px;
    background-color: #E9E9E9;
    height: 40px;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border: 1px solid #3158C4;
    padding: 0 .8rem;
}

.container-pagamento select:hover{
    cursor: pointer;
}

/*POPUP carregando corrida e etc*/
.carregando-corrida, .aceitar-corrida, .solicitar-corrida, .comecar-corrida, .acompanhar-corrida{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.carregando-corrida, .aceitar-corrida, .solicitar-corrida, .comecar-corrida, .acompanhar-corrida{
    opacity: 0;
    display: none;
    padding: 1.5rem;
    background: #FFF;
    transition: all 500ms;
    position: absolute;
    width: 100%;
    max-width: 600px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    height: 500px;
    flex-direction: column;
}

.comecar-corrida{
    row-gap: 1rem;
}

.aceitar-corrida{
    z-index: 1;
}

.solicitar-corrida{
    justify-content: start;
}

.solicitar-corrida .form-botao{
    margin-top: 1rem;
}

.form-botao{
    color: #FFF;
    font-size: 16px;
    background-color: #9EC6F2;
    border: 1px solid #3158C4;
    -webkit-box-shadow: 0 0 8px #3158C4;
    box-shadow: 0 0 8px #3158C4;
    border-radius: 20px;
    padding: .7rem 7rem;
    transition: all ease-in-out .5s;
    text-shadow: 0px 10px 6px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(1.5px 1.5px 2px rgba(0, 0, 0, .35));
    max-width: 350px;
}

.form-botao:hover{
    cursor: pointer;
    transform: translateY(-10px);
}

.container-pagamento .form-botao{
    margin-top: 1.5rem;
}

.solicitar-corrida{
    align-items: center;
}

.fechar-modal{
    align-self: end;
}

.cronometro-corrida{
    color: #000;
}

.carregando{
    border: 16px solid #C2C2C2;
    border-top: 16px solid #3498DB;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: giro 2s linear infinite;
}

.titulo-motorista{
    font-size: 36px;
    color: #000;
}

.corrida-info{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 45px;
}

.nome-motorista, .carro-motorista, .tempo-corrida{
    border-right: 1px solid #C2C2C2;
    padding: 0 .8rem 0 .8rem;
    text-align: center;
}

.img-motorista{
    width: 200px;
    height: auto;
    border-radius: 50%;
    margin: 0 auto;
}

.container-info-motorista{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.distancia-corrida{
    padding-left: .8rem;
}

@keyframes giro{
    0%{
        transform: rotate(0);
    }100%{
        transform: rotate(360deg);
    }
}

#map-aceitar, #map-comecar, #map-acompanhar{
    width: 500px;
    height: 500px;
}

.comecar-corrida{
    opacity: 0;
    display: none;
}

</style>