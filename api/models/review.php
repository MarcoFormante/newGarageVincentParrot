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
        $query = "SELECT * from reviews WHERE is_validate = 1 LIMIT 10";
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
}

?>