<?php 
    require_once('../../classes/sorteios.class.php');

    class sorteiosMega{
        public function selecionaTudo(){
            $st = new sorteios();

            $st->extras_select = 'ORDER BY concurso DESC';

            return retornaJson($st);
        }// selecionaTudo

        public function selecionaPeriodo($coluna, $valor1, $valor2){
            $st = new sorteios();

            $st->extras_select = "WHERE $coluna BETWEEN $valor1 AND $valor2";
            $st->extras_select .=" ORDER BY $coluna DESC ";

            return retornaJson($st);
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
            
            return retornaJson($st);

        }// busca

        public function buscaDuasColunas($coluna1, $coluna2, $valor1, $valor2){
            $st = new sorteios();            

            $st->extras_select = "WHERE $coluna1 = $valor1 AND $coluna2 = $valor2";    
            
            return retornaJson($st);
        }// buscadDuasColunas

        public function buscaColuna($coluna, $valor){
            $st = new sorteios();

            $st->extras_select = "WHERE $coluna = $valor";

            return retornaJson($st);
        }// buscaColuna
    } 
    
    function retornaJson($objeto){
        $objeto->selecionaTudo($objeto);
        $dados = array();
        while($res = $objeto->retornaDados()){
            if($res->data){
                $res->data = date("d/m/Y", strtotime($res->data));
            }
            $dados[] = $res;
        }
        return json_encode($dados);
    }
?>