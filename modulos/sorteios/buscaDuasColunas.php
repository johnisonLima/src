<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega;

    $coluna1    = 'primeiraDezena';
    $coluna2    = 'sextaDezena';
    // $valor1     = $_POST['valor1'];
    // $valor2     = $_POST['valor2'];
    $valor1     = 19;
    $valor2     = 56;

    if(isset($valor1) == ''){
        $result = $st->buscaColuna($coluna2, $valor2);
    }
    else if(isset($valor2) == ''){
        $result = $st->buscaColuna($coluna1, $valor1);
    }
    else{
        $result = $st->buscaDuasColunas($coluna1, $coluna2, $valor1, $valor2);
    }  

    echo $result;
?>