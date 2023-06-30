<?php

require_once 'connection.php';


Class carHandler{

    use Connection;

    public function getAllEquipments(){
        $query= "SELECT * FROM equipments ORDER BY id";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $equipments=[];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $equipments[]=$row;  
                }
                echo json_encode(["status"=>1,"equipments"=>$equipments]);
            }else{
                echo json_encode(["status"=>0,"message"=>"Erreur pendant la recuperation des données(equipments)"]);
            }
        }

    }
}

