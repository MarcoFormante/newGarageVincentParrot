<?php


Class ReviewController{

    public function getReviewsHome(){
        $review = new Review();
        return $review->getReviewsHome();
    }
}


?>