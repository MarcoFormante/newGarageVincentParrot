<?php

require_once '../models/connection.php';

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

    public function getReviewsHome(){
        $query = "SELECT * from reviews WHERE is_validate = 1";

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



}

?>