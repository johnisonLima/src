<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega;

    $valorProcurado = 25;

    $ressult = $st->busca(
        'primeiraDezena', 
        'segundaDezena', 
        'terceiraDezena', 
        'quartaDezena', 
        'quintaDezena', 
        'sextaDezena', 
        $valorProcurado
    );

    echo $ressult;
?>