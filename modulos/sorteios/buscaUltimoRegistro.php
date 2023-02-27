<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega();

    $coluna = 'concurso';

    $result = $st->buscaUltimoRegistro($coluna);

    echo $result;
?>