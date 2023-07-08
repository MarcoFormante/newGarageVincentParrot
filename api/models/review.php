<?php
//change path for production
require_once '/xampp/htdocs/app/api/models/connection.php';

Class Review{
    use Connection;
   

    public function getReviews(){
        $query = "SELECT * FROM reviews WHERE review > 3
         ORDER BY id DESC 
         LIMIT 0,20";

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


    public function getReviewsToValidate(int $currentPage,int $filter){
        if (!is_null($this->pdo)) {
            if ($filter === 0) {
                $query = "SELECT *, (SELECT count(*) FROM reviews WHERE is_validate = 0) as count FROM reviews
                WHERE is_validate = 0 LIMIT :currentPage,9";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':currentPage',$currentPage,PDO::PARAM_INT);

            }elseif($filter === 1){
                $query = "SELECT *, (SELECT count(*) FROM reviews) as count FROM reviews LIMIT :currentPage,9";
                $stmt = $this->pdo->prepare($query);
                $stmt->bindValue(':currentPage',$currentPage,PDO::PARAM_INT);
            }
    

            if ($stmt->execute()) {
                $reviews = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $reviews[] = $row;
                }
                echo json_encode(["status"=> 1 ,'reviews'=>$reviews,'filter'=>$filter]);
            }

        }else{
            throw new Exception("Erreur de connection au Database", 1);
        }   
    }

}

?>