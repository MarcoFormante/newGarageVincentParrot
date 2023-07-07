<?php


Class ReviewController{
    

    public function getReviews(){
        $Review = new Review();
        return $Review->getReviews();
    }

    public function newReview(string $name, string $message, int $review){
        
        $Review = new Review();
        $Review->newReview($name,$message, $review);
          
    }   

    public function reviewValidation($reviewValue, $reviewId ){
        $Review = new Review();
        $Review->reviewValidation($reviewValue,$reviewId);
    }

    public function getTotalReviews(){
        $review = new Review();
        $review->getTotalReviews();
    }

    public function getReviewsToValidate(int $currentPage,int $filter){
        $review = new Review();
        $review->getReviewsToValidate($currentPage,$filter);
    }


}
?>