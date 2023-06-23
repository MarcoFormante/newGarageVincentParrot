<?php


Class ReviewController{

    public function getReviewsHome(){
        $Review = new Review();
        return $Review->getReviewsHome();
    }

    public function newReview(string $name, string $message, int $review){
        
        $Review = new Review();
        $Review->newReview($name,$message, $review);
          
    }   

}
?>