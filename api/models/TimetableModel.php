<?php


require_once 'AbstractModel.php';

Class TimetableModel  extends AbstractModel
{

 
    public function getOpeningTimes(){
        $query = "SELECT * FROM opening_times";
        if (!is_null($this->pdo)) {
            $stmt=$this->pdo->prepare($query);
            if ($stmt->execute()) {
                $openingTimes = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                   array_push($openingTimes,$row);
                }
                return ["status"=> 1 ,"openingTimes"=>$openingTimes];
            }else{
                return $this->error("Erreur pendant la recuperation des horaires d'ouverture");
            }
        }
    }


    public function updateOpeningTimes(int $id,string $value,string $column, string $close)
    {
        $columnName = $this->sanitize($column);
        if (!in_array($columnName, ["day_start_am", "day_end_am", "day_start_pm", "day_end_pm"])) {
            return $this->error("Erreur pendant la modification de l'horaire");
        }
        $closeNum = "";
        if ($close === "0" || $close === "1") {
            $closeNum = $close;
        } else {
            return $this->error("Erreur pendant la modification de l'horaire");
        }

        $query = "UPDATE opening_times SET $columnName = :value , close = :closeNum WHERE id = :id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(":value", $value, PDO::PARAM_STR);
            $stmt->bindValue(":closeNum",$closeNum,PDO::PARAM_STR);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return ["status" => 1, "message" => "horaire modifié"];
            } else {
                return $this->error("Erreur pendant la modification de l'horaire");
            }
        } else {
            return $this->error("Erreur pendant la modification de l'horaire");
        }
    }
}

