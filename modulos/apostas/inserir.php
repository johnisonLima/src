<?php
    require_once('apostasMega.php');

    $ap = new apostasMega;

    $concurso = $_GET['concurso'];
    $dezenas = explode(',', $_GET['dezenas']);
    $qtdDezenas = count($dezenas);

    $meuArray = [
        "quantidadeDezenas"     => $qtdDezenas,
        "concurso"              => $concurso,
        "primeiraDezena"        => $dezenas[0],
        "segundaDezena"         => $dezenas[1],
        "terceiraDezena"        => $dezenas[2],
        "quartaDezena"          => $dezenas[3],
        "quintaDezena"          => $dezenas[4],
        "sextaDezena"           => $dezenas[5],
        "setimaDezena"          => verificaPosArray(6, $dezenas),
        "oitavaDezena"          => verificaPosArray(7, $dezenas),
        "nonaDezena"            => verificaPosArray(8, $dezenas),
        "decimaDezena"          => verificaPosArray(9, $dezenas),
        "decimaPrimeiraDezena"  => verificaPosArray(10, $dezenas),
        "decimaSegundaDezena"   => verificaPosArray(11, $dezenas),
        "decimaTerceiraDezena"  => verificaPosArray(12, $dezenas),
        "decimaQuartaDezena"    => verificaPosArray(13, $dezenas),
        "decimaQuintaDezena"    => verificaPosArray(14, $dezenas)
    ];

    $inserido = $ap->inserir($meuArray);

    if($inserido){
        echo "inserido";
    }
    else{
        echo "erro";
    }

    // Verificando se existe valores nas posições opcionais do array
    function verificaPosArray(int $pos, array $array){        
        array_key_exists($pos, $array) ? $dezena = $array[$pos] : $dezena = NULL;

        return $dezena;
    }

?>