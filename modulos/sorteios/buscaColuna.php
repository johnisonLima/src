<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega();

    $coluna = 'concurso';
    $valor  = 2051;

    $result = $st->buscaColuna($coluna, $valor);

    echo $result;
?>