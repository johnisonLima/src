<?php 
    require_once('sorteiosMega.php');

    $st = new sorteiosMega;

    // $numero     = $_POST['numero'];
    $coluna     = 'concurso';
    // $valorMin   = $_POST['minimum_range'];
    // $valorMax   = $_POST['maximum_range'];

    echo $st->selecionaPeriodo($coluna, 2550, 2561);
?>