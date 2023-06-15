<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once("connection.php");

Class Car {

    use Connection;

    private int $id;
    private string $make;
    private string $model;
    private string $thumbnail;
    private int $year;
    private int $km;
    private int $price;
    private int $offer;
    private $created_at;

    


    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of make
     */ 
    public function getMake()
    {
        return $this->make;
    }

    /**
     * Get the value of model
     */ 
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Get the value of thumbnail
     */ 
    public function getThumbnail()
    {
        return $this->thumbnail;
    }

    /**
     * Get the value of year
     */ 
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Get the value of km
     */ 
    public function getKm()
    {
        return $this->km;
    }
    /**
     * Get the value of price
     */ 
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Get the value of offer
     */ 
    public function getOffer()
    {
        return $this->offer;
    }

    /**
     * Get the value of created_at
     */ 
    public function getCreated_at()
    {
        return $this->created_at;
    }


    public function getOffers($limit){
      
        $query = "SELECT *  FROM cars WHERE offer > 0 LIMIT :limit,10";
        $query2 = "SELECT COUNT(*) FROM cars WHERE offer > 0";
        if (!is_null($this->pdo)) {
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':limit',$limit,PDO::PARAM_INT);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt2 = $this->pdo->prepare($query2);
       
            $cars = [];

            try {
                if($stmt->execute()) {
                    while($row = $stmt->fetchAll()){
                    array_push($cars,$row);
                }  

                if($stmt2->execute()){
                    while($count = $stmt2->fetchAll()){
                       echo json_encode(['cars'=>$cars[0],'count'=>$count[0]]);
                }
            }else{
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
}
?>


