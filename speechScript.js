$(document).ready(function(){
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log("SpeechRecognition: ", SpeechRecognition);
    var recognition = new SpeechRecognition();
    var isRecognitionActive = false;
    
    var instrucoes = $("#instructions");
    var fale = $("#pronuncie");
    var pontuacao =$("#pontuacao");
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
    msg.pitch = 2; //0 a 2
    msg.lang = 'pt-BR';

    recognition.continuous = false;
    recognition.lang = "pt-br";
    recognition.interimResults = true;

    msg.onend = function(e) {
        if (isRecognitionActive) {
            console.log("Reconhecimento já está ativo, não é possível iniciar novamente.");
            return; // Evita iniciar o reconhecimento se já estiver ativo
        } else {
            recognition.start();    //o reconhecimento é iniciado quando a pronúncia termina, se ja não tiver sido iniciado
            console.log("reconhecimento iniciado");
        }
    };

    // Struct palavra
    var filaPalavras = [];

    function ordenaPalavras(alimentacaoFacil) {
        lista = alimentacaoFacil.slice().sort(() => Math.random() - 0.5); //randomiza as palavras        
        //preencher a lista
        lista.forEach(function(value){
            var palavra = {palavra: value, vidas: 3, tentativas: 0};
            filaPalavras.push(palavra);            
        });
        console.log(filaPalavras);
    }

    ordenaPalavras(alimentacaoFacil); //ordenação automática

    function falaPalavra(){
        console.log("Fale: " + filaPalavras[0].palavra)
        fale.text("Fale: " + filaPalavras[0].palavra); //mostra a palavra a ser falada
        msg.text = "Fale " + filaPalavras[0].palavra; //adicione o texto que vai ser falado
        speechSynthesis.speak(msg); //fala o texto
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
        palavras = palavras.split(' '); //divide a transcrição

        console.log(palavras[0]); 
        textbox.val(palavras[0]); //pega somente a primeira palavra
        //verifica se o resultado é final
        if(event.results[resultado].isFinal){
            // verificar s eisso ta taravndo o resultado
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
        pontuacao.text("Pontos: "+pontos);   //atualiza os pontos
        filaPalavras.splice(0,1); //remover a palavra da lista
        console.log(filaPalavras); //lista atualizada
        textbox.val(" ");
        //falaPalavra();
        //nova lista mostrada como sucesso
    }

    function pronunciaErrada(){
        if(filaPalavras[0].vidas>0){
            filaPalavras[0].vidas--;
            console.log("Tente novamente! Você tem "+filaPalavras[0].vidas+" Tentativas restantes");
            //falaPalavra();
        }else{
            console.log("Você não tem mais vidas, Vamos continuar!")
            //moveo primeiro elemento para a última posição
            filaPalavras.push(filaPalavras.shift());
            console.log(filaPalavras); //lista atualizada

            //falaPalavra();
        }
    }

    $("#start-btn").click(function(event) {
        event.preventDefault(); //evita o reload
        falaPalavra();
    });

    $("#synt-btn").click(function(event){
        event.preventDefault();
        recognition.stop(); //interrompe o reconhecimento
        console.log("Botão de reprodução foi clicado");
        isRecognitionActive=false;
        falaPalavra();      //fala a palavra, vai reiniciar a recognition
        
    }); 

    recognition.onerror = function(event) {
        console.log("Error: " + event.error);
        if (event.message) {
            console.log("Error Details: " + event.message);
        }
        isRecognitionActive = false;
    };
});
