<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega();

    $coluna = 'concurso';

    $result = $st->buscaPrimeiroRegistro($coluna);

    echo $result;
?>