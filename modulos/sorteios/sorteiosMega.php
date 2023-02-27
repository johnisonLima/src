<?php 
    require_once('../../classes/sorteios.class.php');

    class sorteiosMega{
        public function selecionaTudo(){
            $st = new sorteios();

            $st->extras_select = 'ORDER BY concurso DESC';

            return retornaTodosRegistros($st);
        }// selecionaTudo

        public function selecionaPeriodo($coluna, $valorMax, $valorMin){
            $st = new sorteios();

            $st->extras_select = "WHERE $coluna BETWEEN $valorMax AND $valorMin";
            $st->extras_select .=" ORDER BY $coluna DESC ";

            return retornaTodosRegistros($st);
        }// selecionaPeriodo

        public function busca($coluna1, $coluna2, $coluna3, $coluna4, $coluna5, $coluna6, $valor){
            $st = new sorteios();

            $st->extras_select = 
                "WHERE $coluna1 = $valor
                    OR $coluna2 = $valor
                    OR $coluna3 = $valor
                    OR $coluna4 = $valor
                    OR $coluna5 = $valor
                    OR $coluna6 = $valor                
            ";
            
            return retornaTodosRegistros($st);

        }// busca

        public function buscaColuna($coluna, $valor){
            $st = new sorteios();

            $st->extras_select = "WHERE $coluna = $valor";

            return retornaTodosRegistros($st);
        }// buscaColuna

        public function buscaDuasColunas($coluna1, $coluna2, $valor1, $valor2){
            $st = new sorteios();            

            $st->extras_select = "WHERE $coluna1 = $valor1 AND $coluna2 = $valor2";    
            
            return retornaTodosRegistros($st);
        }// buscadDuasColunas

        public function buscaPeriodo(
            $colunaMaster,
            $coluna1, 
            $coluna2, 
            $coluna3, 
            $coluna4, 
            $coluna5, 
            $coluna6, 
            $valorProcurado,
            $valorMax, 
            $valorMin){
                $st = new sorteios();

                $st->extras_select = 
                "WHERE $colunaMaster BETWEEN $valorMax AND $valorMin AND(
                    $coluna1 = $valorProcurado OR 
                    $coluna2 = $valorProcurado OR 
                    $coluna3 = $valorProcurado OR 
                    $coluna4 = $valorProcurado OR 
                    $coluna5 = $valorProcurado OR 
                    $coluna6 = $valorProcurado 
                )";
            
            return retornaTodosRegistros($st);
        }// buscaPeriodo

        public function buscaUltimoRegistro($coluna){
            $st = new sorteios();

            $st->extras_select = " ORDER BY $coluna DESC LIMIT 1";            

            return retornaTodaColuna($st, $coluna);
        }// buscaUltimoRegistro
    } 
    
    function retornaTodosRegistros($objeto){
        $objeto->selecionaTudo($objeto);
        $dados = array();
        while($res = $objeto->retornaDados()){
            if(isset($res->data)){
                $res->data = date("d/m/Y", strtotime($res->data));
            }
            $dados[] = $res;
        }
        return json_encode($dados);
    }

    function retornaTodaColuna($objeto, $coluna){
        $objeto->selecionaColuna($objeto, $coluna);
        $dados = array();
        while($res = $objeto->retornaDados()){
            if(isset($res->data)){
                $res->data = date("d/m/Y", strtotime($res->data));
            }
            $dados[] = $res;
        }
        return json_encode($dados);
    }
?>