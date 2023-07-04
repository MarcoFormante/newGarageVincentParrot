<?php
//change path for production
require_once '/xampp/htdocs/app/api/models/connection.php';

Class Review{
    use Connection;
    private int $id;
    private string $name;
    private string $message;
    private int $is_validate;
    private int $review;

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get the value of message
     */ 
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Get the value of is_validate
     */ 
    public function getIs_validate()
    {
        return $this->is_validate;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Set the value of is_validate
     *
     * @return  self
     */ 
    public function setIs_validate($is_validate)
    {
        $this->is_validate = $is_validate;

        return $this;
    }

   

    /**
     * Get the value of review
     */ 
    public function getReview()
    {
        return $this->review;
    }

    /**
     * Set the value of review
     *
     * @return  self
     */ 
    public function setReview($review)
    {
        $this->review = $review;

        return $this;
    }



    public function getReviews(){
        $query = "SELECT * from reviews";

        if(!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            if ($stmt->execute()) {
                $reviews = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $reviews[]= $row;
                }
                return $reviews;
            }
        }
    }


    public function newReview(string $name, string $message, int $review){
        $query = "INSERT INTO reviews(name,message,review) VALUES(:name,:message,:review)";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':name',$name,PDO::PARAM_STR);
            $stmt->bindParam(':message',$message,PDO::PARAM_STR);
            $stmt->bindParam(':review',$review,PDO::PARAM_INT);

            if($stmt->execute()){
                echo json_encode(["status"=> 1,"message"=>"Votre avis a été envoyé"]);
            }else{
                echo json_encode(["status"=> 0,"message"=>"Erreur dans l'envois des donnés, retentez plus tard"]);
            }

        }else{
            echo json_encode(["status"=> 0,"message"=>"Erreur dans l'envois des donnés, retentez plus tard"]);
        }
    
    }


    public function reviewValidation($reviewValue,$reviewId){
       
        $query = "UPDATE reviews SET is_validate = :value WHERE id = :id";
    try {
        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':value',$reviewValue,PDO::PARAM_INT);
            $stmt->bindValue(':id',$reviewId,PDO::PARAM_INT);

            if ($stmt->execute()) {
                echo json_encode(["status"=> 1 ,"message" => "Modification effectuée"]);
            }else{
                echo json_encode(["status"=> 0 ,"message" => "Erreur pendant la modification de la valeur"]); 
            }
        }else{
            echo json_encode(["status"=> 0 ,"message" => "Erreur pendant la modification de la valeur"]);
        }   
    } catch (Exception $e) {
        echo $e->getMessage();
    } 
}

    public function getTotalReviews(){
        $query = "SELECT COUNT(review)*5 AS total,
        COUNT(IF(review = 1,1,NULL))*1 AS stars1,
        COUNT(IF(review = 2,1,NULL))*2 AS stars2,
        COUNT(IF(review = 3,1,NULL))*3 AS stars3,
        COUNT(IF(review = 4,1,NULL))*4 AS stars4,
        COUNT(IF(review = 5,1,NULL) ) * 5 AS stars5 
        from reviews WHERE is_validate = 1";

        if (!is_null($this->pdo)) {
            $stmt = $this->pdo->prepare($query);

            if ($stmt->execute()){
                $total =[];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $total[]=$row;
                }
                echo json_encode(["status"=> 1 ,"total"=>$total]);
            }else{
                echo json_encode(["status"=> 0 ,"message" => "Erreur pendant recuperation des données(totalReviews)"]);
            }
        }
    }

}

?>