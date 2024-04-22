$(document).ready(function(){
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    var isRecognitionActive = false;

    var instrucoes = $("#instructions");
    var fale = $("#pronuncie");
    var pontuacao = $("#score");
    var textbox = $("#textbox");
    var content = '';
    var alimentacaoFacil = ["arroz", "aveia", "banana", "carne", "chá", "couve", "leite", "maçã", "mel", "milho", "ovo", "pão", "peixe", "sal", "tomate"];

    var lista;
    var pontos = 0;

    // Sintese de voz
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 a 1
    msg.rate = 5; // 0.1 a 10
    msg.pitch = 2; // 0 a 2
    msg.lang = 'pt-BR';

    recognition.continuous = false;
    recognition.lang = "pt-br";
    recognition.interimResults = false;

    //nake parameters
    const playBoard = document.querySelector(".play-board");
    let foodX = 13, foodY = 10;
    let snakeX = 13, snakeY = 10;
    let velX = 0, velY = 0;
    let snakeBody = [];
    let gamePaused = false;

    msg.onend = function(e) {
        if (isRecognitionActive) {
            console.log("Reconhecimento já está ativo, não é possível iniciar novamente.");
            return; // Evita iniciar o reconhecimento se já estiver ativo
        } else {
            recognition.start(); // o reconhecimento é iniciado quando a pronúncia termina, se ja não tiver sido iniciado
            console.log("reconhecimento iniciado");
        }
    };

    // Struct palavra
    var filaPalavras = [];

    function ordenaPalavras(alimentacaoFacil) {
        lista = alimentacaoFacil.slice().sort(() => Math.random() - 0.5); // randomiza as palavras        
        // preencher a lista
        lista.forEach(function(value){
            var palavra = {palavra: value, vidas: 3, tentativas: 0};
            filaPalavras.push(palavra);            
        });
        console.log(filaPalavras);
    }

    ordenaPalavras(alimentacaoFacil); // ordenação automática

    function falaPalavra(){
        console.log("Fale: " + filaPalavras[0].palavra)
        fale.text("Fale: " + filaPalavras[0].palavra); // mostra a palavra a ser falada
        msg.text = "Fale " + filaPalavras[0].palavra; // adicione o texto que vai ser falado
        speechSynthesis.speak(msg); // fala o texto
    }

    recognition.onstart = function() {
        console.log("Reconhecimento por voz iniciado");
        instrucoes.text("Reconhecimento por voz iniciado");
        isRecognitionActive = true;
    };

    recognition.onend=function(){
        console.log("Fim do reconhecimento");
        isRecognitionActive=false;
    }

    recognition.onresult = function(event) {
        console.log("Processando resultados...");
        var resultado = event.resultIndex;
        var transcript = event.results[resultado][0].transcript;
        var palavras = transcript.toLowerCase();
        palavras = palavras.replace(/\./g, '');
        palavras = palavras.split(' '); // divide a transcrição

        console.log(palavras); 
        // verifica se o resultado é final
        if(event.results[resultado].isFinal){
            // verificar se isso está tratando o resultado
            console.log("Palavra falada: " + textbox.val());
            console.log("Palavra na lista: " + filaPalavras[0].palavra);

            if (palavras[0] == filaPalavras[0].palavra){
               pronunciaCerta();
            } else {
               pronunciaErrada();
            }
        }
    };

    function pronunciaCerta(){
        console.log("Você acertou!");        
        switch(filaPalavras[0].vidas){
           case 3:
             pontos +=100;
             console.log("Vc ganhou 100 pontos!");
             break;
           case 2:
            pontos +=50;
            console.log("Vc ganhou 50 pontos!");
            break;
           case 3:
                pontos +=30;
                console.log("Vc ganhou 30 pontos!");
                break;
            case 0:
            pontos +=10;
            console.log("Vc ganhou 10 pontos!");
            break;   
        }
        pontuacao.text("Pontos: "+pontos);   // atualiza os pontos
        filaPalavras.splice(0,1); // remover a palavra da lista
        console.log(filaPalavras); // lista atualizada
        textbox.val(" ");
        // falaPalavra();
        // nova lista mostrada como sucesso
    }

    function pronunciaErrada(){
        if(filaPalavras[0].vidas>0){
            filaPalavras[0].vidas--;
            console.log("Tente novamente! Você tem "+filaPalavras[0].vidas+" Tentativas restantes");
            // falaPalavra();
        }else{
            console.log("Você não tem mais vidas, Vamos continuar!")
            // move o primeiro elemento para a última posição
            filaPalavras.push(filaPalavras.shift());
            console.log(filaPalavras); // lista atualizada

            // falaPalavra();
        }
    }

    $("#start-btn").click(function(event) {
        event.preventDefault(); // evita o reload
        falaPalavra();
    });

    $("#synt-btn").click(function(event){
        event.preventDefault();
        recognition.stop(); // interrompe o reconhecimento
        console.log("Botão de reprodução foi clicado");
        isRecognitionActive=false;
        falaPalavra();      // fala a palavra, vai reiniciar a recognition

    }); 

    recognition.onerror = function(event) {
        console.log("Error: " + event.error);
        if (event.message) {
            console.log("Error Details: " + event.message);
        }
        isRecognitionActive = false;
    };

    ////////////////////////////////////////////////////////////////////////////////////////

    const changeFoodPosition = () => {
        foodX = Math.floor(Math.random() * 30) + 1; /* 30 é o número de linhas e colunas */
        foodY = Math.floor(Math.random() * 30) + 1;
    }

    const changeDirection = (e) => { // altera a velocidade
        if (e.key === "ArrowUp") {
            velX = 0;
            velY = -1;
        } else if (e.key === "ArrowDown") {
            velX = 0;
            velY = 1;
        } else if (e.key === "ArrowLeft") {
            velX = -1;
            velY = 0;
        } else if (e.key === "ArrowRight") {
            velX = 1;
            velY = 0;
        }
        initGame();
    }

    const togglePause = () =>{
        gamePaused = !gamePaused;
        if (gamePaused) {
            console.log("Game Paused");
        } else {
            console.log("Game Resumed");
            // Resume the game loop
            initGame();
        }
    }

    const initGame = () => {
        let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

        if (snakeX === foodX && snakeY === foodY) {
            changeFoodPosition();
            snakeBody.push([foodX, foodY]); // create more snake body
            // event.preventDefault(); // evita o reload
            falaPalavra();
        }
        
        if (snakeX > 30) snakeX = 1;
        if (snakeX < 1) snakeX = 30;
        if (snakeY > 30) snakeY = 1;
        if (snakeY < 1) snakeY = 30;
    
        for (let index = snakeBody.length - 1; index > 0; index--) {
            snakeBody[index] = snakeBody[index - 1];
        }
    
        // the first element should be aways the head
        snakeBody[0] = [snakeX, snakeY];
    
        // a velocidade deve alterar a cabeça da cobra
        snakeX += velX;
        snakeY += velY;
    
        for (let i = 0; i < snakeBody.length; i++) {
            htmlMarkup += `<div class="food" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        }
    
        playBoard.innerHTML = htmlMarkup;
    }

    changeFoodPosition();
    setInterval(initGame, 125); // velocidade da cobra;
    document.addEventListener("keydown", changeDirection);
});
