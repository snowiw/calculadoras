function trocarAba(id, botao) {
    let cards = document.querySelectorAll(".card");
    let abas = document.querySelectorAll(".aba");

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("ativo");
    }

    for (let i = 0; i < abas.length; i++) {
        abas[i].classList.remove("ativa");
    }

    document.getElementById(id).classList.add("ativo");
    botao.classList.add("ativa");
}

function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcularIMC() {
    let peso = parseFloat(document.getElementById("imcPeso").value);
    let altura = parseFloat(document.getElementById("imcAltura").value);
    let resultado = document.getElementById("resultadoIMC");

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultado.innerHTML = "<p class='erro'>Preencha peso e altura corretamente.</p>";
        return;
    }

    let imc = peso / (altura * altura);
    let classificacao;
    let cor;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        cor = "azul";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        cor = "verde";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        cor = "amarelo";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        cor = "laranja";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        cor = "vermelho";
    } else {
        classificacao = "Obesidade grau III";
        cor = "vermelho";
    }

    resultado.innerHTML =
        "<div class='destaque'>" +
        "<p class='legenda'>Seu IMC é</p>" +
        "<p class='valor'>" + imc.toFixed(2) + "</p>" +
        "<span class='etiqueta " + cor + "'>" + classificacao + "</span>" +
        "</div>";
}

function calcularTMB() {
    let sexo = document.getElementById("tmbSexo").value;
    let peso = parseFloat(document.getElementById("tmbPeso").value);
    let altura = parseFloat(document.getElementById("tmbAltura").value);
    let idade = parseInt(document.getElementById("tmbIdade").value);
    let resultado = document.getElementById("resultadoTMB");

    if (isNaN(peso) || isNaN(altura) || isNaN(idade) || peso <= 0 || altura <= 0 || idade <= 0) {
        resultado.innerHTML = "<p class='erro'>Preencha todos os campos corretamente.</p>";
        return;
    }

    let tmb;

    if (sexo === "masculino") {
        tmb = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.75 * idade);
    } else {
        tmb = 655.1 + (9.563 * peso) + (1.850 * altura) - (4.676 * idade);
    }

    resultado.innerHTML =
        "<div class='destaque'>" +
        "<p class='legenda'>Sua taxa metabólica basal é</p>" +
        "<p class='valor'>" + tmb.toFixed(0) + " kcal</p>" +
        "<p class='legenda'>por dia, em repouso</p>" +
        "</div>";
}

function calcularINSS(salario) {
    let inss = 0;

    if (salario > 8475.55) {
        salario = 8475.55;
    }

    if (salario <= 1621.00) {
        inss = salario * 0.075;
    } else if (salario <= 2902.84) {
        inss = 1621.00 * 0.075 + (salario - 1621.00) * 0.09;
    } else if (salario <= 4354.27) {
        inss = 1621.00 * 0.075 + (2902.84 - 1621.00) * 0.09 + (salario - 2902.84) * 0.12;
    } else {
        inss = 1621.00 * 0.075 + (2902.84 - 1621.00) * 0.09 + (4354.27 - 2902.84) * 0.12 + (salario - 4354.27) * 0.14;
    }

    return inss;
}

function calcularIRRF(base) {
    let irrf = 0;

    if (base <= 2428.80) {
        irrf = 0;
    } else if (base <= 2826.65) {
        irrf = base * 0.075 - 182.16;
    } else if (base <= 3751.05) {
        irrf = base * 0.15 - 394.16;
    } else if (base <= 4664.68) {
        irrf = base * 0.225 - 675.49;
    } else {
        irrf = base * 0.275 - 908.73;
    }

    if (irrf < 0) {
        irrf = 0;
    }

    return irrf;
}

function calcularRedutor(bruto) {
    let redutor = 0;

    if (bruto <= 7350) {
        redutor = 978.62 - (0.133145 * bruto);
    }

    return redutor;
}

function calcularSalario() {
    let bruto = parseFloat(document.getElementById("salarioBruto").value);
    let dependentes = parseInt(document.getElementById("dependentes").value) || 0;
    let outros = parseFloat(document.getElementById("outrosDescontos").value) || 0;
    let resultado = document.getElementById("resultadoSalario");

    if (isNaN(bruto) || bruto <= 0) {
        resultado.innerHTML = "<p class='erro'>Digite um salário bruto válido.</p>";
        return;
    }

    let inss = calcularINSS(bruto);
    let baseIR = bruto - inss - (dependentes * 189.59);
    let irrf = 0;

    if (bruto > 5000) {
        irrf = calcularIRRF(baseIR) - calcularRedutor(bruto);

        if (irrf < 0) {
            irrf = 0;
        }
    }

    let liquido = bruto - inss - irrf - outros;

    resultado.innerHTML =
        "<div class='destaque'>" +
        "<p class='legenda'>Seu salário líquido é</p>" +
        "<p class='valor'>" + formatarDinheiro(liquido) + "</p>" +
        "</div>" +
        "<table class='tabela'>" +
        "<tr><td>Salário bruto</td><td>" + formatarDinheiro(bruto) + "</td></tr>" +
        "<tr><td>INSS</td><td class='desconto'>- " + formatarDinheiro(inss) + "</td></tr>" +
        "<tr><td>IRRF</td><td class='desconto'>- " + formatarDinheiro(irrf) + "</td></tr>" +
        "<tr><td>Outros descontos</td><td class='desconto'>- " + formatarDinheiro(outros) + "</td></tr>" +
        "</table>";
}
