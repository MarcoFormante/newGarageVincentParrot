<?php 

require_once '../models/connection.php';

Class Home{
    use Connection;

    public function getOffers($limit){
        $query = "SELECT * FROM cars WHERE offer > 0 LIMIT :limit,10";
        $query2 = "SELECT COUNT(*) FROM cars WHERE offer > 0";
        if (!is_null($this->pdo)) {
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':limit',$limit,PDO::PARAM_INT);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt2 = $this->pdo->prepare($query2);
        $cars = [];
        
            try {
                if($stmt->execute()) {
                    if ($stmt->rowCount() > 0) {
                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                         array_push($cars,$row);
                    }
                }  

                if($stmt2->execute()){
                    $count = $stmt2->fetch(PDO::FETCH_ASSOC);
                       return [$cars,$count];
                
            }else{
                return [$cars,0];
                throw new Exception("Erreur pendant la recuperation des données");
                
                echo json_encode(["status" => 0, "message"=> "Erreur pendant la recuperation des données"] );
            }
                
            }else{
                throw new Exception("Erreur pendant la recuperation des données");
                echo json_encode(["status" => 0, "message"=> "Erreur pendant la recuperation des données"] );
                
           } 
        } catch (Exception $e) {
            
            echo json_encode(["status" => 0, "message"=> "Erreur pendant la recuperation des données ,"] );
        }
        }else{
            throw new Exception("Erreur pendant la recuperation des données");
            echo json_encode(["status" => 0, "message"=> "Erreur pendant la recuperation des données"] );
        }
    }



    public function getOpeningTimes(){
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
}

?>