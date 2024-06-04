<!DOCTYPE html>
<html lang="pt" dir="auto">
<head>
    <meta charset="utf-8">
    <title>SpeakSnake</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <style>
       :root {
    --primary-color: #2db12d;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
}

.radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 20px;
}

.input-container {
  position: relative;
  height: 10vh;
  width: 25vh; /* Increase the width here */
  max-width: 150px;
  max-height: 150px;
  min-width: 100px;
  min-height: 100px;
  margin: 0.5rem;
}

.input-container input {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
}

.input-container .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 2px solid var(--primary-color);
    border-radius: 8px;
    transition: all 300ms ease;
    text-align: center;
    flex: 1;
}

.radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  transition: all 300ms ease;
  text-align: center;
  width: 180px; /* Increase width here */
}

.input-container .material-icons {
    color: var(--primary-color);
    font-size: 3rem;
}

.input-container label {
    color: var(--primary-color);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

input:checked + .radio-tile {
    background-color: var(--primary-color);
    box-shadow: 0 0 12px var(--primary-color);
    transform: scale(1.1);
}

input:hover + .radio-tile {
    box-shadow: 0 0 12px var(--primary-color);
}

input:checked + .radio-tile .material-icons,
input:checked + .radio-tile label {
    color: white;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: darkgreen;
}

    </style>
</head>
<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <div class="mEscuro" id="mEscuro">
        <div class="mSelecao" id="mSelecao">
            <a href="https://ibb.co/S6m2MVZ">
                <img src="https://i.ibb.co/hgdk42T/Design-sem-nome-1.png" alt="Design-sem-nome-1" width="200" height="200">
            </a>

            <h3>Dificuldade</h3>
            <div class="container">
                <!-- Grupo de Opções de Dificuldade -->
                <div class="radio-tile-group">
                    <div class="input-container">
                        <input id="facilBtn" type="radio" name="radios" value="true" checked>
                        <div class="radio-tile">
                        <i class="material-icons">local_florist</i>
                        <label for="facilBtn">Fácil</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input id="dificilBtn" type="radio" name="radios" value="false">
                        <div class="radio-tile">
                        <i class="material-icons">waves</i> 
                            <label for="dificilBtn">Difícil</label>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Tema</h3>
            <div class="container">
                <!-- Grupo de Opções de Tema -->
                <div class="radio-tile-group">
                    <div class="input-container">
                        <input type="radio" id="Sustentabilidade" name="radios2" value="1" checked>
                        <div class="radio-tile">
                           <i class="material-icons">eco</i> 
                            <label for="Sustentabilidade">Sustentabilidade</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="radio" id="EducacaoFinanceira" name="radios2" value="2">
                        <div class="radio-tile">
                        <i class="material-icons">attach_money</i> 
                            <label for="EducacaoFinanceira">Educação Financeira</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="radio" id="AlimentacaoSaudavel" name="radios2" value="3">
                        <div class="radio-tile">
                        <i class="material-icons">water_drop</i> 
                            <label for="AlimentacaoSaudavel">Alimentação Saudável</label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="boardBtn" id="boardBtn" onclick="redirectToPlayPage()">JOGAR</button>
            <br>
            <button class="returnBtn1" id="returnBtn1" onclick="logout()">Trocar Usuário</button>
        </div>
    </div>
</body>
<script>
    const alimentFacil = ["arroz", "aveia", "banana", "carne", "chá", "couve", "leite", "maçã", "mel", "milho", "ovo", "pão", "peixe", "sal", "tomate"];
    const alimentDificil = ["abacaxi", "açaí", "acerola", "amêndoa", "brócolis", "camarão", "espinafre", "guaraná", "jabuticaba", "lentilha", "pinhão", "pitaia", "quiabo", "romã", "rúcula"];
    const sustFacil = ["água", "alimento", "chuva", "coleta", "doar", "energia", "eólica", "luz", "metal", "papel", "plástico", "recurso", "seletiva", "solar", "vidro"];
    const sustDificil = ["agricultura", "alimentação", "biocombustível", "compostagem", "econômico", "eletricidade", "híbrido", "insumos ", "orgânico", "reciclável", "reciclagem", "renovável", "responsabilidade", "sustentável", "tecnológico"];
    const financFacil = ["bens", "comprar", "dinheiro", "economia", "gasto", "mercado", "moeda", "ouro", "poupar", "preço", "produto", "renda", "reuso", "valor", "venda"];
    const financDificil = ["cédula", "despesa", "empréstimo", "escambo", "impostos", "investimento", "monetário", "pix", "propaganda", "publicidade", "público", "salário", "serviços", "suprimento", "trabalho"];

    var temaValue = $('input[name="radios2"]:checked').val() || '1';
    var dificuldadeValue = $('input[name="radios"]:checked').val() || 'true';
    var imgFolder="SF";
    var filaPalavras=sustFacil;

    $('input[type="radio"]').on('change',function(){

        temaValue = $('input[name="radios2"]:checked').val();
        dificuldadeValue = $('input[name="radios"]:checked').val();
        console.log("Tema selecionado:", temaValue);
        console.log("Dificuldade selecionada:", dificuldadeValue);
        console.log("Pasta Selecionada:",imgFolder);

        if (temaValue === '3' && dificuldadeValue === 'true') {
            filaPalavras = alimentFacil;
            imgFolder = "AF";
        } else if (temaValue === '3' && dificuldadeValue === 'false') {
            filaPalavras = alimentDificil;
            imgFolder = "AD";
        } else if (temaValue === '1' && dificuldadeValue === 'true') {
            filaPalavras = sustFacil;
            imgFolder = "SF";
        } else if (temaValue === '1' && dificuldadeValue === 'false') {
            filaPalavras = sustDificil;
            imgFolder = "SD";
        } else if (temaValue === '2' && dificuldadeValue === 'true') {
            filaPalavras = financFacil;
            imgFolder = "FF";
        } else if (temaValue === '2' && dificuldadeValue === 'false') {
            filaPalavras = financDificil;
            imgFolder = "FD";
        }
    });

    function redirectToPlayPage() {
        //printa a lista
        console.log("Tema selecionado:", temaValue);
        console.log("Dificuldade selecionada:", dificuldadeValue);
        console.log("Pasta Selecionada:",imgFolder);

        //crie os cookies

        document.cookie = `imgFolder=${imgFolder}; path=/`;
        document.cookie = `filaPalavras=${JSON.stringify(filaPalavras)}; path=/`;
        document.cookie= `dificuldadeValue=${dificuldadeValue}; path=/`;

        //navega pra proxima page
        window.location.href = "game.php";
    }

    function logout() {
        // Redirecionar para a página de logout
        window.location.href = "logout.php";
    }
</script>
</html>
