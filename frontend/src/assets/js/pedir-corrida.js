
    //Criando um cronômetro de 5 minutos
    var tempo = 1000; //quantos milésimos valem 1 segundo
    var minutos = 0;
    var segundos = 0;
    var cron;
//Criando uma função para solitar a corrida. Essa função irá abrir como um modal, e dentro dela mostrará um cronômetro
function solicitarCorrida(){
    const carregandoCorrida = document.getElementById('carregando-corrida');
    var cronometroCorrida = document.getElementsByClassName('cronometro-corrida');

    cron = setInterval(()=>{ timer(); }, tempo);
    //Abrindo o modal
    carregandoCorrida.style.display = 'flex';
    setTimeout(function(){
        carregandoCorrida.style.opacity = '1'
    }, 500)

}


function timer(){
    var formato = minutos + ':' + (segundos < 10 ? '0' + segundos : segundos);
    const cronometroCorrida = document.getElementsByClassName('cronometro-corrida');
    //Formatando para o padrão de minutos e segundos

    segundos++;
        if(segundos == 3){
            segundos = 0;
            minutos++;
            if(minutos == 3){
                alert('Achamos um motorista!');
                clearInterval(cron)
                fecharModal()
            }
        }
    //Imprimindo no HTML
    cronometroCorrida[0].innerText = formato;
    
}

//Funcao para fechar o modal
function fecharModal(tipoModal){
    const secaoCorrida = document.getElementById('solicitar-corrida');
    const carregandoCorrida = document.getElementById('carregando-corrida')

    //0 = cronometro, 1 = modal motorista
    if(tipoModal == 0){
        carregandoCorrida.style.opacity = '0';
        setTimeout(function(){
            carregandoCorrida.style.display = 'none';
            setTimeout(function(){
                secaoCorrida.style.display = 'flex';
                setTimeout(function(){
                    secaoCorrida.style.opacity = '1';
                }, 500)
            }, 200)
        }, 500)
    }else{
        //fechando o modal
        secaoCorrida.style.opacity = '0';
        setTimeout(function(){
            secaoCorrida.style.display = 'none';
        }, 500)
    }
}

//Funcao para aceitar a corrida. Aqui mostrará o motorista indo até o passageiro. Assim que o motorista chegar, irá mudar do destino A(localizacao atual) para o ponto B(fatec em questao). Ao final, finalizar corrida
function aceitarCorrida(){
    const secaoCorrida = document.getElementById('solicitar-corrida');
    const mapaMotorista = document.getElementById('mapa-motorista');

    secaoCorrida.style.opacity = '0';
    setTimeout(function(){
        secaoCorrida.style.display = 'none';
        setTimeout(function(){
            mapaMotorista.style.zIndex = '0';
            setTimeout(function(){
                mapaMotorista.style.opacity = '1';
                setTimeout(function(){
                    startService();
                }, 1000)
            }, 500)
        }, 200)
    }, 500)
}

//funcao de começar a corrida
function comecarCorrida(){
    const acompanharCorrida = document.getElementById('acompanhar-corrida');
    const comecarCorrida = document.getElementById('comecar-corrida');
    comecarCorrida.style.opacity = '0';
    setTimeout(function(){
        comecarCorrida.style.display = 'none';
        setTimeout(function(){
            acompanharCorrida.style.zIndex = '0';
            setTimeout(function(){
                acompanharCorrida.style.opacity = '1';
                comecarServico();
            }, 500)
        }, 200)
    }, 500)
}

//CALCULANDO A ROTA
function calcularRota() {
    var origem = document.getElementById('ruaOrigem').value;
    var destino = document.getElementById('ruaDestino').value;

    var request = {
        origin: origem,
        destination: destino,
        travelMode: 'DRIVING',
    };

    //SE A ROTA ESTIVER CERTA, TRARÁ O RESULTADO
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });

    //CALCULANDO A DISTÂNCIA EM KM
    var origem = document.getElementById('ruaOrigem').value;
    var destino = document.getElementById('ruaDestino').value;
    const rota = {
        origin: origem,
        destination: destino,
        travelMode: 'DRIVING'
    };

    //Adicionando as rotas para calcular
    directionsService.route(rota,
        function (response, status) {
            if (status !== 'OK') {
                window.alert('Direções falharam devido a ' + status);
                return
            } else {
                directionsRenderer.setDirections(response);
            }

            var directionsData = response.routes[0].legs[0];
            if (!directionsData) {
                window.alert('Direcoes falharam');
                return;
            } else {
                document.getElementsByClassName('tempo-corrida')[0].innerHTML = directionsData.duration.text;
                document.getElementsByClassName('distancia-corrida')[0].innerHTML = directionsData.distance.text;
                //Calculando a função afim para descobrir o preço da corrida
                //F(x) = ax + b -> a = 0.5 // x = kms rodados // b = 3
                precoCorrida = ((0.5 * (directionsData.distance.value * 0.001)) + 3).toFixed(2);
                //Limitando a duas casas decimais
                //Imprimindo no HTML
                document.getElementsByClassName('preco-corrida')[0].innerHTML = 'R$ ' + precoCorrida;
            }
        }
    );
}