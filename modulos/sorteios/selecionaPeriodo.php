<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega;

    // $numero     = $_POST['numero'];
    $coluna     = 'concurso';
    $valorMin   = $_POST['min'];
    $valorMax   = $_POST['max'];

    echo $st->selecionaPeriodo($coluna, $valorMin, $valorMax);
?>