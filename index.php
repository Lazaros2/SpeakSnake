<?php

include('conexao.php');


if(isset($_POST['nome'])){

    if(strlen($_POST['nome'])==0){
        echo "<script>alert('Digite seu nome');</script>";
    }else{
        $nome = $mysqli->real_escape_string($_POST['nome']);
    }

    $sql_code = "SELECT * FROM ssusers WHERE nome ='$nome'";
    $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código:".$mysqli->error );

    $quantidade=$sql_query->num_rows;

    if($quantidade == 1){
        $usuario=$sql_query->fetch_assoc();

        if(!isset($_SESSION)){    
            session_start();
        }
         
        $_SESSION['ID']=$usuario['ID'];
        $_SESSION['nome']=$usuario['nome'];
        header("Location:selecao.php");
        //echo "<script>window.location.href='selecao.php';</script>"; //muda página se o login funcionar
    }else{
        echo "<script>alert('Falha ao logar');</script>";
    }

}
?>

<!DOCTYPE html>
<html lang="pt" dir="auto">
<head>
    <meta charset="utf-8">
    <title>SpeakSnake</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <div class="mEscuro" id="mEscuro">
        <div class="mLogin" id="mLogin">
            <a href="https://ibb.co/S6m2MVZ">
                <img src="https://i.ibb.co/hgdk42T/Design-sem-nome-1.png" alt="Design-sem-nome-1" width="300" height="300">
            </a>
            <form method="post" name="loginForm" id="loginForm">
                <h3>Escreva seu nome completo</h3>
                <input type="text" name="nome" placeholder="Nome">
                <button type="submit" class="Login" id="Login">Entrar</button>
                <br>
            </form>
            <button class="registerBtn" id="registerBtn" onclick="redirectToRegister()">Cadastrar</button>
        </div>
    </div>
</body>
<script>
    function redirectToSelectionPage() {
        window.location.href = "selecao.php";
    }
    function redirectToRegister() {
        window.location.href = "register.php";
    }
    
</script>
</html>
