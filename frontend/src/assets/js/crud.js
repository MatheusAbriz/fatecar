// função local 
function local() {
    let dados = [
        {
            nomePassageiro: "Alan", emailPassageiro: "alanzin@hotmail.com", senhaPassageiro: "12343", cpfPassageiro: "3234434",
            enderecoPassageiro: "Rua Alves", complementoPassageiro: "433", estadoPassageiro: "Sp", cidadePassageiro: "SBC", 
            telefonePassageiro: "3234454", tipoCliente: "0"
        },
        {
            nomeMotorista: "Alan", emailMotorista: "alanzin@hotmail.com", senhaMotorista: "12343", cpfMotorista: "3234434",
            enderecoMotorista: "Rua Alves", complementoMotorista: "433", estadoMotorista: "Sp", cidadeMotorista: "SBC", 
            telefoneMotorista: "3234454", tipoCliente: "1"
        }
    ];
    let n = JSON.stringify(dados);
    localStorage.setItem("tds", n);
    return dados
}


//função adicionar
function cadastrarPassageiro() {
    var ClienteArray = JSON.parse(localStorage.getItem("tds"));
    let nome = document.getElementById("nome").value 
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value  
    let cpf = document.getElementById("cpf").value 
    let endereco = document.getElementById("endereco").value 
    let complemento = document.getElementById("complemento").value 
    let estado = document.getElementById("estado").value 
    let cidade = document.getElementById("cidade").value 
    let telefone = document.getElementById("telefone").value 
    let tipoCliente = document.getElementById("tipoCliente").value

    let usuario = { 
        id: Date.now(), nome: nome, email: email, senha: senha, cpf: cpf,
        endereco: endereco, complemento: complemento, estado: estado, cidade: cidade,
        telefone: telefone, tipoCliente: tipoCliente
    }
    ClienteArray.push(usuario);
    localStorage.setItem("tds", JSON.stringify(ClienteArray));
    alert("Registro adicionado")
}



//Função para definir o objeto da máscara
function mascara(o, f){
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

//Função que executará a máscara
function execmascara(){
    v_obj.value = v_fun(v_obj.value)
}

//Máscara para o telefone
function mascaraTelefone(t){
    t = t.replace(/\D/g, ""); //Remove tudo o que não é dígito
    t = t.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    t = t.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return t
}

//Máscara para CPF
function mascaraCPF(c){
    c = c.replace(/\D/g, ""); //Remove tudo que não é número    
    c = c.replace(/^(\d{3})/g, "$1."); //Adiciona ponto após os 3 primeiros dígitos
    c = c.replace(/(\d{3})(\d{3})/g, "$1.$2-"); //Adiciona o ponto após os outros 3 dígitos e o hífen antes dos últimos dois números
    return c;
}
