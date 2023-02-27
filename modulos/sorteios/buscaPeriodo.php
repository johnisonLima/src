<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega();
    
    $colunaMaster   = 'concurso';
    $coluna1        = 'primeiraDezena';
    $coluna2        = 'segundaDezena';
    $coluna3        = 'terceiraDezena';
    $coluna4        = 'quartaDezena';
    $coluna5        = 'quintaDezena';
    $coluna6        = 'sextaDezena';
    // $valorProcurado = $_POST['valor'];
    // $valorMax       = $_POST['maximun_range'];
    // $valorMin       = $_POST['minimun_range'];
    $valorProcurado = 20;
    $valorMax       = 2200;
    $valorMin       = 2251;

    $result = $st->buscaPeriodo($colunaMaster, $coluna1, $coluna2, $coluna3, $coluna4, $coluna5, $coluna6, $valorProcurado, $valorMax, $valorMin);

    echo $result;
?>