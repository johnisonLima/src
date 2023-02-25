<?php 
    require_once('../../classes/sorteios.class.php');

    class sorteiosMega{
        public function selecionaTudo(){
            $st = new sorteios();

            $st->extras_select = 'ORDER BY concurso DESC';
            $st->selecionaTudo($st);
            $dados = array();
            while($res = $st->retornaDados()){
                if($res->data){
                    $res->data = date("d/m/Y", strtotime($res->data));
                }
                $dados[] = $res;
            }
            return json_encode($dados);
        }
    }
?>