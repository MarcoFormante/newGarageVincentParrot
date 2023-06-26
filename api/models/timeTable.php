<?php


require_once '/xampp/htdocs/app/api/models/connection.php';

Class TimeTable{

    use Connection;
    public function getTimeTable(){
        $query="SELECT * FROM opening_times";
        if (!is_null($this->pdo)) {
            $stmt=$this->pdo->prepare($query);

            if ($stmt->execute()) {
                $openingTimes = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                   array_push($openingTimes,$row);
                }
                return $openingTimes;
            }
        }
    }


    public function updateTimeTable($id,$value,$column,$close){
        $columnName = htmlentities($column);
        $closeNum = "";
        if ($close === 0 || $close === 1) {
           $closeNum = $close;
        }else{
            echo json_encode(["status"=>0,"message"=>"Erreur pendant la modification de l'horaire, rententez plus tard"]);
            exit("Erreur de la valeur 'CLOSE'  ");
        }
       
        $query = "UPDATE opening_times SET $columnName = :value , close = $closeNum WHERE id = :id";

        if(!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":value",$value,PDO::PARAM_STR);
             $stmt->bindValue(':id',$id,PDO::PARAM_INT);

            if ($stmt->execute()) {
               echo json_encode(["status"=>1,"message"=>"horaire modifié"]);
            }else{
                echo json_encode(["status"=>0,"message"=>"Erreur pendant la modification de l'horaire, rententez plus tard"]);
            }
        }else{
            echo json_encode(["status"=>0,"message"=>"Erreur de connection, rententez plus tard"]);
        }
    }
}