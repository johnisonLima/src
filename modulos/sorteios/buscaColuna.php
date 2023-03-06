<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega();

    // $coluna = 'concurso';
    // $valor  = 2561;

    $coluna = $_POST['concurso'];
    $valor  = $_POST['valor'];

    $result = $st->buscaColuna($coluna, $valor);

    echo $result;
?>