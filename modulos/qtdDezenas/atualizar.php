<?php 
    require_once('qtdDezenasMega.php');

    $qtd = new qtdDezenasMega;

    $qtdDezenas = $_POST['radioQtdNum'];

    $cadastrado = $qtd->atualizar($qtdDezenas);

    if($cadastrado){
        echo "atualizado";
    }
    else{
        echo "erro";
    }

?>