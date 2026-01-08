class Player {
    constructor(nome, velocidade, manobrabilidade, poder, pontos) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.manobrabilidade = manobrabilidade;
        this.poder = poder;
        this.pontos = pontos;
    }
}


// O async faz com que a função espere algo específico acontecer para rodar
async function selecionarJogadores(objs) {
    let playersEscolhidos = [Math.floor(Math.random() * objs.length), Math.floor(Math.random() * objs.length)];

    if (playersEscolhidos[0] === playersEscolhidos[1]) {
        return selecionarJogadores(objs); // Tem que retornar, pois se você apenas chamar a função novamente, o valor anterior fica salvo em pilha e pode dar erros como "undefined" ao retornar o valor correto
    }
    return playersEscolhidos;
}

async function girarDado() {
    return Math.floor(Math.random() * 6) + 1; // Número aleatório entre 1 e 6
}

async function roletarPista() {
    const pistas = ["RETA", "CURVA", "CONFRONTO"];
    let posicao = Math.floor(Math.random() * pistas.length);

    return pistas[posicao];
}

async function mostrarLogRolagemDeDados(player1, player2, numDadoP1, numDadoP2, p1Atributo, p2Atributo, nomeAtributo) {
    console.log(`🎲 ${player1.nome} rolou um dado de ${numDadoP1}, fazendo com que: ${player1[nomeAtributo]} + ${numDadoP1} = ${p1Atributo} de ${nomeAtributo}`);
    console.log(`🎲 ${player2.nome} rolou um dado de ${numDadoP2}, fazendo com que: ${player2[nomeAtributo]} + ${numDadoP2} = ${p2Atributo} de ${nomeAtributo}\n`);
}

async function exibirPontuacaoRodada(player1, player2, atributoP1, atributoP2, pista, rodada) {
    if (atributoP1 > atributoP2) {
        if (pista === "CONFRONTO" && player2.pontos > 0) player2.pontos -= 1;
        player1.pontos += 1;
        console.log(`🏅 ${player1.nome} venceu a rodada ${rodada}! Total de pontos: ${player1.pontos} \n`);
    }
    else if (atributoP2 > atributoP1) {
        if (pista === "CONFRONTO" && player1.pontos > 0) player1.pontos -= 1;
        player2.pontos += 1;
        console.log(`🏅 ${player2.nome} venceu a rodada ${rodada}! Total de pontos: ${player2.pontos} \n`);
    }
    else { // Caso empatem
        player1.pontos += 1;
        player2.pontos += 1;
        console.log(`🟡 Empate! Ambos os jogadores pontuaram na rodada ${rodada}! \n`);
    }
    if(rodada === 5) console.log("---------------------------------------------------------\n")
}

async function realizarCorrida(player1, player2) {
    for (let rodada = 1; rodada <= 5; rodada++) {
        let pista = await roletarPista();
        let numDadoP1 = await girarDado();
        let numDadoP2 = await girarDado();

        console.log("---------------------------------------------------------\n")
        console.log(` 🟢 🟡 🔴 RODADA ${rodada} - PISTA: ${pista}\n`);
        
        if (pista === "RETA") {
            const p1VelTotal = player1.velocidade + numDadoP1;
            const p2VelTotal = player2.velocidade + numDadoP2;

            await mostrarLogRolagemDeDados(player1, player2, numDadoP1, numDadoP2, p1VelTotal, p2VelTotal, "velocidade");
            await exibirPontuacaoRodada(player1, player2, p1VelTotal, p2VelTotal, pista, rodada);
        }
        else if (pista === "CURVA") {
            const p1ManobraTotal = player1.manobrabilidade + numDadoP1;
            const p2ManobraTotal = player2.manobrabilidade + numDadoP2;

            await mostrarLogRolagemDeDados(player1, player2, numDadoP1, numDadoP2, p1ManobraTotal, p2ManobraTotal, "manobrabilidade");
            await exibirPontuacaoRodada(player1, player2, p1ManobraTotal, p2ManobraTotal, pista, rodada);
        }
        else {
            const p1PoderTotal = player1.poder + numDadoP1;
            const p2PoderTotal = player2.poder + numDadoP2;

            await mostrarLogRolagemDeDados(player1, player2, numDadoP1, numDadoP2, p1PoderTotal, p2PoderTotal, "poder");
            await exibirPontuacaoRodada(player1, player2, p1PoderTotal, p2PoderTotal, pista, rodada);
        }
    }

    console.log(`\n💎 Pontuação total do player 1 (${player1.nome}): ${player1.pontos} \n💎 Pontuação total do player 2 (${player2.nome}): ${player2.pontos}`);

    const vencedor = player1.pontos > player2.pontos ? `é: ${player1.nome} 🏆! Parabéns!!!` : player2.pontos > player1.pontos ? `é: ${player2.nome} 🏆! Parabéns!!!` : "não é ninguém, pois houve um empate!";
    console.log(`\n===== Então, o vencedor ${vencedor} =====\n`);
}


// Função principal 
// () entre a função e () no final, faz com que a função seja automaticamente chamada, como a main em C, C++, C# e Java
(async function main() {
    const p1 = new Player("Mario", 4, 3, 3, 0);
    const p2 = new Player("Peach", 3, 4, 2, 0);
    const p3 = new Player("Yoshi", 2, 4, 3, 0);
    const p4 = new Player("Bowser", 5, 2, 5, 0);
    const p5 = new Player("Luigi", 3, 4, 4, 0);
    const p6 = new Player("Donkey Kong", 2, 2, 5, 0);

    const objs = [p1, p2, p3, p4, p5, p6];
    let jogadoresSelecionados = await selecionarJogadores(objs); // await para não retornar a Promise

    console.log(`\n🏁🚦 Corrida entre ${objs[jogadoresSelecionados[0]].nome} e ${objs[jogadoresSelecionados[1]].nome} começando... \n`);

    await realizarCorrida(objs[jogadoresSelecionados[0]], objs[jogadoresSelecionados[1]]);

    console.log("\n✋ Fim da corrida! 🤚\n");
})();

