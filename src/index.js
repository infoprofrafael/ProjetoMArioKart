const player1 = {
    NAME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,

};
const player2 = {
    NAME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,

}

// -------- Função Auto Invoke
// (async function contador() {
//         for(let cont=1; cont<=5; cont++){
//             console.log(`Vamos ${cont} \n
//                 number ${rollDice}`)
//         }    
// })()

// ------- Ação de rolar dados
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) { // ---- Sempre valor Booleano
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result;

}

async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`\n${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`);

}

// Função que recebe parametro
async function playRaceEngine(char1, char2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} `);

        // ----- Sortear um bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

        // -- Rolando o dado
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // -- testando habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + char1.VELOCIDADE
            totalTestSkill2 = diceResult2 + char2.VELOCIDADE

            await logRollResult(char1.NAME, 'velocidade', diceResult1, char1.VELOCIDADE);
            await logRollResult(
                char2.NAME,
                "velocidade",
                diceResult2,
                char2.VELOCIDADE
            );



        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + char1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + char2.MANOBRABILIDADE

            await logRollResult(
                char1.NAME,
                "manobrabilidade",
                diceResult1,
                char1.MANOBRABILIDADE
            );

            await logRollResult(
                char2.NAME,
                "manobrabilidade",
                diceResult2,
                char2.MANOBRABILIDADE
            );



        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + char1.PODER
            let powerResult2 = diceResult2 + char2.PODER

            console.log(`${char1.NAME} confrontou com ${char2.NAME} 🏁`);

            await logRollResult(
                char1.NAME,
                "Poder",
                diceResult1,
                char1.PODER
            );

            await logRollResult(
                char2.NAME,
                "Poder",
                diceResult2,
                char2.PODER
            );

            // --ifs ternários

            //char2.PONTOS -= powerResult1 > powerResult2 && char2.PONTOS >0 ? 1:0;

            if (powerResult1 > powerResult2 && char2.PONTOS > 0) {
                console.log(`${char1.NAME} venceu o confronto! ${char2.NAME} perdeu 1 ponto 🐢`);
                char2.PONTOS--;
            }

            //char1.PONTOS -= powerResult2 > powerResult1 && char1.PONTOS > 0 ? 1:0;

            if (powerResult2 > powerResult1 && char1.PONTOS > 0) {
                console.log(`${char2.NAME} venceu o confronto! ${char1.NAME} perdeu 1 ponto 🐢`);
                char1.PONTOS--;
            }

            console.log(powerResult2 === powerResult1 ? "\nConfronto Empatado! \nNenhum ponto foi perdido!" : "");

        }

        // ----- Verificando o vencedor!
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${char1.NAME} marcou um ponto!`);
            char1.PONTOS++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${char2.NAME} marcou um ponto!`);
            char2.PONTOS++;
        }
        console.log(`${char1.NAME} tem ${char1.PONTOS}`)
        console.log(`${char2.NAME} tem ${char2.PONTOS}`)

        console.log(" --------------------------------------------- ");

    }

}

async function declareWinner(char1,char2) {
    console.log(`Resultado final: `)
    console.log(`${char1.NAME}: ${char1.PONTOS} ponto(s)`)
    console.log(`${char2.NAME}: ${char2.PONTOS} ponto(s)`)
    if(char1.PONTOS>char2.PONTOS){
        console.log(`\n${char1.NAME} venceu a corrida! PARABÉNS!!! 🏆`);
    } else if(char1.PONTOS<char2.PONTOS){
        console.log(`\n${char2.NAME} venceu a corrida! PARABÉNS!!! 🏆`);
    } else{
        console.log("\nA corrida terminou empatado!!!")
    }
}


// ------ Template String (Usamos o acento grave "CRASE") no lugar das aspas, onde podemos passa uma variável
(async function main() {
    console.log(`\n🏁  A corrida entre ${player1.NAME} e ${player2.NAME} esta comecando ...  🏁 🚨\n`);

    // Essa função vai eperar de terminar de executar para fazer outra coisa
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();

// ------- ATÉ AQUI ESTÁ FUNCIONANDO PERFEITAMENTE
// ------- VAMOS INSERIR AGORA A FUNÇÃO playRaceEngine




